const chartWeeks = [
  { value: "1", label: "Week 1", range: "1-7" },
  { value: "2", label: "Week 2", range: "8-14" },
  { value: "3", label: "Week 3", range: "15-21" },
  { value: "4", label: "Week 4", range: "22-28" },
  { value: "5", label: "Week 5", range: "29-31" },
];

const chartMonths = [
  { value: "01", label: "January", short: "Jan" },
  { value: "02", label: "February", short: "Feb" },
  { value: "03", label: "March", short: "Mar" },
  { value: "04", label: "April", short: "Apr" },
  { value: "05", label: "May", short: "May" },
  { value: "06", label: "June", short: "Jun" },
  { value: "07", label: "July", short: "Jul" },
  { value: "08", label: "August", short: "Aug" },
  { value: "09", label: "September", short: "Sep" },
  { value: "10", label: "October", short: "Oct" },
  { value: "11", label: "November", short: "Nov" },
  { value: "12", label: "December", short: "Dec" },
];

const monthIndex = (month) => Number(month) - 1;

const getDaysInMonth = (year, month) =>
  new Date(Number(year), Number(month), 0).getDate();

const getWeekDays = (year, month, week) => {
  const daysInMonth = getDaysInMonth(year, month);
  const start = (Number(week) - 1) * 7 + 1;
  const end = Math.min(start + 6, daysInMonth);

  if (start > daysInMonth) return [daysInMonth];

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const pad2 = (n) => String(n).padStart(2, "0");

const normalizeToYYYYMMDD = (dateVal) => {
  if (!dateVal) return "";
  if (dateVal instanceof Date) {
    return dateVal.toISOString().split("T")[0];
  }
  let dateStr = String(dateVal);
  if (dateStr.includes("T")) {
    return dateStr.split("T")[0];
  }
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split("-");
    return `${y}-${m}-${d}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split("T")[0];
    }
  } catch (e) { }
  return dateStr;
};

export const getChartData = async (req, res) => {
  try {
    const { period = "daily", year = "2026", month = "05", week = "1" } = req.query;

    const employees = await Employee.find({}, "joiningDate salary");
    const announcements = await Announcement.find({}, "createdAt");
    const payrolls = await Payroll.find({}, "payDate netSalary createdAt");

    let series = [];
    const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const todayYear = String(nowIST.getFullYear());
    const todayMonth = pad2(nowIST.getMonth() + 1);
    const todayDay = nowIST.getDate();
    const todayStr = `${todayYear}-${todayMonth}-${pad2(todayDay)}`;

    const isCurrentYear = year === todayYear;
    const isCurrentMonth = isCurrentYear && month === todayMonth;

    if (period === "daily") {
      const daysCount = getDaysInMonth(year, month);

      series = Array.from({ length: daysCount }, (_, index) => {
        const day = index + 1;
        const dateStr = `${year}-${month}-${pad2(day)}`;

        if (dateStr > todayStr) {
          return { label: `${day}`, caption: `Day ${day}`, employees: 0, salary: 0, announcements: 0 };
        }

        const activeEmployees = employees.filter((emp) => {
          const joinStr = normalizeToYYYYMMDD(emp.joiningDate);
          return joinStr && joinStr === dateStr;
        }).length;

        const salaryExp = payrolls.filter((pay) => {
          const payStr = normalizeToYYYYMMDD(pay.payDate || pay.createdAt);
          return payStr === dateStr;
        }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

        const annCount = announcements.filter((ann) => {
          const annStr = normalizeToYYYYMMDD(ann.createdAt);
          return annStr === dateStr;
        }).length;

        return {
          label: `${day}`,
          caption: `Day ${day}`,
          employees: activeEmployees,
          salary: Number(salaryExp.toFixed(2)),
          announcements: annCount,
        };
      });
    } else if (period === "weekly") {
      const allDays = getWeekDays(year, month, week);

      series = allDays.map((day) => {
        const dateStr = `${year}-${month}-${pad2(day)}`;

        if (dateStr > todayStr) {
          return { label: `${day}`, caption: `Day ${day}`, employees: 0, salary: 0, announcements: 0 };
        }

        const activeEmployees = employees.filter((emp) => {
          const joinStr = normalizeToYYYYMMDD(emp.joiningDate);
          return joinStr && joinStr === dateStr;
        }).length;

        const salaryExp = payrolls.filter((pay) => {
          const payStr = normalizeToYYYYMMDD(pay.payDate || pay.createdAt);
          return payStr === dateStr;
        }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

        const annCount = announcements.filter((ann) => {
          const annStr = normalizeToYYYYMMDD(ann.createdAt);
          return annStr === dateStr;
        }).length;

        return {
          label: `${day}`,
          caption: `Day ${day}`,
          employees: activeEmployees,
          salary: Number(salaryExp.toFixed(2)),
          announcements: annCount,
        };
      });
    } else if (period === "monthly") {
      series = chartWeeks.map(({ label, range }) => {
        const [startDay, endDay] = range.split("-").map(Number);
        const daysInMonth = getDaysInMonth(year, month);
        const weekStartStr = `${year}-${month}-${pad2(startDay)}`;

        if (weekStartStr > todayStr) {
          return { label, caption: range, employees: 0, salary: 0, announcements: 0 };
        }
        const effectiveEnd = Math.min(endDay, daysInMonth);
        const lastDayStr = `${year}-${month}-${pad2(effectiveEnd)}`;

        const activeEmployees = employees.filter((emp) => {
          const joinStr = normalizeToYYYYMMDD(emp.joiningDate);
          if (!joinStr) return false;
          const [empYear, empMonth, empDayStr] = joinStr.split("-");
          const empDay = Number(empDayStr);
          return empYear === year && empMonth === month && empDay >= startDay && empDay <= Math.min(effectiveEnd, todayDay <= effectiveEnd ? todayDay : effectiveEnd);
        }).length;

        let salaryExp = 0;
        let annCount = 0;

        for (let day = startDay; day <= effectiveEnd; day++) {
          const dateStr = `${year}-${month}-${pad2(day)}`;
          if (dateStr > todayStr) break; // stop summing once we hit future

          salaryExp += payrolls.filter((pay) => {
            const payStr = normalizeToYYYYMMDD(pay.payDate || pay.createdAt);
            return payStr === dateStr;
          }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

          annCount += announcements.filter((ann) => {
            const annStr = normalizeToYYYYMMDD(ann.createdAt);
            return annStr === dateStr;
          }).length;
        }

        return {
          label,
          caption: range,
          employees: activeEmployees,
          salary: Number(salaryExp.toFixed(2)),
          announcements: annCount,
        };
      });
    } else if (period === "yearly") {
      series = chartMonths.map(({ short, value }) => {
        const monthStartStr = `${year}-${value}-01`;
        if (monthStartStr > todayStr) {
          return { label: short, employees: 0, salary: 0, announcements: 0 };
        }

        const daysInMonth = getDaysInMonth(year, value);
        const isThisMonth = isCurrentYear && value === todayMonth;
        const effectiveLastDay = isThisMonth ? todayDay : daysInMonth;
        const lastDayStr = `${year}-${value}-${pad2(effectiveLastDay)}`;

        const activeEmployees = employees.filter((emp) => {
          const joinStr = normalizeToYYYYMMDD(emp.joiningDate);
          if (!joinStr) return false;
          const [empYear, empMonth] = joinStr.split("-");
          return empYear === year && empMonth === value;
        }).length;

        let salaryExp = 0;
        let annCount = 0;

        for (let day = 1; day <= effectiveLastDay; day++) {
          const dateStr = `${year}-${value}-${pad2(day)}`;

          salaryExp += payrolls.filter((pay) => {
            const payStr = normalizeToYYYYMMDD(pay.payDate || pay.createdAt);
            return payStr === dateStr;
          }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

          annCount += announcements.filter((ann) => {
            const annStr = normalizeToYYYYMMDD(ann.createdAt);
            return annStr === dateStr;
          }).length;
        }

        return {
          label: short,
          employees: activeEmployees,
          salary: Number(salaryExp.toFixed(2)),
          announcements: annCount,
        };
      });
    }

    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.status(200).json({ success: true, series });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
