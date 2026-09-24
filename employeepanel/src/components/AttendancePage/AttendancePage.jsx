import { useMemo, useState } from "react";
import { CalendarDays, Send, X } from "lucide-react";
import {
  dates,
  displayDate,
  employee,
  today,
} from "../EmployeePanel/employeePanelData";
import Status from "../EmployeePanel/Status";
import { getEmployeeUser } from "../../auth/employeeAuth";
import { attendancePageStyles as s } from "../../assets/dummyStyles";

function AttendanceTable({ rows }) {
  return (
    <div className={s.attendanceTableRoot}>
      <div className={s.attendanceTableInner}>
        <div className={s.attendanceTableHeader}>
          <span>Employee</span>
          <span>Date</span>
          <span className={s.attendanceTableHeaderCell}>Status</span>
        </div>
        {rows.map((record, index) => (
          <div key={index} className={s.attendanceTableRow}>
            <div className={s.attendanceTableEmployee}>
              <b className={s.attendanceTableName}>{record.name}</b>
              <span className={s.attendanceTableEmpId}>
                {record.empId || "-"}
              </span>
            </div>
            <span>{displayDate(record.from)}</span>
            <Status s={record.status} />
          </div>
        ))}
        {!rows.length && (
          <div className={s.attendanceTableEmpty}>No attendance data found</div>
        )}
      </div>
    </div>
  );
}

const AttendancePage = ({
  records,
  setRecords,
  notify,
  fetchRecords,
  joiningDate,
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ from: today(), to: today(), reason: "" });
  const [marking, setMarking] = useState(false);
  const [applying, setApplying] = useState(false);

  const rows = useMemo(() => {
    const leaveDates = records
      .filter((record) => record.type == "Leave" && record.status == "Approved")
      .flatMap((record) =>
        dates(record.from, record.to).map((day) => ({ day, record })),
      );

    const absentRows = [];
    if (joiningDate) {
      const startStr = joiningDate.split("T")[0];
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayStr = yesterdayDate.toLocaleDateString("en-CA");

      if (startStr <= yesterdayStr) {
        const days = dates(startStr, yesterdayStr);
        const employeeName =
          records[0]?.name || getEmployeeUser()?.name || "Employee";
        const employeeEmpId =
          records.find((r) => r.empId)?.empId ||
          getEmployeeUser()?.employeeId ||
          "";
        for (const day of days) {
          const isPresent = records.some(
            (r) => r.type === "Present" && r.from === day,
          );
          const isOnLeave = records.some(
            (r) =>
              r.type === "Leave" &&
              r.status === "Approved" &&
              day >= r.from &&
              day <= r.to,
          );

          if (!isPresent && !isOnLeave) {
            absentRows.push({
              id: `absent-${day}`,
              type: "Absent",
              name: employeeName,
              empId: employeeEmpId,
              from: day,
              to: day,
              reason: "-",
              status: "Absent",
            });
          }
        }
      }
    }

    const allRows = [
      ...records.filter((record) => record.type == "Present"),
      ...absentRows,
    ];

    return allRows
      .filter(
        (record) => !filter || dates(record.from, record.to).includes(filter),
      )
      .sort((a, b) => b.from.localeCompare(a.from));
  }, [records, filter, joiningDate]);

  const leaveTaken = (date) =>
    records.some(
      (record) =>
        record.type == "Leave" &&
        record.status != "Rejected" &&
        dates(record.from, record.to).includes(date),
    );
  const presentDone = records.some(
    (record) => record.type == "Present" && record.from == today(),
  );
  const leaveDone = records.some(
    (record) => record.type == "Leave" && record.status == "Leave Applied",
  );

  const mark = async () => {
    if (presentDone) {
      return notify("Today already submitted");
    }
    if (leaveTaken(today())) {
      return notify("Cannot mark present on a day you have applied for leave");
    }

    const user = getEmployeeUser();
    if (!user || !user.token) {
      return notify("Unauthorized. Please log in.");
    }

    setMarking(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/attendance/mark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      const data = await response.json();
      if (!response.ok) {
        setMarking(false);
        return notify(data.message || "Failed to mark attendance");
      }

      notify("Present marked successfully");
      if (fetchRecords) await fetchRecords();
    } catch (err) {
      console.error(err);
      notify("Failed to connect to server");
    } finally {
      setMarking(false);
    }
  };

  const apply = async (event) => {
    event.preventDefault();
    const selectedDates = dates(form.from, form.to);

    if (!form.reason.trim()) return notify("Please add reason");
    if (presentDone && selectedDates.includes(today())) {
      return notify("Cannot apply for leave on a day you are marked present");
    }
    if (
      form.from < today() ||
      form.to < form.from ||
      selectedDates.some(leaveTaken)
    ) {
      return notify("Selected dates are not available");
    }

    const user = getEmployeeUser();
    if (!user || !user.token) {
      return notify("Unauthorized. Please log in.");
    }

    setApplying(true);
    try {
      const response = await fetch("http://localhost:5000/api/leave/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          fromDate: form.from,
          toDate: form.to,
          reason: form.reason.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setApplying(false);
        return notify(data.message || "Failed to apply for leave");
      }

      setOpen(false);
      setForm({ from: today(), to: today(), reason: "" });
      notify("Leave applied successfully");
      if (fetchRecords) await fetchRecords();
    } catch (err) {
      console.error(err);
      notify("Failed to connect to server");
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <section className={s.mainContainer}>
        <div className={s.mainBgDeco} />
        <div className={s.mainHeader}>
          <div className={s.mainDateContainer}>
            <p className={s.mainDateLabel}>
              <CalendarDays size={16} /> Today {displayDate(today())}
            </p>
            <h2 className={s.mainTitle}>Mark Attendance</h2>
            <p className={s.mainSubtitle}>
              Choose present or submit one leave request.
            </p>
          </div>
          <div className={s.mainActions}>
            <button
              disabled={marking || presentDone || leaveTaken(today())}
              onClick={mark}
              className={s.presentButton}
            >
              {marking && (
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
              )}
              {marking ? "Marking..." : "Present"}
            </button>
            <button
              disabled={leaveDone}
              onClick={() => setOpen(true)}
              className={s.leaveButton}
            >
              Apply Leave
            </button>
          </div>
        </div>
      </section>

      <div className={s.detailsContainer}>
        <h3 className={s.detailsTitle}>Attendance Details</h3>
        <label className={s.filterLabel}>
          <CalendarDays size={16} />
          <input
            type="date"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className={s.filterInput}
          />
          {filter && (
            <button
              type="button"
              onClick={() => setFilter("")}
              className={s.filterClear}
            >
              Clear
            </button>
          )}
        </label>
      </div>

      <AttendanceTable rows={rows} />

      {open && (
        <div className={s.modalOverlay}>
          <form onSubmit={apply} className={s.modalForm}>
            <div className={s.modalHeader}>
              <h3 className={s.modalTitle}>Apply For Leave</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={s.modalClose}
              >
                <X size={18} />
              </button>
            </div>
            <div className={s.modalGrid}>
              <label className={s.modalLabel}>
                From
                <input
                  type="date"
                  min={today()}
                  value={form.from}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      from: event.target.value,
                      to:
                        event.target.value > form.to
                          ? event.target.value
                          : form.to,
                    })
                  }
                  className={s.modalInput}
                />
              </label>
              <label className={s.modalLabel}>
                To
                <input
                  type="date"
                  min={form.from}
                  value={form.to}
                  onChange={(event) =>
                    setForm({ ...form, to: event.target.value })
                  }
                  className={s.modalInput}
                />
              </label>
            </div>
            <textarea
              required
              placeholder="Write reason"
              value={form.reason}
              onChange={(event) =>
                setForm({ ...form, reason: event.target.value })
              }
              className={s.modalTextarea}
            />
            <button disabled={applying} className={s.modalSubmit}>
              {applying ? (
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
                  Applying...
                </>
              ) : (
                <>
                  <Send size={18} /> Apply Leave
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AttendancePage;
