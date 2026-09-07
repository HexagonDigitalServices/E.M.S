import { statusPillStyles as s } from "../../assets/dummyStyles";

const StatusPill = ({ label }) => (
  <span className={s.getPillClass(label)}>
    {label}
  </span>
);

export default StatusPill;