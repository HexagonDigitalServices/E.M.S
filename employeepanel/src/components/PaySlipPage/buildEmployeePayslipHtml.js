import { employeeDetails } from "./paySlipDummyData";

const pad2 = (n) => String(n).padStart(2, "0");

const formatDateTime = () => {
  const d = new Date();
  return `${pad2(d.getDate())}-${pad2(d.getMonth() + 1)}-${d.getFullYear()} ${pad2(
    d.getHours(),
  )}:${pad2(d.getMinutes())}`;
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const hasText = (value) => String(value ?? "").trim().length > 0;

const hasAmount = (record, key) => {
  const flagKey = `show${key[0].toUpperCase()}${key.slice(1)}`;
  if (Object.prototype.hasOwnProperty.call(record, flagKey)) {
    return Boolean(record[flagKey]);
  }

  return Number(record[key] || 0) !== 0;
};

const monthValueToLabel = (value) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export const dateValueToLabel = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (year && month && day) return `${day}-${month}-${year}`;
  return value;
};

export const getSalaryPeriod = (record) => {
  if (hasText(record.salaryPeriodLabel)) return record.salaryPeriodLabel;
  if (record.employeeId?.salaryPeriod === "year" || String(record.month).startsWith("Year")) {
    return String(record.month).startsWith("Year") ? record.month : `Year ${(record.salaryPeriod || "").substring(0, 4)}`;
  }
  if (/^\d{4}-\d{2}$/.test(record.salaryPeriod || "")) {
    return monthValueToLabel(record.salaryPeriod);
  }
  if (hasText(record.month)) return record.month;
  if (hasText(record.payDate)) return monthValueToLabel(record.payDate.slice(0, 7));
  return "";
};

export const getPayslipDate = (record) =>
  dateValueToLabel(record.payDate) || record.date;

const getSlipType = (record) => {
  const extras = [
    hasAmount(record, "bonus") ? "Bonus" : "",
    hasAmount(record, "overtime") ? "Overtime" : "",
    hasAmount(record, "deduction") ? "Deduction" : "",
  ].filter(Boolean);

  return extras.length ? `Salary with ${extras.join(", ")}` : "Regular Salary";
};

const salaryRows = (record) =>
  [
    ["Base Salary", record.baseSalary, true],
    ["Bonus", record.bonus, hasAmount(record, "bonus")],
    ["Overtime", record.overtime, hasAmount(record, "overtime")],
    ["Deduction", record.deduction, hasAmount(record, "deduction"), true],
  ].filter(([, , show]) => show);

const detailLine = (label, value) =>
  hasText(value) ? `${label}: ${escapeHtml(value)}<br/>` : "";

const salaryTableRow = ([label, value, , negative]) =>
  `<tr><th>${label}</th><td>${negative ? "- " : ""}${formatCurrency(value)}</td></tr>`;

const downloadStyles = `
  * { box-sizing: border-box; }
  body { margin: 0; padding: 28px; font-family: Inter, Arial, sans-serif; background: #f4f4f5; color: #09090b; }
  .sheet { max-width: 900px; margin: 0 auto; background: #fff; border: 1px solid #18181b; border-radius: 14px; overflow: hidden; box-shadow: 0 20px 40px rgba(24,24,27,.08); }
  .topbar { padding: 26px 30px; background: #09090b; color: #fff; display: flex; justify-content: space-between; gap: 18px; }
  h1 { margin: 0; font-size: 28px; font-weight: 900; }
  .topbar p { margin: 6px 0 0; opacity: .82; }
  .body { padding: 28px 30px 30px; }
  .grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; margin-bottom: 18px; }
  .card { border: 1px solid #d4d4d8; border-radius: 10px; padding: 16px; background: #fff; }
  .label { font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: .12em; font-weight: 800; }
  .value { margin-top: 6px; font-size: 16px; font-weight: 900; color: #09090b; word-break: break-word; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; border-radius: 12px; overflow: hidden; }
  th, td { padding: 12px 14px; border-bottom: 1px solid #e5e7eb; text-align: left; font-size: 14px; }
  th { background: #f9fafb; width: 48%; color: #18181b; }
  .total { margin-top: 18px; padding: 18px; border-radius: 14px; background: #09090b; color: #fff; display: flex; justify-content: space-between; align-items: center; gap: 18px; }
  .total strong { font-size: 24px; }
  .footer { margin-top: 24px; display: flex; justify-content: space-between; gap: 20px; font-size: 13px; color: #71717a; }
  @media (max-width: 720px) { body { padding: 12px; } .topbar, .grid, .total, .footer { display: block; } .card + .card { margin-top: 12px; } }
  @media print { body { background: #fff; padding: 0; } .sheet { box-shadow: none; border: none; border-radius: 0; } }
`;

export const buildEmployeePayslipHtml = (record) => {
  const salaryPeriod = getSalaryPeriod(record);
  const payslipDate = getPayslipDate(record);
  const netSalary =
    record.netSalary ??
    Number(record.baseSalary || 0) +
    (hasAmount(record, "bonus") ? Number(record.bonus || 0) : 0) +
    (hasAmount(record, "overtime") ? Number(record.overtime || 0) : 0) -
    (hasAmount(record, "deduction") ? Number(record.deduction || 0) : 0);

  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payslip - ${escapeHtml(record.name)}</title>
  <style>${downloadStyles}</style>
</head>
<body>
  <div class="sheet">
    <div class="topbar">
      <div>
        <h1>Employee Payslip</h1>
        <p>${escapeHtml(getSlipType(record))}</p>
      </div>
      <div style="text-align:right;">
        <div style="font-size:12px;opacity:.72;">Payroll ID</div>
        <strong>${escapeHtml(record.id)}</strong>
      </div>
    </div>
    <div class="body">
      <div class="grid">
        <div class="card">
          <div class="label">Employee Record</div>
          <div class="value">${escapeHtml(record.name)}</div>
          <div style="margin-top:10px;color:#71717a;font-size:14px;line-height:1.7;">
            ${detailLine("Employee ID", record.empId)}
            ${detailLine("Designation", record.role)}
            ${detailLine("Department", record.department)}
            ${detailLine("Email", employeeDetails.email)}
            ${detailLine("Phone", employeeDetails.phone)}
          </div>
        </div>
        <div class="card">
          <div class="label">Payslip Info</div>
          <div class="value">${escapeHtml(payslipDate)}</div>
          <div style="margin-top:10px;color:#71717a;font-size:14px;line-height:1.7;">
            ${detailLine("Salary Period", salaryPeriod)}
            ${detailLine("Slip Type", getSlipType(record))}
            ${detailLine("Bank", employeeDetails.bankName)}
            ${detailLine("A/C No", employeeDetails.accountNo)}
            ${detailLine("IFSC", employeeDetails.ifsc)}
            Status: Paid<br/>
          </div>
        </div>
      </div>

      <table>
        ${salaryRows(record).map(salaryTableRow).join("")}
        <tr><th>Net Salary</th><td><strong>${formatCurrency(netSalary)}</strong></td></tr>
      </table>

      <div class="total">
        <div>
          <div style="font-size:13px;opacity:.8;">Net Payable Amount</div>
          <strong>${formatCurrency(netSalary)}</strong>
        </div>
        <div style="text-align:right;font-size:13px;opacity:.8;">
          Generated On<br/>
          <span style="font-size:16px;font-weight:800;opacity:1;">${escapeHtml(record.generatedAt || formatDateTime())}</span>
        </div>
      </div>

      <div class="footer">
        <div>This payslip is generated electronically.</div>
        <div>${escapeHtml(record.id)}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};
