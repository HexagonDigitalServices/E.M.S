import { Save, X } from "lucide-react";
import { leaveFormModalStyles as s } from "../../assets/dummyStyles";

const LeaveFormModal = ({
  employee,
  endDate,
  endDateError,
  minDate,
  onClose,
  onEndDateChange,
  onReasonChange,
  onStartDateChange,
  onSubmit,
  reason,
  reasonError,
  startDate,
  startDateError,
}) => {
  if (!employee) return null;

  return (
    <div className={s.overlay}>
      <section className={s.modal}>
        <div className={s.header}>
          <div>
            <p className={s.headerLabel}>Employee Leave</p>
            <h2 className={s.headerTitle}>Apply Leave</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={s.closeButton}
            aria-label="Close leave form"
          >
            <X className={s.closeIcon} />
          </button>
        </div>

        <form onSubmit={onSubmit} className={s.form}>
          <div className={s.employeeCard}>
            <img
              src={employee.profileImage}
              alt={`${employee.name} profile`}
              className={s.employeeImage}
            />
            <div>
              <p className={s.employeeName}>{employee.name}</p>
              <p className={s.employeeDetails}>
                {employee.id} - {employee.department}
              </p>
            </div>
          </div>

          <div className={s.fieldsGrid}>
            <label className={s.fieldLabel}>
              From Date
              <input
                value={startDate}
                onChange={(event) => onStartDateChange(event.target.value)}
                className={s.getInputClass(startDateError)}
                min={minDate}
                type="date"
              />
              <p className={s.errorText}>{startDateError}</p>
            </label>

            <label className={s.fieldLabel}>
              To Date
              <input
                value={endDate}
                onChange={(event) => onEndDateChange(event.target.value)}
                className={s.getInputClass(endDateError)}
                min={startDate || minDate}
                type="date"
              />
              <p className={s.errorText}>{endDateError}</p>
            </label>

            <label className={`${s.fieldLabel} ${s.fieldLabelFull}`}>
              Reason
              <textarea
                value={reason}
                onChange={(event) => onReasonChange(event.target.value)}
                className={s.getTextareaClass(reasonError)}
                maxLength={180}
                placeholder="Sick leave, family event, personal work..."
              />
              <div className={s.reasonFooter}>
                <p className={s.errorText}>{reasonError}</p>
                <p className={s.charCount}>{reason.trim().length}/180</p>
              </div>
            </label>
          </div>

          <div className={s.actions}>
            <button
              type="button"
              onClick={onClose}
              className={s.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={s.submitButton}
            >
              <Save className={s.submitIcon} />
              Apply Leave
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default LeaveFormModal;