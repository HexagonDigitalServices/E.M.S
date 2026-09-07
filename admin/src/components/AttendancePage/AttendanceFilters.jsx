import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  FileText,
  Search,
} from "lucide-react";
import { formatDate } from "../EmployeePage/employeePageUtils";
import { statusOptions } from "./attendanceUtils";
import { attendanceFiltersStyles as s } from "../../assets/dummyStyles";

const AttendanceFilters = ({
  attendanceDate,
  departmentFilter,
  departmentOptions,
  designationFilter,
  designationOptions,
  onDateChange,
  onDepartmentChange,
  onDesignationChange,
  onSearchChange,
  onStatusChange,
  rowsCount,
  searchTerm,
  statusFilter,
  todayDate,
}) => (
  <div className={s.container}>
    <div>
      <h2 className={s.title}>Attendance List</h2>
      <p className={s.subtitle}>
        {rowsCount} records for {formatDate(attendanceDate)}
      </p>
    </div>

    <div className={s.filtersWrapper}>
      <label className={s.searchLabel}>
        <Search className={s.icon} />
        <input
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search employee..."
          className={s.searchInput}
          type="search"
        />
      </label>

      <label className={s.filterLabel}>
        <CalendarDays className={s.icon} />
        <input
          value={attendanceDate}
          onChange={(event) => onDateChange(event.target.value)}
          className={s.filterInput}
          max={todayDate}
          type="date"
        />
      </label>

      <label className={s.filterLabel}>
        <FileText className={s.icon} />
        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          className={s.filterSelect}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label className={s.filterLabel}>
        <Building2 className={s.icon} />
        <select
          value={departmentFilter}
          onChange={(event) => onDepartmentChange(event.target.value)}
          className={s.filterSelect}
          aria-label="Filter by department"
        >
          {departmentOptions.map((department) => (
            <option key={department} value={department}>
              {department === "All" ? "All Departments" : department}
            </option>
          ))}
        </select>
      </label>

      <label className={s.filterLabel}>
        <BriefcaseBusiness className={s.icon} />
        <select
          value={designationFilter}
          onChange={(event) => onDesignationChange(event.target.value)}
          className={s.filterSelect}
          aria-label="Filter by designation"
        >
          {designationOptions.map((designation) => (
            <option key={designation} value={designation}>
              {designation === "All" ? "All Designations" : designation}
            </option>
          ))}
        </select>
      </label>
    </div>
  </div>
);

export default AttendanceFilters;