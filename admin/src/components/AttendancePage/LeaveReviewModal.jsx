import { CheckCircle2, X, XCircle } from "lucide-react";
import StatusPill from "../EmployeePage/StatusPill";
import { getLeaveDateLabel, getLeaveStatusLabel } from "./attendanceUtils";
import { leaveReviewModalStyles as s } from "../../assets/dummyStyles";

const LeaveReviewModal = ({
  employee,
  leaveRequest,
  onApprove,
  onClose,
  onReject,
}) => {
  if (!employee || !leaveRequest) return null;

  const canDecide = leaveRequest.status === "Applied";

  return (
    <div className={s.overlay}>
      <section className={s.modal}>
        <div className={s.header}>
          <div>
            <p className={s.headerLabel}>Leave Request</p>
            <h2 className={s.headerTitle}>Review Reason</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={s.closeButton}
            aria-label="Close leave review"
          >
            <X className={s.closeIcon} />
          </button>
        </div>

        <div className={s.body}>
          <div className={s.employeeCard}>
            <img
              src={employee.profileImage}
              alt={`${employee.name} profile`}
              className={s.employeeImage}
            />
            <div>
              <p className={s.employeeName}>{employee.name}</p>
              <p className={s.employeeSubtitle}>
                {getLeaveDateLabel(leaveRequest)}
              </p>
            </div>
          </div>

          <div className={s.infoGrid}>
            <div className={s.infoCard}>
              <p className={s.infoLabel}>Status</p>
              <StatusPill label={getLeaveStatusLabel(leaveRequest.status)} />
            </div>
            <div className={s.infoCard}>
              <p className={s.infoLabel}>Employee</p>
              <p className={s.employeeId}>{employee.id}</p>
            </div>
          </div>

          <div className={s.reasonCard}>
            <p className={s.reasonLabel}>Reason</p>
            <p className={s.reasonText}>
              {leaveRequest.reason || "-"}
            </p>
          </div>

          <div className={s.actions}>
            <button
              type="button"
              onClick={onClose}
              className={s.closeActionButton}
            >
              Close
            </button>
            {canDecide && (
              <>
                <button
                  type="button"
                  onClick={onReject}
                  className={s.rejectButton}
                >
                  <XCircle className={s.actionIcon} />
                  Reject
                </button>
                <button
                  type="button"
                  onClick={onApprove}
                  className={s.approveButton}
                >
                  <CheckCircle2 className={s.actionIcon} />
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeaveReviewModal;