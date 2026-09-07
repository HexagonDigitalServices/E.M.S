import { formatDate } from "../EmployeePage/employeePageUtils";

export const statusOptions = [
  "All",
  "Present",
  "Leave",
  "Leave Applied",
  "Absent",
  "Not Marked",
];

export const getAttendanceForDate = (employee, date) =>
  employee.attendanceRecords?.find((record) => record.date === date) || {
    date,
    status: "Not Marked",
    reason: "",
  };

export const isDateInRange = (date, startDate, endDate) =>
  Boolean(date && startDate && endDate) && date >= startDate && date <= endDate;

export const getSortedLeaveRequests = (employee) =>
  [...(employee.leaveRequests || [])].sort((first, second) =>
    (second.createdAt || second.startDate).localeCompare(
      first.createdAt || first.startDate,
    ),
  );

export const getLeaveRequestForDate = (employee, date, statuses = []) =>
  getSortedLeaveRequests(employee).find((request) => {
    const matchesStatus =
      statuses.length === 0 || statuses.includes(request.status);

    return (
      matchesStatus && isDateInRange(date, request.startDate, request.endDate)
    );
  }) || null;

export const getLeaveStatusLabel = (status) => {
  if (status === "Applied") return "Leave Applied";
  if (status === "Approved") return "Leave Approved";
  if (status === "Rejected") return "Leave Rejected";
  return "Not Marked";
};

export const getLeaveDateLabel = (request) => {
  if (!request) return "";
  const start = formatDate(request.startDate);
  const end = formatDate(request.endDate);
  if (start === end) return start;
  return `${start} - ${end}`;
};

export const getEffectiveStatus = (employee, date, today) => {
  const attendance = getAttendanceForDate(employee, date);
  const pendingLeave = getLeaveRequestForDate(employee, date, ["Applied"]);

  if (attendance.status === "Present") return "Present";
  if (attendance.status === "Leave") return "Leave";

  if (pendingLeave) {
    if (date <= today) {
      return "Absent";
    }
    return "Leave Applied";
  }

  if (attendance.status === "Not Marked") {
    return date < today ? "Absent" : "Not Marked";
  }

  return attendance.status;
};

export const getDisplayStatusLabel = (status) =>
  status === "Not Marked" ? "-" : status;
