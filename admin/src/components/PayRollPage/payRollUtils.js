import { employees } from "./dummypayrolldata";

export const STORAGE_KEYS = {
  records: "payroll_records_v3",
  generated: "payroll_generated_keys_v3",
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const pad2 = (n) => String(n).padStart(2, "0");

export const getCurrentDateValue = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

export const getCurrentMonthValue = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
};

export const dateValueToLabel = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (year && month && day) return `${day}-${month}-${year}`;
  return value;
};

const monthLabelToDateLabel = (value) => {
  if (!value) return "";
  const date = new Date(`1 ${value}`);
  if (Number.isNaN(date.getTime())) return value;
  return `01-${pad2(date.getMonth() + 1)}-${date.getFullYear()}`;
};

const monthLabelToDateValue = (value) => {
  if (!value) return "";
  const date = new Date(`1 ${value}`);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate(),
  )}`;
};

export const monthValueToLabel = (value) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
};

export const formatDateTime = () => {
  const d = new Date();
  return `${pad2(d.getDate())}-${pad2(d.getMonth() + 1)}-${d.getFullYear()} ${pad2(
    d.getHours(),
  )}:${pad2(d.getMinutes())}`;
};

export const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

export const hasEnteredAmount = (value) => String(value ?? "").trim() !== "";

export const toAmount = (value) =>
  hasEnteredAmount(value) ? Number(value) || 0 : 0;

export const uniqueValues = (items, key) =>
  Array.from(new Set(items.map((item) => item[key]))).sort();

export const buildCsv = (rows) => {
  const escape = (v) => {
    const str = String(v ?? "");
    if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };
  return rows.map((row) => row.map(escape).join(",")).join("\n");
};

export const loadJson = (key, fallback) => {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const saveJson = (key, value) => {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
};

export const findEmployeeByInputs = (
  nameInput,
  designationInput,
  departmentInput,
) => {
  const name = normalize(nameInput);
  const designation = normalize(designationInput);
  const department = normalize(departmentInput);

  if (name) {
    const exact = employees.find((emp) => normalize(emp.name) === name);
    if (exact) return exact;

    const partial = employees.filter((emp) =>
      normalize(emp.name).includes(name),
    );
    if (partial.length === 1) return partial[0];
  }

  if (department) {
    const exact = employees.find(
      (emp) => normalize(emp.department) === department,
    );
    if (exact) return exact;

    const partial = employees.filter((emp) =>
      normalize(emp.department).includes(department),
    );
    if (partial.length === 1) return partial[0];
  }

  if (designation) {
    const exact = employees.find((emp) => normalize(emp.role) === designation);
    if (exact) return exact;

    const partial = employees.filter((emp) =>
      normalize(emp.role).includes(designation),
    );
    if (partial.length === 1) return partial[0];
  }

  return null;
};

export const findEmployeeByRecord = (record) =>
  employees.find((emp) => emp.empId === record.empId) ||
  employees.find((emp) => normalize(emp.name) === normalize(record.name)) ||
  null;

export const getRecordDateValue = (record) =>
  record.payDate || monthLabelToDateValue(record.month);

export const getRecordDateLabel = (record) =>
  record.payDate
    ? dateValueToLabel(record.payDate)
    : monthLabelToDateLabel(record.month);

export const getRecordSalaryPeriodLabel = (record) => {
  if (record.employeeId?.salaryPeriod === "year" || String(record.month).startsWith("Year")) {
    return String(record.month).startsWith("Year") ? record.month : `Year ${(record.salaryPeriod || "").substring(0, 4)}`;
  }

  if (/^\d{4}-\d{2}$/.test(record.salaryPeriod || "")) {
    return monthValueToLabel(record.salaryPeriod);
  }

  if (record.month) return record.month;

  if (record.payDate) return monthValueToLabel(record.payDate.slice(0, 7));

  return monthValueToLabel(getCurrentMonthValue());
};

export const getPayslipFileName = (payslip) =>
  `payslip-${payslip.name.toLowerCase().replace(/\s+/g, "-")}-${(payslip.salaryPeriod || payslip.payDate || payslip.month || "record").replace(
    /\s+/g,
    "-",
  )
  }.html`;
