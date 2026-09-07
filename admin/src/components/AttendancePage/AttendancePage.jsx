import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import EmployeeToast from "../EmployeePage/EmployeeToast";
import {
  getDatesInRange,
  getTodayDate,
  isFutureDate,
} from "../EmployeePage/employeePageUtils";
import AttendanceDetailsModal from "./AttendanceDetailsModal";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceSummary from "./AttendanceSummary";
import AttendanceTable from "./AttendanceTable";
import LeaveFormModal from "./LeaveFormModal";
import LeaveReviewModal from "./LeaveReviewModal";
import {
  getAttendanceForDate,
  getEffectiveStatus,
  getLeaveDateLabel,
  getLeaveRequestForDate,
  getSortedLeaveRequests,
  isDateInRange,
} from "./attendanceUtils";
import { attendancePageStyles as s } from "../../assets/dummyStyles";

const getUniqueSortedValues = (items, key) => [
  "All",
  ...new Set(
    items
      .map((item) => item[key])
      .filter(Boolean)
      .sort((first, second) => first.localeCompare(second)),
  ),
];

const buildAttendanceRows = ({
  attendanceDate,
  departmentFilter,
  designationFilter,
  employees,
  searchTerm,
  statusFilter,
  todayDate,
}) => {
  const query = searchTerm.trim().toLowerCase();

  return employees
    .map((employee) => {
      const attendance = getAttendanceForDate(employee, attendanceDate);
      const pendingLeave = getLeaveRequestForDate(employee, attendanceDate, [
        "Applied",
      ]);
      const rowStatus = getEffectiveStatus(employee, attendanceDate, todayDate);
      const latestLeave = getLeaveRequestForDate(employee, attendanceDate);

      const searchText = [
        employee.id,
        employee.name,
        employee.department,
        employee.designation,
        employee.email,
        employee.phone,
        rowStatus,
        latestLeave?.reason,
      ]
        .join(" ")
        .toLowerCase();

      return {
        employee,
        attendance,
        latestLeave,
        pendingLeave,
        rowStatus,
        searchText,
      };
    })
    .filter((row) => statusFilter === "All" || row.rowStatus === statusFilter)
    .filter(
      (row) =>
        departmentFilter === "All" ||
        row.employee.department === departmentFilter,
    )
    .filter(
      (row) =>
        designationFilter === "All" ||
        row.employee.designation === designationFilter,
    )
    .filter((row) => row.searchText.includes(query));
};

const getSummary = (rows) => ({
  present: rows.filter((row) => row.rowStatus === "Present").length,
  applied: rows.filter((row) => row.pendingLeave !== null).length,
  leave: rows.filter((row) => row.rowStatus === "Leave").length,
  absent: rows.filter((row) => row.rowStatus === "Absent").length,
  notMarked: rows.filter((row) => row.rowStatus === "Not Marked").length,
});

const AttendancePage = ({ userRole = "admin" }) => {
  const { user } = useAuth();
  const canApplyLeave = userRole === "employee";
  const canReviewLeave = userRole === "admin";

  const [employees, setEmployees] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(getTodayDate);
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [leaveEmployee, setLeaveEmployee] = useState(null);
  const [reviewContext, setReviewContext] = useState(null);
  const [detailsEmployee, setDetailsEmployee] = useState(null);
  const [leaveStartDate, setLeaveStartDate] = useState(getTodayDate);
  const [leaveEndDate, setLeaveEndDate] = useState(getTodayDate);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveStartDateError, setLeaveStartDateError] = useState("");
  const [leaveEndDateError, setLeaveEndDateError] = useState("");
  const [leaveReasonError, setLeaveReasonError] = useState("");
  const [toast, setToast] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProgress, setToastProgress] = useState(false);

  const toastTimer = useRef(null);
  const toastFrame = useRef(null);
  const toastExitTimer = useRef(null);
  const leaveRequestCounter = useRef(1000);
  const todayDate = getTodayDate();

  const fetchAttendanceList = async (silent = false) => {
    if (!user?.token) return;
    try {
      const queryParams = new URLSearchParams({
        date: attendanceDate,
        search: searchTerm,
        department: departmentFilter,
        designation: designationFilter,
      });
      const response = await fetch(
        `http://localhost:5000/api/admin/attendance/list?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setEmployees(data.employees);
      } else if (!silent) {
        showToast({
          title: "Fetch failed",
          message: data.message || "Could not fetch attendance records.",
          tone: "danger",
        });
      }
    } catch (err) {
      console.error("Error fetching attendance list:", err);
      if (!silent) {
        showToast({
          title: "Connection error",
          message: "Unable to connect to the backend server.",
          tone: "danger",
        });
      }
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchAttendanceList();

      const interval = setInterval(() => {
        fetchAttendanceList(true);
      }, 5000);

      const handleFocus = () => {
        fetchAttendanceList(true);
      };
      window.addEventListener("focus", handleFocus);

      return () => {
        clearInterval(interval);
        window.removeEventListener("focus", handleFocus);
      };
    }
  }, [
    user?.token,
    attendanceDate,
    searchTerm,
    departmentFilter,
    designationFilter,
  ]);

  const reviewEmployee = reviewContext
    ? employees.find((employee) => employee.id === reviewContext.employeeId)
    : null;

  const reviewRequest = reviewEmployee?.leaveRequests?.find(
    (request) => request.id === reviewContext?.requestId,
  );

  const departmentOptions = useMemo(
    () => getUniqueSortedValues(employees, "department"),
    [employees],
  );

  const designationOptions = useMemo(
    () =>
      getUniqueSortedValues(
        employees.filter(
          (employee) =>
            departmentFilter === "All" ||
            employee.department === departmentFilter,
        ),
        "designation",
      ),
    [departmentFilter, employees],
  );

  const clearToastTimers = () => {
    window.clearTimeout(toastTimer.current);
    window.clearTimeout(toastFrame.current);
    window.clearTimeout(toastExitTimer.current);
  };

  const closeToast = () => {
    clearToastTimers();
    setToastOpen(false);
    toastExitTimer.current = window.setTimeout(() => setToast(null), 220);
  };

  const showToast = ({ title, message, tone = "success" }) => {
    clearToastTimers();
    setToast({ title, message, tone });
    setToastOpen(false);
    setToastProgress(false);

    toastFrame.current = window.setTimeout(() => {
      setToastOpen(true);
      window.setTimeout(() => setToastProgress(true), 60);
    }, 20);

    toastTimer.current = window.setTimeout(closeToast, 3600);
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(toastFrame.current);
      window.clearTimeout(toastExitTimer.current);
    };
  }, []);

  const rows = useMemo(
    () =>
      buildAttendanceRows({
        attendanceDate,
        departmentFilter,
        designationFilter,
        employees,
        searchTerm,
        statusFilter,
        todayDate,
      }),
    [
      attendanceDate,
      departmentFilter,
      designationFilter,
      employees,
      searchTerm,
      statusFilter,
      todayDate,
    ],
  );

  const summary = useMemo(() => getSummary(rows), [rows]);

  const updateEmployee = (employeeId, updater) => {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === employeeId ? updater(employee) : employee,
      ),
    );

    setDetailsEmployee((currentEmployee) =>
      currentEmployee?.id === employeeId
        ? updater(currentEmployee)
        : currentEmployee,
    );

    setLeaveEmployee((currentEmployee) =>
      currentEmployee?.id === employeeId
        ? updater(currentEmployee)
        : currentEmployee,
    );
  };

  const handleDateChange = (date) => {
    if (isFutureDate(date, todayDate)) {
      setAttendanceDate(todayDate);
      showToast({
        title: "Future date blocked",
        message: "Attendance can be marked only up to today.",
        tone: "warning",
      });
      return;
    }

    setAttendanceDate(date || todayDate);
  };

  const openLeaveForm = (employee) => {
    if (!canApplyLeave) {
      showToast({
        title: "Access denied",
        message: "Admin cannot apply leave.",
        tone: "warning",
      });
      return;
    }

    const attendance = getAttendanceForDate(employee, attendanceDate);

    if (attendance.status === "Present" || attendance.status === "Leave") {
      showToast({
        title: "Attendance already marked",
        message: `${employee.name} already has ${attendance.status} saved for this date.`,
        tone: "warning",
      });
      return;
    }

    setLeaveEmployee(employee);
    setLeaveStartDate(attendanceDate);
    setLeaveEndDate(attendanceDate);
    setLeaveReason("");
    setLeaveStartDateError("");
    setLeaveEndDateError("");
    setLeaveReasonError("");
  };

  const closeLeaveForm = () => {
    setLeaveEmployee(null);
    setLeaveStartDate(todayDate);
    setLeaveEndDate(todayDate);
    setLeaveReason("");
    setLeaveStartDateError("");
    setLeaveEndDateError("");
    setLeaveReasonError("");
  };

  const submitLeave = (event) => {
    event.preventDefault();

    if (!canApplyLeave) {
      showToast({
        title: "Access denied",
        message: "Admin cannot apply leave.",
        tone: "warning",
      });
      return;
    }

    const employee = employees.find((item) => item.id === leaveEmployee?.id);
    const reason = leaveReason.trim();
    let hasError = false;

    if (!leaveStartDate) {
      setLeaveStartDateError("From date is required.");
      hasError = true;
    }

    if (!leaveEndDate) {
      setLeaveEndDateError("To date is required.");
      hasError = true;
    } else if (leaveStartDate && leaveEndDate < leaveStartDate) {
      setLeaveEndDateError("To date cannot be before from date.");
      hasError = true;
    }

    if (!reason) {
      setLeaveReasonError("Leave reason is required.");
      hasError = true;
    }

    if (hasError || !employee) return;

    const leaveDates = getDatesInRange(leaveStartDate, leaveEndDate);

    const blockedDates = leaveDates.filter((date) =>
      ["Present", "Leave"].includes(
        getAttendanceForDate(employee, date).status,
      ),
    );

    const overlappingPending = (employee.leaveRequests || []).some(
      (request) =>
        request.status === "Applied" &&
        leaveDates.some((date) =>
          isDateInRange(date, request.startDate, request.endDate),
        ),
    );

    if (blockedDates.length > 0) {
      setLeaveStartDateError("Attendance is already marked in this range.");
      showToast({
        title: "Attendance already marked",
        message: "Leave cannot be applied over marked attendance dates.",
        tone: "warning",
      });
      return;
    }

    if (overlappingPending) {
      setLeaveStartDateError(
        "A leave request is already waiting in this range.",
      );
      showToast({
        title: "Leave request exists",
        message: `${employee.name} already has a pending leave request in this range.`,
        tone: "warning",
      });
      return;
    }

    leaveRequestCounter.current += 1;

    const nextRequest = {
      id: `LR-${employee.id}-${leaveRequestCounter.current}`,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason,
      status: "Applied",
      createdAt: new Date().toISOString(),
    };

    updateEmployee(employee.id, (item) => ({
      ...item,
      leaveRequests: [nextRequest, ...(item.leaveRequests || [])],
    }));

    showToast({
      title: "Leave applied",
      message: `${employee.name} applied leave for ${getLeaveDateLabel(nextRequest)}.`,
    });

    closeLeaveForm();
  };

  const openReview = (employeeId, requestId) => {
    setReviewContext({ employeeId, requestId });
  };

  const decideLeave = async (nextStatus) => {
    if (!reviewEmployee || !reviewRequest) return;

    if (nextStatus === "Approved") {
      const leaveDates = getDatesInRange(
        reviewRequest.startDate,
        reviewRequest.endDate,
      );

      const presentDates = leaveDates.filter(
        (date) =>
          getAttendanceForDate(reviewEmployee, date).status === "Present",
      );

      if (presentDates.length > 0) {
        showToast({
          title: "Attendance already marked",
          message: "This leave range already has Present attendance.",
          tone: "warning",
        });
        return;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/attendance/leave/${reviewRequest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            status: nextStatus === "Approved" ? "Approved" : "Rejected",
          }),
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        showToast({
          title:
            nextStatus === "Approved" ? "Leave approved" : "Leave rejected",
          message: `${reviewEmployee.name}'s leave request was ${nextStatus.toLowerCase()}.`,
          tone: nextStatus === "Approved" ? "success" : "danger",
        });
        fetchAttendanceList();
      } else {
        showToast({
          title: "Decision failed",
          message: data.message || "Could not update leave request.",
          tone: "danger",
        });
      }
    } catch (err) {
      console.error("Error updating leave request:", err);
      showToast({
        title: "Connection error",
        message: "Unable to update leave request.",
        tone: "danger",
      });
    } finally {
      setReviewContext(null);
    }
  };

  return (
    <main className={s.mainContainer}>
      <EmployeeToast
        toast={toast}
        open={toastOpen}
        progress={toastProgress}
        onClose={closeToast}
        onConfirmDelete={() => {}}
      />

      {canApplyLeave && (
        <LeaveFormModal
          employee={leaveEmployee}
          endDate={leaveEndDate}
          endDateError={leaveEndDateError}
          minDate={todayDate}
          onClose={closeLeaveForm}
          onEndDateChange={(date) => {
            setLeaveEndDate(date);
            setLeaveEndDateError("");
          }}
          onReasonChange={(value) => {
            setLeaveReason(value.slice(0, 180));
            setLeaveReasonError("");
          }}
          onStartDateChange={(date) => {
            setLeaveStartDate(date);
            setLeaveStartDateError("");
            if (!leaveEndDate || leaveEndDate < date) {
              setLeaveEndDate(date);
            }
          }}
          onSubmit={submitLeave}
          reason={leaveReason}
          reasonError={leaveReasonError}
          startDate={leaveStartDate}
          startDateError={leaveStartDateError}
        />
      )}

      {canReviewLeave && (
        <LeaveReviewModal
          employee={reviewEmployee}
          leaveRequest={reviewRequest}
          onApprove={() => decideLeave("Approved")}
          onClose={() => setReviewContext(null)}
          onReject={() => decideLeave("Rejected")}
        />
      )}

      <AttendanceDetailsModal
        employee={detailsEmployee}
        selectedDate={attendanceDate}
        onClose={() => setDetailsEmployee(null)}
        todayDate={todayDate}
      />

      <section className={s.section}>
        <div className={s.headerCard}>
          <div>
            <p className={s.headerBadge}>Attendance</p>
            <h1 className={s.headerTitle}>Date Wise Attendance</h1>
            <p className={s.headerDescription}>
              Review employee leave requests and filter records by date.
            </p>
          </div>
        </div>

        <AttendanceSummary summary={summary} />

        <AttendanceFilters
          attendanceDate={attendanceDate}
          departmentFilter={departmentFilter}
          departmentOptions={departmentOptions}
          designationFilter={designationFilter}
          designationOptions={designationOptions}
          onDateChange={handleDateChange}
          onDepartmentChange={(value) => {
            setDepartmentFilter(value);
            setDesignationFilter("All");
          }}
          onDesignationChange={setDesignationFilter}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          rowsCount={rows.length}
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          todayDate={todayDate}
        />

        <AttendanceTable
          canApplyLeave={canApplyLeave}
          canReviewLeave={canReviewLeave}
          onApplyLeave={openLeaveForm}
          onReviewLeave={openReview}
          onViewDetails={setDetailsEmployee}
          rows={rows}
        />
      </section>
    </main>
  );
};

export default AttendancePage;
