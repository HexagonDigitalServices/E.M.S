import { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  CircleDollarSign,
  ShieldCheck,
  UserPlus,
  UsersRound,
} from "lucide-react";
import { useAuth } from "../../auth/useAuth";
import { useData } from "../../context/DataContext";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import EmployeeFilters from "./EmployeeFilters";
import EmployeeFormModal from "./EmployeeFormModal";
import EmployeeTable from "./EmployeeTable";
import EmployeeToast from "./EmployeeToast";
import SummaryCard from "./SummaryCard";
import {
  createAvatarImage,
  emptyEmployeeForm,
  getDigitsOnly,
  getInitials,
  getMonthlySalaryValue,
  getNextEmployeeId,
  getPhoneDigits,
  getTodayDate,
  formatSalary,
  isPastDate,
  validateEmployeeForm,
} from "./employeePageUtils";
import { employeePageStyles as s } from "../../assets/dummyStyles";

const summaryItems = [
  { label: "Total Employees", key: "total", icon: UsersRound },
  { label: "Departments", key: "departments", icon: Building2 },
  { label: "Active Accounts", key: "active", icon: ShieldCheck },
];
// Renders the employee directory and manages loading, searching, filtering, create/edit/delete actions, and toast messages; outputs the page JSX.
const EmployeePage = () => {
  const { user } = useAuth();
  const { employees, setEmployees, fetchEmployees } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editingEmployeeDbId, setEditingEmployeeDbId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState(emptyEmployeeForm);
  const [formErrors, setFormErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProgress, setToastProgress] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const toastTimer = useRef(null);
  const toastFrame = useRef(null);
  const toastExitTimer = useRef(null);
  const todayDate = getTodayDate();

  // Builds an array containing "All" and each unique employee department; outputs the department filter options.
  const departments = useMemo(
    // Returns "All" plus the unique department names; outputs the array used by the department filter.
    () => [
      "All",
      ...new Set(
        employees.map(
          // Converts one employee object into its department name; outputs a string.
          (employee) => employee.department,
        ),
      ),
    ],
    [employees],
  );

  // Filters employees by department and case-insensitive search across employee fields; outputs the matching employee array.
  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    // Checks each employee’s department and searchable details; returns true only when both filters match.
    return employees.filter((employee) => {
      const matchesDepartment =
        department === "All" || employee.department === department;
      const searchText = [
        employee.id,
        employee.name,
        employee.email,
        employee.workEmail,
        employee.phone,
        employee.gender,
        employee.department,
        employee.designation,
        employee.bankName,
        employee.accountNumber,
        employee.ifscCode,
        employee.salary,
        employee.salaryPeriod,
        employee.salaryMonth,
        employee.accountStatus,
      ]
        .join(" ")
        .toLowerCase();

      return matchesDepartment && searchText.includes(query);
    });
  }, [department, employees, searchTerm]);

  // Calculates employee totals, unique department count, formatted monthly salary, and active-account count; outputs a summary object.
  const summary = useMemo(
    () => ({
      total: filteredEmployees.length,
      departments: new Set(
        filteredEmployees.map((employee) => employee.department),
      ).size,
      monthlySalary: formatSalary(
        filteredEmployees.reduce(
          (sum, employee) =>
            sum + getMonthlySalaryValue(employee.salary, employee.salaryPeriod),
          0,
        ),
      ),
      active: filteredEmployees.filter(
        (employee) => employee.accountStatus === "Active",
      ).length,
    }),
    [filteredEmployees],
  );
  // Calculates the next employee ID from the current employee list; outputs the next ID string.
  const nextEmployeeId = useMemo(
    () => getNextEmployeeId(employees),
    [employees],
  );

  // Clears pending toast timers when the component unmounts; the effect returns a cleanup function.
  useEffect(() => {
    // Cancels all toast-related timeouts during cleanup; outputs no value.
    return () => {
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(toastFrame.current);
      window.clearTimeout(toastExitTimer.current);
    };
  }, []);

  // Loads employees on mount, refreshes every eight seconds and on window focus, then cleans up the interval and listener.
  useEffect(() => {
    fetchEmployees();

    const interval = setInterval(() => {
      fetchEmployees(true, true);
    }, 8000);

    const handleFocus = () => {
      fetchEmployees(true, true);
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchEmployees]);

  // Cancels all active toast timeouts; outputs no value and prevents stale toast callbacks from running.
  const clearToastTimers = () => {
    window.clearTimeout(toastTimer.current);
    window.clearTimeout(toastFrame.current);
    window.clearTimeout(toastExitTimer.current);
  };
  // Closes the toast and schedules its removal after 220 ms; updates toast state and outputs no value.
  const closeToast = () => {
    clearToastTimers();
    setToastOpen(false);
    // Clears the toast data after the exit animation delay; the callback sets toast state to null.
    toastExitTimer.current = window.setTimeout(() => setToast(null), 220);
  };
  // Displays a toast with a title, message, tone, and optional delete confirmation; updates toast animation/timer state and returns nothing.
  const showToast = ({
    title,
    message,
    tone = "success",
    confirmEmployee = null,
  }) => {
    clearToastTimers();
    setToast({ title, message, tone, confirmEmployee });
    setToastOpen(false);
    setToastProgress(false);

    toastFrame.current = window.setTimeout(() => {
      setToastOpen(true);

      if (!confirmEmployee) {
        window.setTimeout(() => setToastProgress(true), 60);
      }
    }, 20);

    if (!confirmEmployee) {
      toastTimer.current = window.setTimeout(closeToast, 3600);
    }
  };

  // Resets the form for a new employee, assigns the next ID and today’s joining date, and opens the add modal; outputs no value.
  const openAddModal = () => {
    setFormMode("add");
    setEditingEmployeeId(null);
    setEditingEmployeeDbId(null);
    setSelectedFile(null);
    setSelectedEmployee(null);
    setFormData({
      ...emptyEmployeeForm,
      id: nextEmployeeId,
      joiningDate: todayDate,
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Loads an employee’s current details into the form and opens edit mode; updates form state and outputs no value.
  const openEditModal = (employee) => {
    setFormMode("edit");
    setEditingEmployeeId(employee.id);
    setEditingEmployeeDbId(employee._id);
    setSelectedFile(null);
    setSelectedEmployee(null);
    setFormData({
      ...emptyEmployeeForm,
      ...employee,
      workEmail: employee.workEmail || employee.email || "",
      workPassword: employee.workPassword || "",
      salary: employee.salary.toString(),
      salaryPeriod: employee.salaryPeriod || "month",
      salaryMonth: employee.salaryMonth || todayDate.slice(0, 7),
    });
    setFormErrors({});
    setIsFormOpen(true);
  };
  // Closes the employee form and clears validation, selected-file, and edit-ID state; outputs no value.
  const closeFormModal = () => {
    setIsFormOpen(false);
    setFormErrors({});
    setSelectedFile(null);
    setEditingEmployeeDbId(null);
  };
  // Normalizes the selected field, prevents past joining dates when adding, and clears that field’s error; updates form state and returns nothing.
  const updateFormField = (field, value) => {
    let nextValue = value;

    if (field === "phone") nextValue = getPhoneDigits(value);
    if (field === "accountNumber")
      nextValue = getDigitsOnly(value).slice(0, 18);
    if (field === "ifscCode")
      nextValue = value.toUpperCase().replace(/\s/g, "").slice(0, 11);
    if (
      field === "joiningDate" &&
      formMode === "add" &&
      isPastDate(value, todayDate)
    ) {
      nextValue = todayDate;
    }

    setFormData((currentForm) => ({ ...currentForm, [field]: nextValue }));
    setFormErrors((currentErrors) => ({ ...currentErrors, [field]: "" }));
  };
  // Validates the chosen profile image, stores the file and preview data URL, or shows an error toast; outputs no value.
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast({
        title: "Invalid image",
        message: "Please upload a JPG, PNG, or WebP image file.",
        tone: "danger",
      });
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateFormField("profileImage", reader.result);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  // Validates and submits employee data to create/update the record, updates local state and shows the result toast; resolves without a useful return value.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateEmployeeForm({
      formData,
      employees,
      editingEmployeeId,
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast({
        title: "Form needs attention",
        message: "Please complete the highlighted employee fields.",
        tone: "danger",
      });
      return;
    }

    const initials = getInitials(formData.name);
    const fd = new FormData();
    fd.append("employeeId", formData.id.trim());
    fd.append("name", formData.name.trim());
    fd.append("email", formData.email.trim());
    fd.append("workEmail", formData.workEmail.trim());
    fd.append("workPassword", formData.workPassword.trim());
    fd.append("phone", getPhoneDigits(formData.phone));
    fd.append("gender", formData.gender);
    fd.append("department", formData.department.trim());
    fd.append("designation", formData.designation.trim());
    fd.append("salary", Number(formData.salary));
    fd.append("salaryPeriod", formData.salaryPeriod);
    fd.append("joiningDate", formData.joiningDate);
    fd.append("bankName", formData.bankName.trim());
    fd.append("accountNumber", getDigitsOnly(formData.accountNumber));
    fd.append("ifscCode", formData.ifscCode.trim().toUpperCase());
    fd.append("accountStatus", formData.accountStatus);

    if (selectedFile) {
      fd.append("profileImage", selectedFile);
    }

    setSaving(true);
    try {
      let response;
      if (formMode === "edit") {
        response = await fetch(
          `http://localhost:5000/api/employee/${editingEmployeeDbId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            body: fd,
          },
        );
      } else {
        response = await fetch("http://localhost:5000/api/employee", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: fd,
        });
      }

      const resData = await response.json();

      if (response.ok && resData.success) {
        const serverEmp = resData.employee;
        const mappedEmployee = {
          ...serverEmp,
          id: serverEmp.employeeId,
          profileImage: serverEmp.profileImage
            ? serverEmp.profileImage.startsWith("http") ||
              serverEmp.profileImage.startsWith("data:")
              ? serverEmp.profileImage
              : `http://localhost:5000/${serverEmp.profileImage.replace(/\\/g, "/")}`
            : createAvatarImage(initials),
          joiningDate: serverEmp.joiningDate
            ? serverEmp.joiningDate.split("T")[0]
            : "",
        };

        if (formMode === "edit") {
          setEmployees((currentEmployees) =>
            currentEmployees.map((employee) =>
              employee._id === editingEmployeeDbId ? mappedEmployee : employee,
            ),
          );
          showToast({
            title: "Employee updated",
            message: `${mappedEmployee.name} was updated successfully.`,
          });
        } else {
          setEmployees((currentEmployees) => [
            mappedEmployee,
            ...currentEmployees,
          ]);
          showToast({
            title: "Employee added",
            message: `${mappedEmployee.name} was added to the employee list.`,
          });
        }
        closeFormModal();
      } else {
        showToast({
          title: "Operation failed",
          message:
            resData.message || "An error occurred while saving the employee.",
          tone: "danger",
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      showToast({
        title: "Connection error",
        message: "Could not connect to the backend server.",
        tone: "danger",
      });
    } finally {
      setSaving(false);
    }
  };
  // Opens a delete-confirmation toast for the chosen employee; stores the employee to delete and outputs no value.
  const requestDelete = (employee) => {
    setSelectedEmployee(null);
    showToast({
      title: "Delete employee?",
      message: `Confirm delete for ${employee.name} (${employee.id}).`,
      tone: "warning",
      confirmEmployee: employee,
    });
  };
  // Sends the delete request, removes the employee locally on success, and shows a result toast; resolves without a useful return value.
  const confirmDelete = async () => {
    if (!toast?.confirmEmployee) return;

    const employee = toast.confirmEmployee;
    setDeleting(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/employee/${employee._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      const resData = await response.json();
      if (response.ok && resData.success) {
        setEmployees((currentEmployees) =>
          currentEmployees.filter((item) => item._id !== employee._id),
        );
        showToast({
          title: "Employee deleted",
          message: `${employee.name} was removed from the list.`,
          tone: "danger",
        });
      } else {
        showToast({
          title: "Delete failed",
          message: resData.message || "Could not delete the employee.",
          tone: "danger",
        });
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast({
        title: "Connection error",
        message: "Could not connect to the backend server.",
        tone: "danger",
      });
    } finally {
      setDeleting(false);
    }
  };

  // REST ARE THE UI PART THAT IS CREATED USING SMALL COMPONENTS
  return (
    <main className={s.main}>
      <EmployeeToast
        toast={toast}
        open={toastOpen}
        progress={toastProgress}
        onClose={closeToast}
        onConfirmDelete={confirmDelete}
        loading={deleting}
      />

      {isFormOpen && (
        <EmployeeFormModal
          mode={formMode}
          formData={formData}
          formErrors={formErrors}
          onChange={updateFormField}
          onClose={closeFormModal}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
          loading={saving}
        />
      )}

      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onDelete={requestDelete}
          onEdit={openEditModal}
        />
      )}

      <section className={s.section}>
        <div className={s.headerCard}>
          <div>
            <p className={s.headerBadge}>Employee Directory</p>
            <h1 className={s.headerTitle}>Manage Employee Records</h1>
            <p className={s.headerDescription}>
              View key employee records here. Open the eye icon for the full
              employee profile.
            </p>
          </div>

          <button type="button" onClick={openAddModal} className={s.addButton}>
            <UserPlus className={s.addIcon} />
            Add Employee
          </button>
        </div>

        <div className={s.summaryGrid}>
          {summaryItems.map(({ label, key, icon }) => (
            <SummaryCard
              key={label}
              label={label}
              value={summary[key]}
              icon={icon}
            />
          ))}
        </div>

        <div className={s.filterContainer}>
          <div>
            <h2 className={s.filterTitle}>Employee List</h2>
            <p className={s.filterSubtitle}>
              {filteredEmployees.length} records showing from {employees.length}{" "}
              employees
            </p>
          </div>
          <EmployeeFilters
            departments={departments}
            department={department}
            searchTerm={searchTerm}
            onDepartmentChange={setDepartment}
            onSearchChange={setSearchTerm}
          />
        </div>

        <EmployeeTable
          employees={filteredEmployees}
          onDelete={requestDelete}
          onEdit={openEditModal}
          onView={setSelectedEmployee}
        />
      </section>
    </main>
  );
};

export default EmployeePage;
