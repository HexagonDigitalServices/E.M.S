const handleDecideLeave = async (leaveId, employeeName, nextStatus) => {
    setDecidingId(leaveId);
    setDecidingAction(nextStatus);
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/attendance/leave/${leaveId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({ status: nextStatus }),
        },
      );
      const data = await response.json();
      if (response.ok && data.success) {
        showToast({
          title:
            nextStatus === "Approved" ? "Leave Approved" : "Leave Rejected",
          message: `${employeeName}'s leave request was ${nextStatus.toLowerCase()} successfully.`,
          tone: nextStatus === "Approved" ? "success" : "danger",
        });
        fetchLeavesData(true);
      } else {
        showToast({
          title: "Action failed",
          message: data.message || "Could not update leave request.",
          tone: "danger",
        });
      }
    } catch (err) {
      console.error("Error updating leave:", err);
      showToast({
        title: "Connection error",
        message: "Failed to update leave status.",
        tone: "danger",
      });
    } finally {
      setDecidingId(null);
      setDecidingAction(null);
    }
  };

  const stats = useMemo(() => {
    const counts = { pending: 0, approved: 0, rejected: 0 };
    leaves.forEach((leave) => {
      if (leave.status === "Pending") counts.pending++;
      else if (leave.status === "Approved") counts.approved++;
      else if (leave.status === "Rejected") counts.rejected++;
    });
    return counts;
  }, [leaves]);

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      if (filterDate) {
        const fromStr = new Date(leave.fromDate).toISOString().split("T")[0];
        const toStr = new Date(leave.toDate).toISOString().split("T")[0];
        if (filterDate < fromStr || filterDate > toStr) return false;
      }
      if (statusFilter !== "All" && leave.status !== statusFilter) return false;
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const empName = leave.employee?.name?.toLowerCase() || "";
        const empId = leave.employee?.employeeId?.toLowerCase() || "";
        const reason = leave.reason?.toLowerCase() || "";
        if (!empName.includes(query) && !empId.includes(query) && !reason.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [leaves, filterDate, searchTerm, statusFilter]);

  
  

        {/* Leaves Table */}
        <section className={s.tableSection}>
          <div className={s.tableWrapper}>
            <table className={s.table}>
              <thead className={s.tableHead}>
                <tr>
                  <th className={s.tableHeader}>Employee</th>
                  <th className={s.tableHeader}>Applied Date</th>
                  <th className={s.tableHeader}>Leave Duration</th>
                  <th className={s.tableHeader}>Reason</th>
                  <th className={`${s.tableHeader} ${s.tableHeaderCenter}`}>
                    Status
                  </th>
                  <th className={`${s.tableHeader} ${s.tableHeaderRight}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={s.tableBody}>
                {loading ? (
                  <tr>
                    <td colSpan="6" className={s.loadingCell}>
                      <div className={s.loadingSpinner} />
                      <p className={s.loadingText}>Loading leave requests...</p>
                    </td>
                  </tr>
                ) : filteredLeaves.length === 0 ? (
                  <tr>
                    <td colSpan="6" className={s.emptyCell}>
                      <AlertCircle className={s.emptyIcon} />
                      <p className={s.emptyTitle}>No leave applications found</p>
                      <p className={s.emptySubtitle}>
                        Try adjusting your filters or dates.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredLeaves.map((leave) => {
                    const employeeName = leave.employee?.name || "Unknown";
                    const employeeId = leave.employee?.employeeId || "N/A";
                    const isPending = leave.status === "Pending";

                    return (
                      <tr key={leave._id} className={s.tableRow}>
                        <td className={s.cell}>
                          <div>
                            <p className={s.employeeName}>{employeeName}</p>
                            <p className={s.employeeId}>ID: {employeeId}</p>
                          </div>
                        </td>

                        <td className={`${s.cell} ${s.appliedDate}`}>
                          {formatDate(leave.createdAt)}
                        </td>

                        <td className={s.cell}>
                          <p className={s.durationFrom}>
                            {formatDate(leave.fromDate)}
                          </p>
                          <p className={s.durationTo}>
                            to {formatDate(leave.toDate)}
                          </p>
                        </td>

                        <td
                          className={s.reasonCell}
                          title={leave.reason}
                        >
                          {leave.reason}
                        </td>

                        <td className={`${s.cell} ${s.statusCell}`}>
                          <StatusPill
                            label={
                              leave.status === "Pending"
                                ? "Leave Applied"
                                : leave.status === "Approved"
                                  ? "Leave Approved"
                                  : leave.status === "Rejected"
                                    ? "Leave Rejected"
                                    : leave.status
                            }
                          />
                        </td>

                        <td className={`${s.cell} ${s.actionsCell}`}>
                          {isPending ? (
                            <div className={s.actionButtonsWrapper}>
                              <button
                                type="button"
                                disabled={decidingId !== null}
                                onClick={() =>
                                  handleDecideLeave(
                                    leave._id,
                                    employeeName,
                                    "Approved",
                                  )
                                }
                                className={s.approveButton}
                                title="Approve Leave"
                              >
                                {decidingId === leave._id &&
                                decidingAction === "Approved" ? (
                                  <svg className={s.actionSpinner} fill="none" viewBox="0 0 24 24">
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
                                ) : (
                                  <Check className={s.actionIconSvg} />
                                )}
                              </button>
                              <button
                                type="button"
                                disabled={decidingId !== null}
                                onClick={() =>
                                  handleDecideLeave(
                                    leave._id,
                                    employeeName,
                                    "Rejected",
                                  )
                                }
                                className={s.rejectButton}
                                title="Reject Leave"
                              >
                                {decidingId === leave._id &&
                                decidingAction === "Rejected" ? (
                                  <svg className={s.actionSpinner} fill="none" viewBox="0 0 24 24">
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
                                ) : (
                                  <X className={s.actionIconSvg} />
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className={s.decidedText}>
                              Decided on {formatDate(leave.updatedAt)}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
   