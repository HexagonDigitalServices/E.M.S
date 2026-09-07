const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Employee", icon: UsersRound, href: "/employees" },
  { label: "Attendance", icon: CalendarCheck, href: "/attendance" },
  { label: "Leave", icon: CalendarOff, href: "/leaves" },
  { label: "Payroll", icon: BadgeDollarSign, href: "/payroll" },
  { label: "Announcements", icon: Bell, href: "/announcements" },
];

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);
