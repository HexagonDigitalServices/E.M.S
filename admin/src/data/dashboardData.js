export const chartPeriods = [
  { key: 'daily', label: 'Daily' },
  { key: 'weekly', label: 'Weekly' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'yearly', label: 'Yearly' },
]

export const chartMetrics = [
  { key: 'employees', label: 'Employees', suffix: '' },
  { key: 'salary', label: 'Salary Expense', suffix: '' },
  { key: 'announcements', label: 'Announcements', suffix: '' },
]

export const chartYears = ['2026']

export const chartMonths = [
  { value: '01', label: 'January', short: 'Jan' },
  { value: '02', label: 'February', short: 'Feb' },
  { value: '03', label: 'March', short: 'Mar' },
  { value: '04', label: 'April', short: 'Apr' },
  { value: '05', label: 'May', short: 'May' },
  { value: '06', label: 'June', short: 'Jun' },
  { value: '07', label: 'July', short: 'Jul' },
  { value: '08', label: 'August', short: 'Aug' },
  { value: '09', label: 'September', short: 'Sep' },
  { value: '10', label: 'October', short: 'Oct' },
  { value: '11', label: 'November', short: 'Nov' },
  { value: '12', label: 'December', short: 'Dec' },
]

export const chartWeeks = [
  { value: '1', label: 'Week 1', range: '1-7' },
  { value: '2', label: 'Week 2', range: '8-14' },
  { value: '3', label: 'Week 3', range: '15-21' },
  { value: '4', label: 'Week 4', range: '22-28' },
  { value: '5', label: 'Week 5', range: '29-31' },
]

export const dashboardFilterOptions = [
  { key: 'daily', label: 'Today' },
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
  { key: 'yearly', label: 'This Year' },
]

export const dashboardStats = [
  {
    id: 'employees',
    label: 'Total Employees',
    helper: 'Active employee records',
    icon: 'employees',
  },
  {
    id: 'salary',
    label: 'Total Salary Expense',
    helper: 'Payroll expense for selected range',
    icon: 'salary',
  },
  {
    id: 'announcements',
    label: 'Total Announcements',
    helper: 'Announcements created in selected range',
    icon: 'announcements',
  },
]

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const roundSalary = (value) => Number(value.toFixed(1))

const monthIndex = (month) => Number(month) - 1

const getDaysInMonth = (year, month) =>
  new Date(Number(year), Number(month), 0).getDate()

const getWeekDays = (year, month, week) => {
  const daysInMonth = getDaysInMonth(year, month)
  const start = (Number(week) - 1) * 7 + 1
  const end = Math.min(start + 6, daysInMonth)

  if (start > daysInMonth) return [daysInMonth]

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

const getBaseValues = (year, month = '05', employeeCount = 6, salaryTotal = 480000, announcementCount = 14) => {
  const yearStep = Number(year) - 2026
  const monthStep = monthIndex(month) - 4

  return {
    employees: Math.max(1, employeeCount + yearStep * 2 + monthStep),
    salary: Math.max(0.1, (salaryTotal / 100000) + yearStep * 0.5 + monthStep * 0.1),
    announcements: Math.max(1, announcementCount + yearStep * 1 + Math.floor(monthStep / 3)),
  }
}

export const getDashboardValues = ({
  employeeCount,
  salaryTotal,
  announcementCount,
  filter,
}) => {
  const multipliers = {
    daily: { salary: 0.05, announcements: 0.18 },
    weekly: { salary: 0.24, announcements: 0.42 },
    monthly: { salary: 1, announcements: 1 },
    yearly: { salary: 12, announcements: 8.5 },
  }

  const active = multipliers[filter] || multipliers.monthly
  const fallbackAnnouncements = {
    daily: 2,
    weekly: 6,
    monthly: 14,
    yearly: 96,
  }

  return {
    employees: employeeCount,
    salary: salaryTotal * active.salary,
    announcements:
      typeof announcementCount === 'number'
        ? Math.max(0, Math.round(announcementCount * active.announcements))
        : fallbackAnnouncements[filter],
  }
}

const pad2 = (n) => String(n).padStart(2, "0");

export const getChartSeries = ({ period, year, month, week, employees = [], announcements = [], payrolls = [] }) => {
  if (period === 'daily') {
    const daysCount = getDaysInMonth(year, month);
    return Array.from({ length: daysCount }, (_, index) => {
      const day = index + 1;
      const dateStr = `${year}-${month}-${pad2(day)}`;

      const activeEmployees = employees.filter((emp) => {
        if (!emp.joiningDate) return false;
        const joinStr = emp.joiningDate.split('T')[0];
        return joinStr === dateStr;
      }).length;

      const salaryExp = payrolls.filter((pay) => {
        const payStr = pay.payDate || (pay.createdAt && pay.createdAt.split('T')[0]);
        return payStr === dateStr;
      }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

      const annCount = announcements.filter((ann) => {
        if (!ann.createdAt) return false;
        const annStr = ann.createdAt.split('T')[0];
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
  }

  if (period === 'weekly') {
    return getWeekDays(year, month, week).map((day) => {
      const dateStr = `${year}-${month}-${pad2(day)}`;

      const activeEmployees = employees.filter((emp) => {
        if (!emp.joiningDate) return false;
        const joinStr = emp.joiningDate.split('T')[0];
        return joinStr === dateStr;
      }).length;

      const salaryExp = payrolls.filter((pay) => {
        const payStr = pay.payDate || (pay.createdAt && pay.createdAt.split('T')[0]);
        return payStr === dateStr;
      }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

      const annCount = announcements.filter((ann) => {
        if (!ann.createdAt) return false;
        const annStr = ann.createdAt.split('T')[0];
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
  }

  if (period === 'monthly') {
    return chartWeeks.map(({ label, range }) => {
      const [startDay, endDay] = range.split('-').map(Number);

      const lastDayStr = `${year}-${month}-${pad2(endDay)}`;
      const activeEmployees = employees.filter((emp) => {
        if (!emp.joiningDate) return false;
        const joinStr = emp.joiningDate.split('T')[0];
        const [empYear, empMonth, empDayStr] = joinStr.split('-');
        const empDay = Number(empDayStr);
        return empYear === year && empMonth === month && empDay >= startDay && empDay <= endDay;
      }).length;

      let salaryExp = 0;
      let annCount = 0;

      for (let day = startDay; day <= endDay; day++) {
        const dateStr = `${year}-${month}-${pad2(day)}`;

        salaryExp += payrolls.filter((pay) => {
          const payStr = pay.payDate || (pay.createdAt && pay.createdAt.split('T')[0]);
          return payStr === dateStr;
        }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

        annCount += announcements.filter((ann) => {
          if (!ann.createdAt) return false;
          const annStr = ann.createdAt.split('T')[0];
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
  }

  return chartMonths.map(({ short, value }) => {
    const daysInMonth = getDaysInMonth(year, value);
    const lastDayStr = `${year}-${value}-${pad2(daysInMonth)}`;

    const activeEmployees = employees.filter((emp) => {
      if (!emp.joiningDate) return false;
      const joinStr = emp.joiningDate.split('T')[0];
      const [empYear, empMonth] = joinStr.split('-');
      return empYear === year && empMonth === value;
    }).length;

    let salaryExp = 0;
    let annCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${value}-${pad2(day)}`;

      salaryExp += payrolls.filter((pay) => {
        const payStr = pay.payDate || (pay.createdAt && pay.createdAt.split('T')[0]);
        return payStr === dateStr;
      }).reduce((sum, pay) => sum + (pay.netSalary || 0), 0);

      annCount += announcements.filter((ann) => {
        if (!ann.createdAt) return false;
        const annStr = ann.createdAt.split('T')[0];
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

export const getChartTitle = ({ period, year, month, week }) => {
  const selectedMonth = chartMonths.find((item) => item.value === month)
  const selectedWeek = chartWeeks.find((item) => item.value === week)

  if (period === 'daily') {
    return {
      title: 'Daily Date Wise Wave',
      subtitle: `${selectedMonth.label} ${year} shown day by day from 1 onward.`,
    }
  }

  if (period === 'weekly') {
    return {
      title: 'Weekly Date Wise Trend',
      subtitle: `${selectedWeek.label} (${selectedWeek.range}) in ${selectedMonth.label} ${year}.`,
    }
  }

  if (period === 'monthly') {
    return {
      title: 'Monthly Week Split',
      subtitle: `${selectedMonth.label} ${year} shown as Week 1 to Week 5.`,
    }
  }

  return {
    title: 'Yearly Management Trend',
    subtitle: `${year} month-by-month totals across employees, salary, and announcements.`,
  }
}
