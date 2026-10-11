import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useData } from "../../context/DataContext";
import { buildPayslipHtml } from "./buildPayslipHtml";
import PayRollForm from "./PayRollForm";
import PayRollHeader from "./PayRollHeader";
import PayRollRecordsTable from "./PayRollRecordsTable";
import PayRollSummary from "./PayRollSummary";
import PayRollToast from "./PayRollToast";
import {
  buildCsv,
  dateValueToLabel,
  formatDateTime,
  getCurrentDateValue,
  getCurrentMonthValue,
  getPayslipFileName,
  getRecordDateLabel,
  getRecordDateValue,
  getRecordSalaryPeriodLabel,
  hasEnteredAmount,
  monthValueToLabel,
  normalize,
  toAmount,
  uniqueValues,
} from "./payRollUtils";
import { payrollPageStyles as s } from "../../assets/dummyStyles";

// Renders the payroll page and manages employee selection, payslip generation, records, downloads, and exports; returns the page JSX.
const PayRollPage = () => {
  const { user } = useAuth();
  const {
    employees: cachedRawEmployees,
    fetchEmployees,
    payrolls: records,
    setPayrolls: setRecords,
    fetchPayrolls,
  } = useData();

  const [nameInput, setNameInput] = useState("");
  const [designationInput, setDesignationInput] = useState("");
  const [departmentInput, setDepartmentInput] = useState("");
  const [payDate] = useState(getCurrentDateValue());
  const [salaryPeriod, setSalaryPeriod] = useState(getCurrentMonthValue());
  const [baseSalary, setBaseSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [overtime, setOvertime] = useState("");
  const [deduction, setDeduction] = useState("");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [lastGenerated, setLastGenerated] = useState(null);
  const [generating, setGenerating] = useState(false);
  const prevSelectedEmployeeIdRef = useRef("");
  const [toast, setToast] = useState({
    open: false,
    type: "success",
    message: "",
  });

  // Displays a toast notification and automatically hides it after 1.8 seconds; updates toast state and returns nothing.
  const showToast = (type, message) => {
    setToast({ open: true, type, message });
    window.clearTimeout(window.__payrollToastTimer);
    window.__payrollToastTimer = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 1800);
  };

  // Loads employee/payroll data, refreshes every 8 seconds and on window focus, and registers cleanup; the effect returns a cleanup function.
  useEffect(() => {
    fetchEmployees();
    fetchPayrolls();

    const interval = setInterval(() => {
      fetchEmployees(true, true);
      fetchPayrolls(true, true);
    }, 8000);

    const handleFocus = () => {
      fetchEmployees(true, true);
      fetchPayrolls(true, true);
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchEmployees, fetchPayrolls]);

  // Converts cached database employees into the simplified payroll format; returns an array of mapped employee objects.
  const employees = useMemo(() => {
    // Maps each raw employee into the field names used by the payroll page; returns one normalized object per employee.
    return cachedRawEmployees.map((emp) => ({
      id: emp._id,
      empId: emp.employeeId,
      name: emp.name,
      role: emp.designation,
      department: emp.department,
      email: emp.workEmail || emp.email || "",
      phone: emp.phone ? String(emp.phone) : "",
      bankName: emp.bankName,
      accountNo: emp.accountNumber ? String(emp.accountNumber) : "",
      ifsc: emp.ifscCode,
      baseSalary: emp.salary,
      salaryPeriod: emp.salaryPeriod,
    }));
  }, [cachedRawEmployees]);

  // Gets unique employee names for the form options; returns an array of names.
  const employeeNames = useMemo(
    () => uniqueValues(employees, "name"),
    [employees],
  );
  // Gets unique employee designations for the form options; returns an array of roles.
  const employeeDesignations = useMemo(
    () => uniqueValues(employees, "role"),
    [employees],
  );
  // Gets unique employee departments for the form options; returns an array of departments.
  const employeeDepartments = useMemo(
    () => uniqueValues(employees, "department"),
    [employees],
  );

  // Finds the selected employee by ID or normalized name; returns the matching employee object or null.
  const currentEmployee = useMemo(() => {
    const byId = employees.find((emp) => String(emp.id) === selectedEmployeeId);
    if (byId) return byId;

    const name = normalize(nameInput);
    if (name) {
      const exact = employees.find((emp) => normalize(emp.name) === name);
      if (exact) return exact;
    }
    return null;
  }, [selectedEmployeeId, nameInput, employees]);

  // Syncs the selected employee details into the form and resets extra pay fields when the selection changes; returns nothing.
  useEffect(() => {
    if (!currentEmployee) {
      prevSelectedEmployeeIdRef.current = "";
      return;
    }

    const currentIdStr = String(currentEmployee.id);
    if (prevSelectedEmployeeIdRef.current !== currentIdStr) {
      prevSelectedEmployeeIdRef.current = currentIdStr;
      setSelectedEmployeeId(currentIdStr);
      setNameInput(currentEmployee.name);
      setDesignationInput(currentEmployee.role);
      setDepartmentInput(currentEmployee.department);
      setBaseSalary(String(currentEmployee.baseSalary));
      setBonus("");
      setOvertime("");
      setDeduction("");
    }
  }, [currentEmployee]);

  // Formats the current payroll date for display; returns a human-readable date label.
  const currentDateLabel = useMemo(() => dateValueToLabel(payDate), [payDate]);

  // Calculates base salary plus bonus and overtime minus deductions; returns the numeric net salary.
  const netSalary = useMemo(
    () =>
      Number(baseSalary || 0) +
      toAmount(bonus) +
      toAmount(overtime) -
      toAmount(deduction),
    [baseSalary, bonus, overtime, deduction],
  );

  // Adds the net salary from all payroll records; returns the total amount paid.
  const totalSalaryPaid = useMemo(
    () => records.reduce((sum, record) => sum + (record.netSalary || 0), 0),
    [records],
  );

  // Filters payroll records by the chosen date and search query; returns the matching records array.
  const filteredRecords = useMemo(() => {
    const q = normalize(search);
    return records.filter((row) => {
      const matchesDate = !dateFilter || getRecordDateValue(row) === dateFilter;
      const matchesQuery =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.role.toLowerCase().includes(q) ||
        row.department.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q) ||
        row.empId.toLowerCase().includes(q);

      return matchesDate && matchesQuery;
    });
  }, [records, search, dateFilter]);

  // Builds lookup keys for employee-and-period combinations already used; returns an object for duplicate checks.
  const generatedKeys = useMemo(() => {
    const keys = {};
    records.forEach((rec) => {
      const key = `${rec.empId}_${rec.salaryPeriod}`;
      keys[key] = true;
    });
    return keys;
  }, [records]);

  // Validates the employee and salary period, saves a payslip through the API, and updates state; returns the created record or null.
  const createRecord = async () => {
    if (!currentEmployee) {
      showToast("error", "Please write or select a valid employee name first.");
      return null;
    }

    const yearPart = salaryPeriod.substring(0, 4);
    const isYearly = currentEmployee.salaryPeriod === "year";

    if (isYearly) {
      const alreadyHasYearly = records.some(
        (rec) =>
          rec.empId === currentEmployee.empId &&
          String(rec.salaryPeriod).startsWith(yearPart),
      );
      if (alreadyHasYearly) {
        showToast(
          "error",
          "Payslip already generated for this employee in the selected year.",
        );
        return null;
      }
    } else {
      const key = `${currentEmployee.empId}_${salaryPeriod}`;
      if (generatedKeys[key]) {
        showToast("error", "Payslip already generated for this period.");
        return null;
      }
    }

    const bodyData = {
      employeeId: currentEmployee.id,
      empId: currentEmployee.empId,
      name: currentEmployee.name,
      role: currentEmployee.role,
      department: currentEmployee.department,
      payDate,
      salaryPeriod,
      month: isYearly ? `Year ${yearPart}` : monthValueToLabel(salaryPeriod),
      baseSalary: Number(baseSalary || currentEmployee.baseSalary || 0),
      bonus: toAmount(bonus),
      overtime: toAmount(overtime),
      deduction: toAmount(deduction),
      netSalary,
    };

    setGenerating(true);
    try {
      const response = await fetch("http://localhost:5000/api/payroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const record = {
          ...data.record,
          id: data.record.payrollId,
        };
        setRecords((prev) => [record, ...prev]);
        setLastGenerated(record);
        showToast("success", "Payslip generated successfully.");

        setNameInput("");
        setDesignationInput("");
        setDepartmentInput("");
        setSelectedEmployeeId("");
        setBaseSalary("");
        setBonus("");
        setOvertime("");
        setDeduction("");
        prevSelectedEmployeeIdRef.current = "";
        return record;
      } else {
        showToast("error", data.message || "Failed to generate payslip.");
        return null;
      }
    } catch (err) {
      console.error("Error generating payslip:", err);
      showToast("error", "Could not connect to the backend server.");
      return null;
    } finally {
      setGenerating(false);
    }
  };

  // Builds the payslip HTML and triggers a file download; shows a toast and returns nothing.
  const savePayslipFile = (payslip, employee) => {
    const html = buildPayslipHtml(payslip, employee);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = getPayslipFileName(payslip);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("success", "Payslip downloaded.");
  };

  // Combines current form fields into employee and payslip data; returns the data object or null if no employee is selected.
  const getCurrentPayslipData = () => {
    if (!currentEmployee) {
      showToast("error", "Please write or select an employee name first.");
      return null;
    }

    return {
      employee: currentEmployee,
      payslip: {
        id: lastGenerated?.id || `PAY-${currentEmployee.empId}-${payDate}`,
        empId: currentEmployee.empId,
        name: nameInput || currentEmployee.name,
        role: designationInput || currentEmployee.role,
        department: departmentInput || currentEmployee.department,
        payDate,
        date: currentDateLabel,
        salaryPeriod,
        month: monthValueToLabel(salaryPeriod),
        baseSalary: Number(baseSalary || currentEmployee.baseSalary || 0),
        bonus: toAmount(bonus),
        overtime: toAmount(overtime),
        deduction: toAmount(deduction),
        showBonus: hasEnteredAmount(bonus),
        showOvertime: hasEnteredAmount(overtime),
        showDeduction: hasEnteredAmount(deduction),
        netSalary,
        generatedAt: formatDateTime(),
      },
    };
  };
  // Retrieves current payslip data and downloads its file; returns nothing.
  const downloadPayslip = () => {
    const currentPayslip = getCurrentPayslipData();
    if (!currentPayslip) return;
    savePayslipFile(currentPayslip.payslip, currentPayslip.employee);
  };
  // Prepares employee details for a saved payroll record and downloads its payslip; returns nothing.
  const downloadRecordPayslip = (record) => {
    const employee = employees.find((emp) => emp.empId === record.empId) || {
      empId: record.empId,
      name: record.name,
      role: record.role,
      department: record.department,
      email: "",
      phone: "",
      bankName: "",
      accountNo: "",
      ifsc: "",
    };

    savePayslipFile(
      {
        ...record,
        payDate: record.payDate || "",
        date: getRecordDateLabel(record),
        salaryPeriodLabel: getRecordSalaryPeriodLabel(record),
      },
      employee,
    );
  };
  // Converts filtered payroll records into a CSV file and triggers its download; returns nothing.
  const exportPayrollToExcel = () => {
    const headers = [
      "Payroll ID",
      "Employee ID",
      "Name",
      "Designation",
      "Department",
      "Pay Date",
      "Salary Period",
      "Base Salary",
      "Bonus",
      "Overtime",
      "Deduction",
      "Net Salary",
      "Status",
    ];
    const rows = filteredRecords.map((record) => [
      record.id,
      record.empId,
      record.name,
      record.role,
      record.department,
      getRecordDateLabel(record),
      getRecordSalaryPeriodLabel(record),
      record.baseSalary,
      record.bonus,
      record.overtime,
      record.deduction,
      record.netSalary,
      record.status || "Paid",
    ]);
    const csv = "\uFEFF" + buildCsv([headers, ...rows]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = dateFilter
      ? `payroll-records-${dateFilter}.csv`
      : "payroll-records.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("success", "Payroll records exported to CSV file.");
  };
  // Creates a callback that updates a form field and clears the selected employee ID; returns that callback.
  const clearEmployeeSelection = (setter) => (value) => {
    setter(value);
    setSelectedEmployeeId("");
  };

  // REST ARE THE UI PART THAT IS CREATED USING SMALL COMPONENTS
  return (
    <div className={s.root}>
      <PayRollToast toast={toast} />

      <div className={s.container}>
        <PayRollHeader
          onDownloadPayslip={downloadPayslip}
          onExportPayroll={exportPayrollToExcel}
        />

        <PayRollSummary
          totalEmployees={employees.length}
          totalPaidRecords={records.length}
          totalSalaryPaid={totalSalaryPaid}
        />

        <div className={s.grid}>
          <div className={s.innerGrid}>
            <PayRollForm
              baseSalary={baseSalary}
              bonus={bonus}
              currentDateLabel={currentDateLabel}
              deduction={deduction}
              departmentInput={departmentInput}
              designationInput={designationInput}
              employeeDepartments={employeeDepartments}
              employeeDesignations={employeeDesignations}
              employeeNames={employeeNames}
              nameInput={nameInput}
              netSalary={netSalary}
              onBaseSalaryChange={setBaseSalary}
              onBonusChange={setBonus}
              onDeductionChange={setDeduction}
              onDepartmentChange={clearEmployeeSelection(setDepartmentInput)}
              onDesignationChange={clearEmployeeSelection(setDesignationInput)}
              onGeneratePayslip={createRecord}
              onNameChange={clearEmployeeSelection(setNameInput)}
              onOvertimeChange={setOvertime}
              onSalaryPeriodChange={setSalaryPeriod}
              overtime={overtime}
              salaryPeriod={salaryPeriod}
              loading={generating}
            />

            <PayRollRecordsTable
              dateFilter={dateFilter}
              filteredRecords={filteredRecords}
              onDateFilterChange={setDateFilter}
              onDownloadRecordPayslip={downloadRecordPayslip}
              onSearchChange={setSearch}
              search={search}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayRollPage;
