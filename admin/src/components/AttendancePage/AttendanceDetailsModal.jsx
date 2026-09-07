import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import StatusPill from "../EmployeePage/StatusPill";
import { formatDate, getDatesInRange } from "../EmployeePage/employeePageUtils";
import {
  getDisplayStatusLabel,
  getEffectiveStatus,
  getLeaveDateLabel,
  getLeaveStatusLabel,
  getSortedLeaveRequests,
} from "./attendanceUtils";
import { attendanceDetailsModalStyles as s } from "../../assets/dummyStyles";

const getDatesForHistory = (joiningDate, today) => {
  let start = joiningDate;
  if (!start) {
    const d = new Date(today);
    d.setDate(d.getDate() - 30);
    start = d.toISOString().split("T")[0];
  }
  if (start.includes("T")) {
    start = start.split("T")[0];
  }
  return getDatesInRange(start, today).reverse();
};

const AttendanceDetailsModal = ({
  employee,
  selectedDate,
  onClose,
  todayDate,
}) => {
  if (!employee) return null;

  const { user } = useAuth();
  const [detailEmployee, setDetailEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    if (!employee || !user?.token) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/attendance/employee/${employee._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setDetailEmployee(data.employee);
        }
      } catch (err) {
        console.error("Error fetching employee details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [employee, user?.token]);

  const activeEmployee = detailEmployee || employee;

  const allDates = useMemo(() => {
    if (!activeEmployee) return [];
    return getDatesForHistory(activeEmployee.joiningDate, todayDate);
  }, [activeEmployee, todayDate]);

  const attendanceRecords = useMemo(() => {
    if (!activeEmployee) return [];
    return allDates.map((date) => {
      const status = getEffectiveStatus(activeEmployee, date, todayDate);
      return {
        date,
        status,
      };
    });
  }, [allDates, activeEmployee, todayDate]);

  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const matchesDate = !dateFilter || record.date === dateFilter;
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Present" && record.status === "Present") ||
        (statusFilter === "Absent" && record.status === "Absent") ||
        (statusFilter === "Leave" &&
          ["Leave", "Leave Approved", "Leave Applied"].includes(record.status));
      return matchesDate && matchesStatus;
    });
  }, [attendanceRecords, dateFilter, statusFilter]);

  const filteredLeaveRequests = useMemo(() => {
    if (!activeEmployee) return [];
    const requests = getSortedLeaveRequests(activeEmployee);
    return requests.filter((req) => {
      const matchesDate =
        !dateFilter ||
        (req.startDate <= dateFilter && req.endDate >= dateFilter);
      const matchesStatus =
        statusFilter === "All" ||
        statusFilter === "Leave" ||
        (statusFilter === "Present" && false) ||
        (statusFilter === "Absent" && false);
      return matchesDate && matchesStatus;
    });
  }, [activeEmployee, dateFilter, statusFilter]);

  return (
    <div className={s.modalOverlay}>
      <section className={s.modalContainer}>
        <div className={s.modalHeader}>
          <div>
            <p className={s.modalHeaderLabel}>Attendance Details</p>
            <h2 className={s.modalHeaderTitle}>{activeEmployee.name}</h2>
            <p className={s.modalHeaderSubtitle}>{activeEmployee.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={s.modalCloseButton}
            aria-label="Close attendance details"
          >
            <X className={s.modalCloseIcon} />
          </button>
        </div>

        <div className={s.modalBody}>
          {/* Filters Section */}
          <div className={s.filtersContainer}>
            <div className={s.filtersInner}>
              <div className={s.filterGroup}>
                <span className={s.filterLabel}>Filter Date</span>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className={s.filterInput}
                />
              </div>

              <div className={s.filterGroup}>
                <span className={s.filterLabel}>Filter Status</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={s.filterSelect}
                >
                  <option value="All">All Statuses</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
            </div>

            {(dateFilter || statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setDateFilter("");
                  setStatusFilter("All");
                }}
                className={s.clearFiltersButton}
              >
                Clear Filters
              </button>
            )}
          </div>

          {loading ? (
            <div className={s.loadingContainer}>
              <svg className={s.spinner} fill="none" viewBox="0 0 24 24">
                <circle className={s.spinnerCircle} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className={s.spinnerPath} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : (
            <div className={s.recordsGrid}>
              <div>
                <h3 className={s.recordsTitle}>Attendance Records</h3>
                <div className={s.recordsTableWrapper}>
                  <table className={s.recordsTable}>
                    <thead className={s.recordsTableHead}>
                      <tr>
                        <th className={s.recordsTableHeader}>Date</th>
                        <th className={s.recordsTableHeader}>Status</th>
                      </tr>
                    </thead>
                    <tbody className={s.recordsTableBody}>
                      {filteredRecords.map((record) => (
                        <tr key={record.date} className={s.recordsTableRow}>
                          <td className={s.recordsTableCellDate}>
                            {formatDate(record.date)}
                          </td>
                          <td className={s.recordsTableCellStatus}>
                            <StatusPill label={getDisplayStatusLabel(record.status)} />
                          </td>
                        </tr>
                      ))}
                      {filteredRecords.length === 0 && (
                        <tr>
                          <td colSpan="2" className={s.recordsEmpty}>
                            No attendance records match the filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className={s.recordsTitle}>Leave Requests</h3>
                <div className={s.leaveRequestsWrapper}>
                  {filteredLeaveRequests.map((request) => (
                    <div key={request.id} className={s.leaveRequestCard}>
                      <div className={s.leaveRequestHeader}>
                        <p className={s.leaveRequestDate}>
                          {getLeaveDateLabel(request)}
                        </p>
                        <StatusPill label={getLeaveStatusLabel(request.status)} />
                      </div>
                      <p className={s.leaveRequestReason}>
                        {request.reason || "-"}
                      </p>
                    </div>
                  ))}

                  {filteredLeaveRequests.length === 0 && (
                    <p className={s.leaveRequestsEmpty}>
                      No leave requests match the filters.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AttendanceDetailsModal;