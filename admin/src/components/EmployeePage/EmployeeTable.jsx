import { BadgeCheck, Building2, Edit3, Eye, Trash2 } from "lucide-react";
import StatusPill from "./StatusPill";
import { formatSalaryPackage } from "./employeePageUtils";
import { employeeTableStyles as s } from "../../assets/dummyStyles";

const EmployeeTable = ({ employees, onDelete, onEdit, onView }) => (
  <section className={s.container}>
    <div className={s.tableWrapper}>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr>
            <th className={s.tableHeader}>Employee</th>
            <th className={s.tableHeader}>Department</th>
            <th className={s.tableHeader}>Designation</th>
            <th className={s.tableHeader}>Salary</th>
            <th className={s.tableHeader}>Account</th>
            <th className={s.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody className={s.tableBody}>
          {employees.map((employee) => (
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
                <span className={s.departmentCell}>
                  <Building2 className={s.departmentIcon} />
                  {employee.department}
                </span>
              </td>
              <td className={`${s.cell} ${s.designationCell}`}>
                {employee.designation}
              </td>
              <td className={s.cell}>
                <div className={s.salaryCell}>
                  <p className={s.salaryText}>
                    {formatSalaryPackage(
                      employee.salary,
                      employee.salaryPeriod,
                    )}
                  </p>
                </div>
              </td>
              <td className={s.cell}>
                <StatusPill label={employee.accountStatus} />
              </td>
              <td className={s.cell}>
                <div className={s.actions}>
                  <button
                    type="button"
                    onClick={() => onView(employee)}
                    className={s.actionButton}
                    aria-label={`View ${employee.name}`}
                    title="View"
                  >
                    <Eye className={s.actionIcon} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    className={s.actionButton}
                    aria-label={`Edit ${employee.name}`}
                    title="Edit"
                  >
                    <Edit3 className={s.actionIcon} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(employee)}
                    className={s.actionButton}
                    aria-label={`Delete ${employee.name}`}
                    title="Delete"
                  >
                    <Trash2 className={s.actionIcon} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {employees.length === 0 && (
      <div className={s.emptyState}>
        <BadgeCheck className={s.emptyIcon} />
        <p className={s.emptyTitle}>No employees found</p>
        <p className={s.emptySubtitle}>
          Try changing the search text or department filter.
        </p>
      </div>
    )}
  </section>
);

export default EmployeeTable;