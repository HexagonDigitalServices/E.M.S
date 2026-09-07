import { BadgeCheck, Eye, FileText } from "lucide-react";
import StatusPill from "../EmployeePage/StatusPill";
import { getDisplayStatusLabel, getLeaveStatusLabel } from "./attendanceUtils";
import { attendanceTableStyles as s } from "../../assets/dummyStyles";

const AttendanceTable = ({
  canApplyLeave,
  canReviewLeave,
  onApplyLeave,
  onReviewLeave,
  onViewDetails,
  rows,
}) => (
  <section className={s.container}>
    <div className={s.tableWrapper}>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr>
            <th className={s.tableHeader}>Employee</th>
            <th className={s.tableHeader}>Department</th>
            <th className={s.tableHeader}>Attendance</th>
            <th className={s.tableHeader}>Leave Request</th>
            <th className={s.tableHeader}>Actions</th>
          </tr>
        </thead>

        <tbody className={s.tableBody}>
          {rows.map(({ employee, latestLeave, pendingLeave, rowStatus }) => (
            <tr key={employee.id} className={s.tableRow}>
              <td className={s.cell}>
                <div className={s.employeeCell}>
                  <img
                    src={employee.profileImage}
                    alt={`${employee.name} profile`}
                    className={s.employeeImage}
                  />
                  <div>
                    <p className={s.employeeName}>{employee.name}</p>
                    <p className={s.employeeId}>{employee.id}</p>
                  </div>
                </div>
              </td>

              <td className={s.cell}>
                <p className={s.departmentName}>{employee.department}</p>
                <p className={s.designation}>{employee.designation}</p>
              </td>

              <td className={s.cell}>
                <StatusPill label={getDisplayStatusLabel(rowStatus)} />
              </td>

              <td className={s.cell}>
                {latestLeave ? (
                  <div className={s.leaveStatusWrapper}>
                    <StatusPill
                      label={getLeaveStatusLabel(latestLeave.status)}
                    />
                  </div>
                ) : (
                  <StatusPill label="-" />
                )}
              </td>

              <td className={s.cell}>
                <div className={s.actions}>
                  {canReviewLeave ? (
                    pendingLeave && (
                      <button
                        type="button"
                        onClick={() =>
                          onReviewLeave(employee.id, pendingLeave.id)
                        }
                        className={s.actionButton}
                      >
                        <FileText className={s.actionIcon} />
                        Review Leave
                      </button>
                    )
                  ) : canApplyLeave ? (
                    <button
                      type="button"
                      onClick={() =>
                        pendingLeave
                          ? onReviewLeave(employee.id, pendingLeave.id)
                          : onApplyLeave(employee)
                      }
                      className={s.actionButton}
                    >
                      <FileText className={s.actionIcon} />
                      {pendingLeave ? "Review Leave" : "Apply Leave"}
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => onViewDetails(employee)}
                    className={s.iconButton}
                    aria-label={`View attendance for ${employee.name}`}
                    title="View Attendance"
                  >
                    <Eye className={s.iconButtonSvg} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {rows.length === 0 && (
      <div className={s.emptyState}>
        <BadgeCheck className={s.emptyIcon} />
        <p className={s.emptyTitle}>No attendance records found</p>
        <p className={s.emptySubtitle}>
          Try changing the date, status, department, designation, or search
          filter.
        </p>
      </div>
    )}
  </section>
);

export default AttendanceTable;