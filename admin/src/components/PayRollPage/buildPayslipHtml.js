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

const detailLine = (label, value) =>
  hasText(value) ? `${label}: ${escapeHtml(value)}<br/>` : "";

const salaryRow = (label, value) =>
  Number(value || 0) !== 0
    ? `<tr><th>${label}</th><td>${formatCurrency(value)}</td></tr>`
    : "";

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

const getSalaryPeriodLabel = (record) => {
  if (hasText(record.salaryPeriodLabel)) return record.salaryPeriodLabel;
  if (/^\d{4}-\d{2}$/.test(record.salaryPeriod || "")) {
    return monthValueToLabel(record.salaryPeriod);
  }
  if (hasText(record.month)) return record.month;
  if (hasText(record.payDate)) return monthValueToLabel(record.payDate.slice(0, 7));
  return "";
};

const dateValueToLabel = (value) => {
  if (!hasText(value)) return "";
  const [year, month, day] = value.split("-");
  if (year && month && day) return `${day}-${month}-${year}`;
  return value;
};

const optionalSalaryRow = (record, key, label) =>
  hasAmount(record, key)
    ? `<tr><th>${label}</th><td>${formatCurrency(record[key])}</td></tr>`
    : "";

export const buildPayslipHtml = (record, employee) => {
  const payslipDate = record.date || dateValueToLabel(record.payDate) || record.month || "";
  const salaryPeriod = getSalaryPeriodLabel(record);
  const employeeDetails = [
    detailLine("Employee ID", record.empId),
    detailLine("Designation", record.role),
    detailLine("Department", record.department),
    detailLine("Email", employee?.email),
    detailLine("Phone", employee?.phone),
  ].join("");

  const payslipDetails = [
    detailLine("Payslip ID", record.id),
    detailLine("Salary Period", salaryPeriod),
    "Status: Paid<br/>",
    detailLine("Bank", employee?.bankName),
    detailLine("A/C No", employee?.accountNo),
    detailLine("IFSC", employee?.ifsc),
  ].join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payslip - ${record.name}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 28px;
      font-family: Inter, Arial, Helvetica, sans-serif;
      background: #f4f4f5;
      color: #09090b;
    }
    .sheet {
      max-width: 900px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #18181b;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(24,24,27,.08);
    }
    .topbar {
      padding: 26px 30px;
      background: #09090b;
      color: #fff;
    }
    .topbar h1 { margin: 0; font-size: 28px; letter-spacing: 0; font-weight: 900; }
    .topbar p { margin: 6px 0 0; opacity: .85; }
    .body { padding: 28px 30px 30px; }
    .grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 18px;
      margin-bottom: 18px;
    }
    .card {
      border: 1px solid #d4d4d8;
      border-radius: 10px;
      padding: 16px;
      background: #fff;
    }
    .label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: .12em;
      font-weight: 800;
    }
    .value {
      margin-top: 6px;
      font-size: 15px;
      font-weight: 900;
      color: #09090b;
      word-break: break-word;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
      overflow: hidden;
      border-radius: 14px;
    }
    th, td {
      padding: 12px 14px;
      border-bottom: 1px solid #e5e7eb;
      text-align: left;
      font-size: 14px;
    }
    th {
      background: #f9fafb;
      color: #18181b;
      width: 50%;
    }
    .total {
      margin-top: 18px;
      padding: 18px;
      border-radius: 16px;
      background: #09090b;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
    }
    .total strong { font-size: 22px; }
    .footer {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      font-size: 13px;
      color: #6b7280;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .sheet { box-shadow: none; border: none; border-radius: 0; }
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div class="topbar">
      <h1>Employee Payslip</h1>
      <p>Generated on ${formatDateTime()}</p>
    </div>
    <div class="body">
      <div class="grid">
        <div class="card">
          <div class="label">Employee Details</div>
          <div class="value">${escapeHtml(record.name)}</div>
          <div style="margin-top:10px;color:#6b7280;font-size:14px;">
            ${employeeDetails || "No additional details"}
          </div>
        </div>
        <div class="card">
          <div class="label">Payslip Info</div>
          <div class="value">${escapeHtml(payslipDate)}</div>
          <div style="margin-top:10px;color:#6b7280;font-size:14px;">
            ${payslipDetails}
          </div>
        </div>
      </div>

      <table>
        ${salaryRow("Base Salary", record.baseSalary)}
        ${hasText(salaryPeriod) ? `<tr><th>Salary Period</th><td>${escapeHtml(salaryPeriod)}</td></tr>` : ""}
        ${optionalSalaryRow(record, "bonus", "Bonus")}
        ${optionalSalaryRow(record, "overtime", "Overtime")}
        ${optionalSalaryRow(record, "deduction", "Deduction")}
        <tr><th>Net Salary</th><td><strong>${formatCurrency(record.netSalary)}</strong></td></tr>
      </table>

      <div class="total">
        <div>
          <div style="font-size:13px;opacity:.8;">Net Payable Amount</div>
          <strong>${formatCurrency(record.netSalary)}</strong>
        </div>
        <div style="text-align:right;font-size:13px;opacity:.8;">
          Payment Status<br/>
          <span style="font-size:16px;font-weight:700;opacity:1;">Paid</span>
        </div>
      </div>

      <div class="footer">
        <div>This payslip is generated electronically.</div>
        <div>${record.generatedAt || formatDateTime()}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
};
