import {
  BadgeIndianRupee,
  Building2,
  CircleDollarSign,
  CreditCard,
  Edit3,
  KeyRound,
  Landmark,
  Mail,
  Phone,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import StatusPill from "./StatusPill";
import {
  formatDate,
  formatPhone,
  formatSalary,
  formatSalaryPackage,
} from "./employeePageUtils";
import { employeeDetailsModalStyles as s } from "../../assets/dummyStyles";

const detailItems = [
  { label: "Employee ID", key: "id" },
  { label: "Full Name", key: "name" },
  { label: "Gender", key: "gender" },
  { label: "Department", key: "department" },
  { label: "Designation", key: "designation" },
  { label: "Joining Date", key: "joiningDate", format: formatDate },
];

const EmployeeDetailsModal = ({ employee, onClose, onDelete, onEdit }) => {
  if (!employee) return null;

  return (
    <div className={s.overlay}>
      <section className={s.container}>
        <div className={s.header}>
          <div>
            <p className={s.headerLabel}>Employee Details</p>
            <h2 className={s.headerTitle}>Full Profile</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={s.closeButton}
            aria-label="Close employee details"
          >
            <X className={s.closeIcon} />
          </button>
        </div>

        <div className={s.body}>
          <div className={s.profileCard}>
            <div className={s.profileInner}>
              <img
                src={employee.profileImage}
                alt={`${employee.name} profile`}
                className={s.profileImage}
              />
              <div>
                <p className={s.profileName}>{employee.name}</p>
                <p className={s.profileId}>
                  <UserRound className={s.profileIdIcon} />
                  {employee.id}
                </p>
              </div>
            </div>

            <div className={s.actionButtons}>
              <button
                type="button"
                onClick={() => onEdit(employee)}
                className={s.editButton}
              >
                <Edit3 className={s.actionIcon} />
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(employee)}
                className={s.deleteButton}
              >
                <Trash2 className={s.actionIcon} />
                Delete
              </button>
            </div>
          </div>

          <div className={s.statusCardWrapper}>
            <div className={s.statusCard}>
              <p className={s.statusCardLabel}>
                <Building2 className={s.statusCardIcon} />
                Account
              </p>
              <StatusPill label={employee.accountStatus} />
            </div>
          </div>

          <div className={s.detailsGrid}>
            {detailItems.map(({ label, key, format }) => (
              <div key={key} className={s.detailCard}>
                <p className={s.detailLabel}>{label}</p>
                <p className={s.detailValue}>
                  {format ? format(employee[key]) : employee[key]}
                </p>
              </div>
            ))}
          </div>

          <div className={s.contactGrid}>
            <div className={s.contactCard}>
              <p className={s.contactLabel}>
                <Mail className={s.contactIcon} />
                Email
              </p>
              <p className={s.contactValue}>{employee.email}</p>
            </div>
            <div className={s.contactCard}>
              <p className={s.contactLabel}>
                <Mail className={s.contactIcon} />
                Work Email
              </p>
              <p className={s.contactValue}>{employee.workEmail || "-"}</p>
            </div>
            <div className={s.contactCard}>
              <p className={s.contactLabel}>
                <KeyRound className={s.contactIcon} />
                Work Password
              </p>
              <p className={s.contactValue}>{employee.workPassword || "-"}</p>
            </div>
            <div className={s.contactCard}>
              <p className={s.contactLabel}>
                <Phone className={s.contactIcon} />
                Phone
              </p>
              <p className={s.contactValue}>{formatPhone(employee.phone)}</p>
            </div>
            <div className={s.contactCard}>
              <p className={s.contactLabel}>
                <BadgeIndianRupee className={s.contactIcon} />
                Salary
              </p>
              <p className={s.contactValue}>{formatSalary(employee.salary)}</p>
              <p className={s.salaryPeriod}>
                {formatSalaryPackage(employee.salary, employee.salaryPeriod)}
              </p>
            </div>
          </div>

          <div className={s.bankGrid}>
            <div className={s.bankCard}>
              <p className={s.bankLabel}>
                <Landmark className={s.bankIcon} />
                Bank Name
              </p>
              <p className={s.bankValue}>{employee.bankName}</p>
            </div>
            <div className={s.bankCard}>
              <p className={s.bankLabel}>
                <CreditCard className={s.bankIcon} />
                Account Number
              </p>
              <p className={s.bankValue}>{employee.accountNumber}</p>
            </div>
            <div className={s.bankCard}>
              <p className={s.bankLabel}>
                <Building2 className={s.bankIcon} />
                IFSC Code
              </p>
              <p className={s.bankValue}>{employee.ifscCode}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeDetailsModal;