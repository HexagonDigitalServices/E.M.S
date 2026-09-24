const formatDateValue = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (year && month && day) return `${day}-${month}-${year}`;
  return value;
};

const getFormattedDisplayDateOnly = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  const pad2 = (value) => String(value).padStart(2, "0");
  return `${pad2(date.getDate())}-${pad2(date.getMonth() + 1)}-${date.getFullYear()}`;
};

const getAnnouncementDateValue = (announcement) => {
  if (!announcement.createdAt) return "";
  const parsedDate = new Date(announcement.createdAt);
  if (Number.isNaN(parsedDate.getTime())) return "";
  return parsedDate.toISOString().slice(0, 10);
};

const getAnnouncementDisplayDate = (announcement) => {
  if (!announcement.createdAt) return "";
  const date = new Date(announcement.createdAt);
  if (Number.isNaN(date.getTime())) return announcement.createdAt;
  const pad2 = (value) => String(value).padStart(2, "0");
  return `${pad2(date.getDate())}-${pad2(
    date.getMonth() + 1,
  )}-${date.getFullYear()} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const matchesSearch = (announcement, query) => {
  const targetLabel =
    announcement.sendTo === "Employee"
      ? announcement.recipient
        ? `${announcement.recipient.name} (${announcement.recipient.employeeId})`
        : "Employee"
      : "All Employees";

  const text = [
    announcement.title,
    announcement.message,
    targetLabel,
    announcement.createdAt,
  ]
    .join(" ")
    .toLowerCase();

  return text.includes(query.toLowerCase());
};


  const todayStr = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const handleFromDateChange = (val) => {
    setFromDate(val);
    if (toDate && val && toDate < val) {
      setToDate("");
    }
  };


  useEffect(() => {
    if (user?.token) {
      fetchAnnouncements();
      fetchEmployees();

      const interval = setInterval(() => {
        fetchAnnouncements(true);
        fetchEmployees();
      }, 8000);

      const handleFocus = () => {
        fetchAnnouncements(true);
        fetchEmployees();
      };
      window.addEventListener("focus", handleFocus);

      return () => {
        clearInterval(interval);
        window.removeEventListener("focus", handleFocus);
      };
    }
  }, [user?.token]);

  const selectedEmployee = useMemo(() => {
    const id = normalize(employeeId);
    if (!id) return null;
    return employees.find((emp) => normalize(emp.employeeId) === id);
  }, [employees, employeeId]);

  const employeeIds = useMemo(
    () => employees.map((employee) => employee.employeeId),
    [employees],
  );

  const filteredAnnouncements = useMemo(() => {
    const query = search.trim();
    return announcements.filter((item) => {
      const matchesDate =
        !dateFilter || getAnnouncementDateValue(item) === dateFilter;
      const matchesQuery = !query || matchesSearch(item, query);
      return matchesDate && matchesQuery;
    });
  }, [announcements, search, dateFilter]);

  const visibleAnnouncements = useMemo(() => {
    if (dateFilter || search.trim() || showAllPosts)
      return filteredAnnouncements;
    return filteredAnnouncements.slice(0, 4);
  }, [filteredAnnouncements, dateFilter, search, showAllPosts]);

  const hiddenPostCount = Math.max(
    filteredAnnouncements.length - visibleAnnouncements.length,
    0,
  );

  const showToast = (text) => {
    setToast(text);
    window.clearTimeout(window.__announcementToastTimer);
    window.__announcementToastTimer = window.setTimeout(
      () => setToast(""),
      1800,
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !message.trim()) {
      showToast("Please write title and message.");
      return;
    }

    if (targetType === "employee" && !selectedEmployee) {
      showToast("Please write valid employee ID.");
      return;
    }

    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      showToast("From Date cannot be after To Date.");
      return;
    }

    setLoading(true);
    try {
      const bodyData = {
        title: title.trim(),
        message: message.trim(),
        sendTo: targetType === "all" ? "All" : "Employee",
        recipient: targetType === "employee" ? selectedEmployee._id : null,
        fromDate: fromDate || null,
        toDate: toDate || null,
      };

      const response = await fetch("http://localhost:5000/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setTitle("");
        setMessage("");
        setEmployeeId("");
        setFromDate("");
        setToDate("");
        setShowAllPosts(false);
        showToast(
          targetType === "all"
            ? "Announcement sent to all employees."
            : `Announcement sent to ${selectedEmployee.name}.`,
        );
        fetchAnnouncements();
      } else {
        showToast(data.message || "Failed to create announcement.");
      }
    } catch (err) {
      console.error("Create announcement error:", err);
      showToast("Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    const announcement = announcements.find((item) => item._id === id);
    if (!announcement) return;
    setToast("");
    setPendingDelete(announcement);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/announcements/${pendingDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setAnnouncements(
          announcements.filter((item) => item._id !== pendingDelete._id),
        );
        setPendingDelete(null);
        showToast("Announcement removed.");
      } else {
        showToast(data.message || "Failed to delete announcement.");
      }
    } catch (err) {
      console.error("Delete announcement error:", err);
      showToast("Could not connect to the backend server.");
    }
  };

 

        <div className={s.grid}>
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.formHeader}>
              <div>
                <h2 className={s.formTitle}>Create Announcement</h2>
                <p className={s.formSubtitle}>Admin message composer.</p>
              </div>
              <span className={s.formIcon}>
                <Megaphone className={s.formIconSvg} />
              </span>
            </div>

            <div className={s.formFields}>
              <label className={s.fieldLabel}>
                <span className={s.fieldText}>Title</span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className={s.fieldInput}
                  placeholder="Meeting update"
                />
              </label>

              <label className={s.fieldLabel}>
                <span className={s.fieldText}>Message</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={s.fieldTextarea}
                  placeholder="Write announcement details"
                />
              </label>

              <div className={s.dateGrid}>
                <label className={s.fieldLabel}>
                  <span className={s.fieldText}>From Date</span>
                  <input
                    type="date"
                    value={fromDate}
                    min={todayStr}
                    onChange={(event) =>
                      handleFromDateChange(event.target.value)
                    }
                    style={s.dateInputStyle}
                    className={s.fieldInput}
                  />
                </label>
                <label className={s.fieldLabel}>
                  <span className={s.fieldText}>To Date</span>
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate || todayStr}
                    onChange={(event) => setToDate(event.target.value)}
                    style={s.dateInputStyle}
                    className={s.fieldInput}
                  />
                </label>
              </div>

              <div className={s.targetGroup}>
                <span className={s.fieldText}>Send To</span>
                <div className={s.targetToggle}>
                  <button
                    type="button"
                    onClick={() => setTargetType("all")}
                    className={`${s.targetButtonBase} ${
                      targetType === "all"
                        ? s.targetButtonActive
                        : s.targetButtonInactive
                    }`}
                  >
                    <UsersRound className={s.targetIcon} />
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetType("employee")}
                    className={`${s.targetButtonBase} ${
                      targetType === "employee"
                        ? s.targetButtonActive
                        : s.targetButtonInactive
                    }`}
                  >
                    <UserRound className={s.targetIcon} />
                    Employee
                  </button>
                </div>
              </div>

              {targetType === "employee" && (
                <div className={s.employeeSection}>
                  <div className={s.employeeHeader}>
                    <div>
                      <p className={s.employeeTitle}>Employee Details</p>
                      <p className={s.employeeSubtitle}>
                        Select or type the Employee ID.
                      </p>
                    </div>
                    <span className={s.employeeIcon}>
                      <UserCheck className={s.employeeIconSvg} />
                    </span>
                  </div>

                  <div className={s.employeeFields}>
                    <label className={s.fieldLabel}>
                      <span className={s.employeeIdLabel}>Employee ID</span>
                      <input
                        list="announcement-employee-ids"
                        value={employeeId}
                        onChange={(event) => setEmployeeId(event.target.value)}
                        className={s.employeeIdInput}
                        placeholder="e.g. EMP-1002"
                      />
                    </label>
                  </div>

                  <datalist id="announcement-employee-ids">
                    {employeeIds.map((id) => {
                      const emp = employees.find((e) => e.employeeId === id);
                      return (
                        <option key={id} value={id}>
                          {emp ? `${emp.name} (${emp.department})` : ""}
                        </option>
                      );
                    })}
                  </datalist>

                  {selectedEmployee && (
                    <div className={s.employeeMatch}>
                      <div className={s.employeeMatchTitle}>
                        Matched Employee:
                      </div>
                      <div>Name: {selectedEmployee.name}</div>
                      <div>Department: {selectedEmployee.department}</div>
                      <div>Designation: {selectedEmployee.designation}</div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={s.submitButton}
              >
                {loading ? (
                  <>
                    <svg
                      className={s.submitSpinner}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                    Sending Announcement...
                  </>
                ) : (
                  <>
                    <Send className={s.submitIcon} />
                    Send Announcement
                  </>
                )}
              </button>
            </div>
          </form>

          <div className={s.listPanel}>
            <div className={s.listHeader}>
              <div>
                <h2 className={s.listTitle}>Posted Announcements</h2>
                <p className={s.listSubtitle}>Recent admin messages.</p>
              </div>
              <div className={s.listFilters}>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(event) => setDateFilter(event.target.value)}
                  style={s.dateInputStyle}
                  className={s.listDateInput}
                />
                <div className={s.searchWrapper}>
                  <Search className={s.searchIcon} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className={s.searchInput}
                    placeholder="Search"
                  />
                </div>
                {(dateFilter || search.trim()) && (
                  <button
                    type="button"
                    onClick={() => {
                      setDateFilter("");
                      setSearch("");
                    }}
                    className={s.clearButton}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className={s.listItems}>
              {visibleAnnouncements.map((item) => {
                const isEmployeeTarget = item.sendTo === "Employee";
                const targetLabel = isEmployeeTarget
                  ? item.recipient
                    ? `${item.recipient.name} (${item.recipient.employeeId})`
                    : "Employee"
                  : "All Employees";

                return (
                  <article key={item._id} className={s.listItem}>
                    <div className={s.listItemHeader}>
                      <div className={s.listItemContent}>
                        <p className={s.listItemTitle}>{item.title}</p>
                        <p className={s.listItemMessage}>{item.message}</p>
                        {(item.fromDate || item.toDate) && (
                          <div className={s.listItemDates}>
                            <span>Active:</span>
                            <span className={s.listItemDateChip}>
                              {item.fromDate
                                ? getFormattedDisplayDateOnly(item.fromDate)
                                : "—"}
                            </span>
                            <span>to</span>
                            <span className={s.listItemDateChip}>
                              {item.toDate
                                ? getFormattedDisplayDateOnly(item.toDate)
                                : "—"}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className={s.listItemDelete}
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 className={s.listItemDeleteIcon} />
                      </button>
                    </div>
                    <div className={s.listItemTags}>
                      <span className={s.tagPrimary}>{targetLabel}</span>
                      {isEmployeeTarget && item.recipient?.department && (
                        <span className={s.tagSecondary}>
                          {item.recipient.department} -{" "}
                          {item.recipient.designation}
                        </span>
                      )}
                      <span className={s.tagSecondary}>
                        {getAnnouncementDisplayDate(item)}
                      </span>
                    </div>
                  </article>
                );
              })}

              {hiddenPostCount > 0 && !dateFilter && !search.trim() && (
                <button
                  type="button"
                  onClick={() => setShowAllPosts(true)}
                  className={s.showMoreButton}
                >
                  Show More ({hiddenPostCount})
                </button>
              )}

              {showAllPosts &&
                !dateFilter &&
                !search.trim() &&
                filteredAnnouncements.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setShowAllPosts(false)}
                    className={s.showLatestButton}
                  >
                    Show Latest 4
                  </button>
                )}

              {visibleAnnouncements.length === 0 && (
                <div className={s.emptyState}>
                  <Bell className={s.emptyIcon} />
                  <p className={s.emptyText}>No announcements found</p>
                </div>
              )}
            </div>
          </div>
        </div>
