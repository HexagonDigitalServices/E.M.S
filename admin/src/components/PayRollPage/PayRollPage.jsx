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

  const showToast = (type, message) => {
    setToast({ open: true, type, message });
    window.clearTimeout(window.__payrollToastTimer);
    window.__payrollToastTimer = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 1800);
  };

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

  const employees = useMemo(() => {
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

  const employeeNames = useMemo(
    () => uniqueValues(employees, "name"),
    [employees],
  );
  const employeeDesignations = useMemo(
    () => uniqueValues(employees, "role"),
    [employees],
  );
  const employeeDepartments = useMemo(
    () => uniqueValues(employees, "department"),
    [employees],
  );

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

  const currentDateLabel = useMemo(() => dateValueToLabel(payDate), [payDate]);

  const netSalary = useMemo(
    () =>
      Number(baseSalary || 0) +
      toAmount(bonus) +
      toAmount(overtime) -
      toAmount(deduction),
    [baseSalary, bonus, overtime, deduction],
  );

  const totalSalaryPaid = useMemo(
    () => records.reduce((sum, record) => sum + (record.netSalary || 0), 0),
    [records],
  );

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

  const generatedKeys = useMemo(() => {
    const keys = {};
    records.forEach((rec) => {
      const key = `${rec.empId}_${rec.salaryPeriod}`;
      keys[key] = true;
    });
    return keys;
  }, [records]);

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

  const downloadPayslip = () => {
    const currentPayslip = getCurrentPayslipData();
    if (!currentPayslip) return;
    savePayslipFile(currentPayslip.payslip, currentPayslip.employee);
  };

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

  const clearEmployeeSelection = (setter) => (value) => {
    setter(value);
    setSelectedEmployeeId("");
  };

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