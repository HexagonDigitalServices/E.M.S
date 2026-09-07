import { Filter, Search } from "lucide-react";
import { employeeFiltersStyles as s } from "../../assets/dummyStyles";

const EmployeeFilters = ({
  departments,
  department,
  searchTerm,
  onDepartmentChange,
  onSearchChange,
}) => (
  <div className={s.container}>
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
      <Filter className={s.icon} />
      <select
        value={department}
        onChange={(event) => onDepartmentChange(event.target.value)}
        className={s.select}
        aria-label="Filter by department"
      >
        {departments.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default EmployeeFilters;