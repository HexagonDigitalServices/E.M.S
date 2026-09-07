import { summaryCardStyles as s } from "../../assets/dummyStyles";

const SummaryCard = ({ label, value, icon: Icon }) => (
  <article className={s.card}>
    <div className={s.cardBar} />
    <div className={s.content}>
      <div>
        <p className={s.label}>{label}</p>
        <p className={s.value}>{value}</p>
      </div>
      <span className={s.iconWrapper}>
        <Icon className={s.iconSvg} />
      </span>
    </div>
  </article>
);

export default SummaryCard;