export const getAttendanceList = async (req, res) => {
    try {
        await autoRejectExpiredLeaves();
        const { search = "", department, designation, date } = { ...req.query, ...req.body };
        const employeeQuery = {};

        if (search) {
            employeeQuery.name = { $regex: search, $options: "i" };
        }

        if (department && department !== "All") {
            employeeQuery.department = department;
        }

        if (designation && designation !== "All") {
            employeeQuery.designation = designation;
        }

        const employees = await Employee.find(employeeQuery).sort({ createdAt: -1 });

        let selectedDate;
        if (date) {
            const [year, month, day] = date.split("-").map(Number);
            selectedDate = new Date(Date.UTC(year, month - 1, day));
        } else {
            const now = new Date();
            selectedDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        }

        const nextDate = new Date(selectedDate);
        nextDate.setUTCDate(selectedDate.getUTCDate() + 1);

        const formattedDateStr = formatDateToString(selectedDate);

        const data = await Promise.all(
            employees.map(async (employee) => {
                const userDoc = await User.findOne({ email: employee.workEmail });
                const userObjectId = userDoc ? userDoc._id : null;
                const employeeIds = [employee._id, userObjectId].filter(Boolean);

                const attendance = await Attendance.findOne({
                    employee: { $in: employeeIds },
                    date: {
                        $gte: selectedDate,
                        $lt: nextDate,
                    },
                });

                const leaves = await Leave.find({ employee: { $in: employeeIds } }).sort({ createdAt: -1 });

                const leaveRequests = leaves.map(leave => ({
                    id: leave._id.toString(),
                    startDate: formatDateToString(leave.fromDate),
                    endDate: formatDateToString(leave.toDate),
                    reason: leave.reason,
                    status: leave.status === "Pending" ? "Applied" : leave.status,
                    createdAt: leave.createdAt ? leave.createdAt.toISOString() : new Date().toISOString(),
                    decidedAt: leave.status !== "Pending" ? (leave.updatedAt ? leave.updatedAt.toISOString() : new Date().toISOString()) : null
                }));

                const approvedLeaveForDate = leaves.find(leave =>
                    leave.status === "Approved" &&
                    new Date(leave.fromDate) <= selectedDate &&
                    new Date(leave.toDate) >= selectedDate
                );

                const attendanceRecords = [];
                if (attendance) {
                    attendanceRecords.push({
                        date: formattedDateStr,
                        status: attendance.status,
                        reason: ""
                    });
                } else if (approvedLeaveForDate) {
                    attendanceRecords.push({
                        date: formattedDateStr,
                        status: "Leave",
                        reason: approvedLeaveForDate.reason,
                        leaveRequestId: approvedLeaveForDate._id.toString()
                    });
                } else {
                    attendanceRecords.push({
                        date: formattedDateStr,
                        status: "Not Marked",
                        reason: ""
                    });
                }

                const profileImage = employee.profileImage
                    ? (employee.profileImage.startsWith('http') || employee.profileImage.startsWith('data:'))
                        ? employee.profileImage
                        : `http://localhost:5000/${employee.profileImage.replace(/\\/g, '/')}`
                    : '';

                return {
                    _id: employee._id,
                    id: employee.employeeId,
                    name: employee.name,
                    department: employee.department,
                    designation: employee.designation,
                    profileImage,
                    attendanceRecords,
                    leaveRequests
                };
            })
        );

        res.status(200).json({
            success: true,
            total: data.length,
            employees: data,
        });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}