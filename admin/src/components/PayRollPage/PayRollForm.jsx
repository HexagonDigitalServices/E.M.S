import { Save } from "lucide-react";
import { formatCurrency } from "./payRollUtils";
import { payrollFormStyles as s } from "../../assets/dummyStyles";

const PayRollForm = ({
  baseSalary,
  bonus,
  currentDateLabel,
  deduction,
  departmentInput,
  employeeDepartments,
  employeeDesignations,
  employeeNames,
  designationInput,
  nameInput,
  netSalary,
  onGeneratePayslip,
  onBaseSalaryChange,
  onBonusChange,
  onDeductionChange,
  onDepartmentChange,
  onDesignationChange,
  onNameChange,
  onOvertimeChange,
  onSalaryPeriodChange,
  overtime,
  salaryPeriod,
  loading = false,
}) => (
  <div className={s.container}>
    <div className={s.header}>
      <div>
        <h2 className={s.title}>Create Payroll</h2>
        <p className={s.subtitle}>
          Write details and the system will auto-fill the rest.
        </p>
      </div>
      <div className={s.badge}>Payroll Form</div>
    </div>

    <div className={s.grid}>
      <div>
        <label className={s.label}>Name</label>
        <input
          list="employee-name-list"
          value={nameInput}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Type employee name"
          className={s.input}
        />
        <datalist id="employee-name-list">
          {employeeNames.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </div>

      <div>
        <label className={s.label}>Designation</label>
        <input
          list="employee-designation-list"
          value={designationInput}
          onChange={(e) => onDesignationChange(e.target.value)}
          placeholder="Type designation"
          className={s.input}
        />
        <datalist id="employee-designation-list">
          {employeeDesignations.map((designation) => (
            <option key={designation} value={designation} />
          ))}
        </datalist>
      </div>

      <div>
        <label className={s.label}>Department</label>
        <input
          list="employee-department-list"
          value={departmentInput}
          onChange={(e) => onDepartmentChange(e.target.value)}
          placeholder="Type department"
          className={s.input}
        />
        <datalist id="employee-department-list">
          {employeeDepartments.map((dept) => (
            <option key={dept} value={dept} />
          ))}
        </datalist>
      </div>

      <div>
        <label className={s.label}>Payslip Date</label>
        <div className={s.dateDisplay}>{currentDateLabel}</div>
      </div>

      <div>
        <label className={s.label}>Salary Period</label>
        <input
          type="month"
          value={salaryPeriod}
          onChange={(e) => onSalaryPeriodChange(e.target.value)}
          style={s.monthInputStyle}
          className={s.input}
        />
      </div>

      {[
        ["Base Salary", baseSalary, onBaseSalaryChange],
        ["Bonus", bonus, onBonusChange],
        ["Overtime", overtime, onOvertimeChange],
        ["Deduction", deduction, onDeductionChange],
      ].map(([label, value, onChange]) => (
        <div key={label}>
          <label className={s.label}>{label}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className={s.input}
          />
        </div>
      ))}
    </div>

    <div className={s.salarySection}>
      <div className={s.salaryInner}>
        <div>
          <p className={s.salaryLabel}>Calculated Net Salary</p>
          <div className={s.salaryValue}>{formatCurrency(netSalary)}</div>
        </div>
        <div className={s.buttonWrapper}>
          <button
            onClick={onGeneratePayslip}
            disabled={loading}
            className={s.generateButton}
          >
            {loading ? (
              <>
                <svg className={s.spinner} fill="none" viewBox="0 0 24 24">
                  <circle
                    className={s.spinnerCircle}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className={s.spinnerPath}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating Payslip...
              </>
            ) : (
              <>
                <Save className={s.saveIcon} size={16} />
                Generate Payslip
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PayRollForm;