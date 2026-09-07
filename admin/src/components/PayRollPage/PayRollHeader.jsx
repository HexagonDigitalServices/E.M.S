import { BadgeDollarSign, Download, FileText } from "lucide-react";
import { payrollHeaderStyles as s } from "../../assets/dummyStyles";

const PayRollHeader = ({ onDownloadPayslip, onExportPayroll }) => (
  <div className={s.container}>
    <div>
      <div className={s.badge}>
        <BadgeDollarSign size={14} />
        Payroll Management
      </div>
      <h1 className={s.title}>Employee Payroll Dashboard</h1>
      <p className={s.description}>
        Type employee name, designation, or department to auto-fill details,
        generate a paid payslip, and export employee data for Excel.
      </p>
    </div>

    <div className={s.actions}>
      <button
        onClick={onExportPayroll}
        className={s.actionButton}
      >
        <Download className={s.exportIcon} size={16} />
        Export CSV
      </button>
      <button
        onClick={onDownloadPayslip}
        className={s.actionButton}
      >
        <FileText className={s.payslipIcon} size={16} />
        Download Payslip
      </button>
    </div>
  </div>
);

export default PayRollHeader;