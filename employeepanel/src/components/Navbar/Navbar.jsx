const tabs = [
  ["Dashboard", "/", LayoutDashboard],
  ["Attendance", "/attendance", CalendarCheck],
  ["Payslip", "/payslip", FileText],
  ["Leave", "/leave", Send],
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
