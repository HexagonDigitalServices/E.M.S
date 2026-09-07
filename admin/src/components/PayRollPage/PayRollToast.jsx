import { CheckCircle2, CircleAlert } from "lucide-react";
import { payRollToastStyles as s } from "../../assets/dummyStyles";

const PayRollToast = ({ toast }) => {
  const ToastIcon = toast.type === "error" ? CircleAlert : CheckCircle2;

  return (
    <div className={s.getContainerClass(toast.open)}>
      <div className={s.inner}>
        <div className={s.content}>
          <div className={s.iconWrapper}>
            <ToastIcon className={s.icon} />
          </div>
          <div className={s.textWrapper}>
            <p className={s.title}>
              {toast.type === "error" ? "Error" : "Success"}
            </p>
            <p className={s.message}>{toast.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRollToast;