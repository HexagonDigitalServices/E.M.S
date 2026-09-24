import { useMemo, useState, useEffect } from "react";
import {
  CalendarDays,
  Download,
  Filter,
  ReceiptText,
  Search,
} from "lucide-react";
import { money } from "../EmployeePanel/employeePanelData";
import {
  buildEmployeePayslipHtml,
  getPayslipDate,
  getSalaryPeriod,
} from "./buildEmployeePayslipHtml";
import { getEmployeeUser } from "../../auth/employeeAuth";
import "./PaySlipPage.css";

const getFileName = (record) =>
  `payslip-${record.name.toLowerCase().replace(/\s+/g, "-")}-${(
    record.salaryPeriod ||
    record.payDate ||
    record.id
  ).replace(/\s+/g, "-")}.html`;

const PaySlipPage = ({ notify }) => {
  const [filters, setFilters] = useState({ month: "", payslipDate: "" });
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayslips = async () => {
      const user = getEmployeeUser();
      if (!user || !user.token) return;
      try {
        const response = await fetch("http://localhost:5000/api/payroll", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (response.ok && data.success) {
          const mapped = data.records.map((rec) => ({
            ...rec,
            id: rec.payrollId,
          }));
          setRecords(mapped);
        }
      } catch (err) {
        console.error("Error fetching payslips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayslips();
  }, []);

  const employeeRecords = useMemo(() => {
    return [...records].sort((a, b) =>
      String(b.payDate || b.salaryPeriod).localeCompare(
        String(a.payDate || a.salaryPeriod),
      ),
    );
  }, [records]);

  const filteredRecords = useMemo(
    () =>
      employeeRecords.filter(
        (record) =>
          (!filters.month || record.salaryPeriod === filters.month) &&
          (!filters.payslipDate || record.payDate === filters.payslipDate),
      ),
    [employeeRecords, filters],
  );

  const downloadSlip = (record) => {
    const blob = new Blob([buildEmployeePayslipHtml(record)], {
      type: "text/html;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getFileName(record);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    if (notify) notify("Payslip downloaded");
  };

  return (
    <div className="payslip-page">
      <section className="payslip-panel">
        <div className="payslip-header">
          <div>
            <span className="payslip-icon">
              <ReceiptText size={24} />
            </span>
            <p className="payslip-kicker">Payroll records</p>
            <h2 className="payslip-title">My Payslips</h2>
          </div>

          <div className="payslip-filters">
            <label className="payslip-filter">
              <span>
                <Filter size={16} /> Salary Period
              </span>
              <input
                type="month"
                value={filters.month}
                onChange={(event) =>
                  setFilters({ ...filters, month: event.target.value })
                }
              />
            </label>
            <label className="payslip-filter">
              <span>
                <CalendarDays size={16} /> Payslip Date
              </span>
              <input
                type="date"
                value={filters.payslipDate}
                onChange={(event) =>
                  setFilters({ ...filters, payslipDate: event.target.value })
                }
              />
            </label>
          </div>
        </div>

        {(filters.month || filters.payslipDate) && (
          <div className="payslip-clear-row">
            <button
              type="button"
              onClick={() => setFilters({ month: "", payslipDate: "" })}
              className="payslip-clear-button"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="payslip-panel">
        <div className="payslip-table-wrap">
          <table className="payslip-table">
            <thead>
              <tr>
                <th>Payroll ID</th>
                <th>Employee</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Pay Date</th>
                <th>Salary Period</th>
                <th>Base Salary</th>
                <th>Net Salary</th>
                <th>Status</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => {
                const netSalary =
                  record.netSalary ??
                  Number(record.baseSalary || 0) +
                    Number(record.bonus || 0) +
                    Number(record.overtime || 0) -
                    Number(record.deduction || 0);

                return (
                  <tr key={record.id}>
                    <td className="payslip-muted-cell">{record.id}</td>
                    <td className="payslip-strong-cell">{record.name}</td>
                    <td className="payslip-muted-cell">{record.role}</td>
                    <td className="payslip-muted-cell">{record.department}</td>
                    <td className="payslip-muted-cell">
                      {getPayslipDate(record)}
                    </td>
                    <td className="payslip-muted-cell">
                      {getSalaryPeriod(record)}
                    </td>
                    <td className="payslip-muted-cell">
                      {money(Number(record.baseSalary || 0))}
                    </td>
                    <td className="payslip-strong-cell">{money(netSalary)}</td>
                    <td>
                      <span className="payslip-status">
                        {record.status || "Paid"}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => downloadSlip(record)}
                        className="payslip-download"
                      >
                        <Download size={16} />
                        Payslip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {!loading && !filteredRecords.length && (
        <div className="payslip-empty">
          <Search size={30} />
          <h3>No payslip found</h3>
          <p>Try another salary period or payslip date.</p>
        </div>
      )}
    </div>
  );
};

export default PaySlipPage;
