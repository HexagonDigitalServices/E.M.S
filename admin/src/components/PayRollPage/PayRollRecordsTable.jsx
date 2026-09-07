import { Download, Search } from "lucide-react";
import {
  formatCurrency,
  getRecordDateLabel,
  getRecordSalaryPeriodLabel,
} from "./payRollUtils";
import { payrollRecordsTableStyles as s } from "../../assets/dummyStyles";

const PayRollRecordsTable = ({
  dateFilter,
  filteredRecords,
  onDateFilterChange,
  onDownloadRecordPayslip,
  onSearchChange,
  search,
}) => (
  <div className={s.container}>
    <div className={s.header}>
      <div>
        <h2 className={s.title}>Payroll Records</h2>
        <p className={s.subtitle}>
          Filter records by employee or generated date.
        </p>
      </div>

      <div className={s.controls}>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          style={s.dateInputStyle}
          className={s.dateInput}
        />
        {dateFilter && (
          <button
            type="button"
            onClick={() => onDateFilterChange("")}
            className={s.clearButton}
          >
            Clear Date
          </button>
        )}
        <div className={s.searchWrapper}>
          <Search className={s.searchIcon} size={16} />
          <input
            type="text"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={s.searchInput}
          />
        </div>
      </div>
    </div>

    <div className={s.tableWrapper}>
      <div className={s.tableScroll}>
        <table className={s.table}>
          <thead className={s.tableHead}>
            <tr>
              <th className={s.tableHeader}>Payroll ID</th>
              <th className={s.tableHeader}>Employee</th>
              <th className={s.tableHeader}>Designation</th>
              <th className={s.tableHeader}>Department</th>
              <th className={s.tableHeader}>Pay Date</th>
              <th className={s.tableHeader}>Salary Period</th>
              <th className={s.tableHeader}>Net Salary</th>
              <th className={s.tableHeader}>Status</th>
              <th className={s.tableHeader}>Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((row, index) => (
              <tr
                key={`${row.id}-${index}`}
                className={s.tableRow}
              >
                <td className={s.cellId}>{row.id}</td>
                <td className={s.cellName}>{row.name}</td>
                <td className={s.cellRole}>{row.role}</td>
                <td className={s.cellDepartment}>{row.department}</td>
                <td className={s.cellDate}>
                  {getRecordDateLabel(row)}
                </td>
                <td className={s.cellPeriod}>
                  {getRecordSalaryPeriodLabel(row)}
                </td>
                <td className={s.cellNetSalary}>
                  {formatCurrency(row.netSalary)}
                </td>
                <td className={s.cellStatus}>
                  <span className={s.statusBadge}>Paid</span>
                </td>
                <td className={s.cellDownload}>
                  <button
                    type="button"
                    onClick={() => onDownloadRecordPayslip(row)}
                    className={s.downloadButton}
                  >
                    <Download className={s.downloadIcon} />
                    Payslip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default PayRollRecordsTable;