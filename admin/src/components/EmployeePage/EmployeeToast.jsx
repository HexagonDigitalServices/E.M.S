import { AlertTriangle, CheckCircle2, Trash2, X } from "lucide-react";
import { employeeToastStyles as s } from "../../assets/dummyStyles";

const toneClasses = {
  success: {
    border: "border-emerald-200",
    iconBg: "bg-emerald-600",
    progress: "bg-emerald-500",
    icon: CheckCircle2,
  },
  danger: {
    border: "border-rose-200",
    iconBg: "bg-rose-600",
    progress: "bg-rose-500",
    icon: Trash2,
  },
  warning: {
    border: "border-amber-200",
    iconBg: "bg-amber-500",
    progress: "bg-amber-500",
    icon: AlertTriangle,
  },
};

const EmployeeToast = ({
  toast,
  open,
  progress,
  onClose,
  onConfirmDelete,
  loading = false,
}) => {
  if (!toast) return null;

  const tone = toneClasses[toast.tone] || toneClasses.success;
  const Icon = tone.icon;

  return (
    <div className={s.root}>
      <div
        className={`${s.toastContainer} ${s.getToastStateClass(open)} ${tone.border}`}
      >
        <div className={s.content}>
          <span className={`${s.iconWrapper} ${tone.iconBg}`}>
            <Icon className={s.iconSvg} />
          </span>
          <div className={s.textWrapper}>
            <p className={s.title}>{toast.title}</p>
            <p className={s.message}>{toast.message}</p>

            {toast.confirmEmployee && (
              <div className={s.confirmActions}>
                <button
                  type="button"
                  disabled={loading}
                  onClick={onConfirmDelete}
                  className={s.deleteButton}
                >
                  {loading && (
                    <svg className={s.spinner} fill="none" viewBox="0 0 24 24">
                      <circle
                        className={s.spinnerCircle}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className={s.spinnerPath}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                  {loading ? "Deleting..." : "Delete"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={s.cancelButton}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={s.closeButton}
            aria-label="Close toast"
          >
            <X className={s.closeIcon} />
          </button>
        </div>

        {!toast.confirmEmployee && (
          <div
            className={`${s.progressBar} ${s.getProgressStateClass(progress)} ${tone.progress}`}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeToast;