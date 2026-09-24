const Stat = ({ icon: Icon, title, value, note }) => (
  <div className={s.statCard}>
    <div className={s.statCardDeco} />
    <div className={s.statCardContent}>
      <span className={s.statIconWrapper}>
        <Icon size={21} />
      </span>
      <p className={s.statTitle}>{title}</p>
      <div className={s.statValueRow}>
        <b className={s.statValue}>{value}</b>
        <small className={s.statNote}>{note}</small>
      </div>
    </div>
  </div>
);

export const Toast = ({ text }) =>
  text && (
    <div className={s.toastContainer}>
      <Sparkles className={s.toastIcon} size={16} />
      {text}
    </div>
  );

const getAnnouncementDisplayDate = (createdAt) => {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return createdAt;
  const pad2 = (val) => String(val).padStart(2, "0");
  return `${pad2(date.getDate())}-${pad2(date.getMonth() + 1)}-${date.getFullYear()} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};

const getFormattedDisplayDateOnly = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  const pad2 = (value) => String(value).padStart(2, "0");
  return `${pad2(date.getDate())}-${pad2(date.getMonth() + 1)}-${date.getFullYear()}`;
};



  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const leave = records.filter((record) => record.type == "Leave");
  const present = records.filter((record) => record.type == "Present").length;
  const approvedDays = leave
    .filter((record) => record.status == "Approved")
    .flatMap((record) => dates(record.from, record.to)).length;

  const absentDaysCount = (() => {
    if (!joiningDate) return 0;
    const startStr = joiningDate.split("T")[0];
    const todayStr = today();

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toLocaleDateString("en-CA");

    if (startStr > yesterdayStr) return 0;

    const days = dates(startStr, yesterdayStr);
    let absentCount = 0;
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
        absentCount++;
      }
    }
    return absentCount;
  })();

  const activeAnnouncements = useMemo(() => {
    const todayObj = new Date();
    const year = todayObj.getFullYear();
    const month = String(todayObj.getMonth() + 1).padStart(2, "0");
    const day = String(todayObj.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`;

    return announcements.filter((item) => {
      const rawEndDate = item.toDate || item.fromDate || item.createdAt;
      if (!rawEndDate) return true;
      const endObj = new Date(rawEndDate);
      if (Number.isNaN(endObj.getTime())) return true;

      const endYear = endObj.getFullYear();
      const endMonth = String(endObj.getMonth() + 1).padStart(2, "0");
      const endDay = String(endObj.getDate()).padStart(2, "0");
      const endDateStr = `${endYear}-${endMonth}-${endDay}`;

      if (endDateStr < todayStr) return false;
      return true;
    });
  }, [announcements]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const user = getEmployeeUser();
      if (!user || !user.token) return;
      try {
        const response = await fetch(
          "http://localhost:5000/api/announcements",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok && data.success) {
          setAnnouncements(data.announcements);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();

    const interval = setInterval(() => {
      fetchAnnouncements();
    }, 8000);

    const handleFocus = () => {
      fetchAnnouncements();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);


          <div className={s.announcementsGrid}>
            {activeAnnouncements.map((item) => {
              const isPersonal = item.sendTo === "Employee";
              return (
                <article
                  key={item._id}
                  onClick={() => setSelectedAnnouncement(item)}
                  className={s.announcementCard}
                >
                  <div className={s.announcementCardDeco} />
                  <div className={s.announcementCardInner}>
                    <div>
                      <div className={s.announcementCardHeader}>
                        <h3 className={s.announcementCardTitle}>
                          {item.title}
                        </h3>
                        <span
                          className={`${s.announcementBadgeBase} ${
                            isPersonal
                              ? s.announcementBadgeDirect
                              : s.announcementBadgeBroadcast
                          }`}
                        >
                          {isPersonal ? "Direct" : "Broadcast"}
                        </span>
                      </div>
                      <p className={s.announcementCardMessage}>
                        {item.message}
                      </p>
                      {(item.fromDate || item.toDate) && (
                        <div className={s.announcementCardDates}>
                          <span>Active:</span>
                          <span className={s.announcementCardDateChip}>
                            {item.fromDate
                              ? getFormattedDisplayDateOnly(item.fromDate)
                              : "—"}
                          </span>
                          <span>to</span>
                          <span className={s.announcementCardDateChip}>
                            {item.toDate
                              ? getFormattedDisplayDateOnly(item.toDate)
                              : "—"}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={s.announcementCardFooter}>
                      <span>By Admin</span>
                      <span>{getAnnouncementDisplayDate(item.createdAt)}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
       


      {selectedAnnouncement && (
        <div className={s.modalOverlay}>
          <div className={s.modalContainer}>
            <button
              type="button"
              onClick={() => setSelectedAnnouncement(null)}
              className={s.modalCloseButton}
            >
              <X size={16} />
            </button>
            <div className={s.modalHeader}>
              <span className={s.modalHeaderIcon}>
                <Bell size={18} />
              </span>
              <div>
                <span
                  className={`${s.modalBadgeBase} ${
                    selectedAnnouncement.sendTo === "Employee"
                      ? s.modalBadgeDirect
                      : s.modalBadgeBroadcast
                  }`}
                >
                  {selectedAnnouncement.sendTo === "Employee"
                    ? "Direct Message"
                    : "Broadcast"}
                </span>
                <p className={s.modalDate}>
                  {getAnnouncementDisplayDate(selectedAnnouncement.createdAt)}
                </p>
              </div>
            </div>
            <h3 className={s.modalTitle}>{selectedAnnouncement.title}</h3>
            <div className={s.modalBody}>
              <p className={s.modalMessage}>{selectedAnnouncement.message}</p>
              {(selectedAnnouncement.fromDate ||
                selectedAnnouncement.toDate) && (
                <div className={s.modalPeriod}>
                  <span>Active Period:</span>
                  <span className={s.modalPeriodChip}>
                    {selectedAnnouncement.fromDate
                      ? getFormattedDisplayDateOnly(
                          selectedAnnouncement.fromDate,
                        )
                      : "—"}
                  </span>
                  <span>to</span>
                  <span className={s.modalPeriodChip}>
                    {selectedAnnouncement.toDate
                      ? getFormattedDisplayDateOnly(selectedAnnouncement.toDate)
                      : "—"}
                  </span>
                </div>
              )}
            </div>
            <div className={s.modalFooter}>
              <button
                type="button"
                onClick={() => setSelectedAnnouncement(null)}
                className={s.modalCloseAction}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
   