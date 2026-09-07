import { FileText, IndianRupee, Users } from "lucide-react";
import { formatCurrency } from "./payRollUtils";
import { payrollSummaryStyles as s } from "../../assets/dummyStyles";

const cards = [
  ["Total Employees", "totalEmployees", Users],
  ["Total Salary Paid", "totalSalaryPaid", IndianRupee],
  ["Total Paid Records", "totalPaidRecords", FileText],
];

const PayRollSummary = ({
  totalEmployees,
  totalPaidRecords,
  totalSalaryPaid,
}) => {
  const values = {
    totalEmployees,
    totalPaidRecords,
    totalSalaryPaid: formatCurrency(totalSalaryPaid),
  };

  return (
    <div className={s.grid}>
      {cards.map(([label, key, Icon]) => (
        <div key={label} className={s.card}>
          <div className={s.cardBar} />
          <div className={s.cardContent}>
            <div>
              <p className={s.label}>{label}</p>
              <h3 className={s.value}>{values[key]}</h3>
            </div>
            <div className={s.iconWrapper}>
              <Icon size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayRollSummary;