
      try {
        const res = await fetch(`${BASE}/api/employee`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          const mapped = data.employee.map((emp) => ({
            ...emp,
            id: emp.employeeId,
            profileImage: emp.profileImage
              ? emp.profileImage.startsWith("http") ||
                emp.profileImage.startsWith("data:")
                ? emp.profileImage
                : `${BASE}/${emp.profileImage.replace(/\\/g, "/")}`
              : "",
            joiningDate: emp.joiningDate ? emp.joiningDate.split("T")[0] : "",
          }));
          setEmployees(mapped);
          setEmployeesFetched(true);
        }
      } 

  
  // Announcements
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(false);
  const [announcementsFetched, setAnnouncementsFetched] = useState(false);
  const announcementsFetchingRef = useRef(false);

  const fetchAnnouncements = useCallback(
    async (force = false, silent = false) => {
      if (!user?.token) return;
      if (!force && announcementsFetched) return;
      if (announcementsFetchingRef.current) return;
      announcementsFetchingRef.current = true;
      if (!silent) setAnnouncementsLoading(true);
      try {
        const res = await fetch(`${BASE}/api/announcements`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setAnnouncements(data.announcements || []);
          setAnnouncementsFetched(true);
        }
      } catch (err) {
        console.error("DataContext: fetchAnnouncements error", err);
      } finally {
        if (!silent) setAnnouncementsLoading(false);
        announcementsFetchingRef.current = false;
      }
    },
    [user?.token, announcementsFetched],
  );
