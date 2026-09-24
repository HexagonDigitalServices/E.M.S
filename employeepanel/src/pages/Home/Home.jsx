const pageTitles = {
  "/": "Dashboard",
  "/attendance": "Attendance",
  "/payslip": "Payslip",
  "/leave": "Leave",
};


      const attendanceList =
        attData.success && Array.isArray(attData.attendance)
          ? attData.attendance
          : [];
      const leaveList =
        leaveData.success && Array.isArray(leaveData.leaves)
          ? leaveData.leaves
          : [];

      const mappedAttendance = attendanceList.map((att) => ({
        id: att._id,
        type: "Present",
        name: att.employee?.name || user.name || "Employee",
        empId: att.employee?.employeeId || user.employeeId || "",
        from: att.date.split("T")[0],
        to: att.date.split("T")[0],
        reason: "-",
        status: att.status || "Present",
      }));

      const mappedLeaves = leaveList.map((leave) => ({
        id: leave._id,
        type: "Leave",
        name: leave.employee?.name || user.name || "Employee",
        empId: leave.employee?.employeeId || user.employeeId || "",
        from: leave.fromDate.split("T")[0],
        to: leave.toDate.split("T")[0],
        reason: leave.reason,
        status:
          leave.status === "Pending"
            ? "Leave Applied"
            : leave.status === "Approved"
              ? "Approved"
              : "Rejected",
      }));


  useEffect(() => {
    fetchRecords();

    const interval = setInterval(() => {
      fetchRecords();
    }, 5000);

    const handleFocus = () => {
      fetchRecords();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
