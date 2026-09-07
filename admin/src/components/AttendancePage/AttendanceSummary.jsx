import { attendanceSummaryStyles as s } from "../../assets/dummyStyles";

const summaryCards = [
  { label: "Present", key: "present" },
  { label: "Leave Applied", key: "applied" },
  { label: "Approved Leave", key: "leave" },
  { label: "Absent", key: "absent" },
  { label: "Not Marked", key: "notMarked" },
];

const AttendanceSummary = ({ summary }) => (
  <div className={s.container}>
    {summaryCards.map(({ label, key }) => (
      <article key={key} className={s.card}>
        <div className={s.cardBar} />
        <p className={s.cardLabel}>{label}</p>
        <p className={s.cardValue}>{summary[key]}</p>
      </article>
    ))}
  </div>
);

export default AttendanceSummary;