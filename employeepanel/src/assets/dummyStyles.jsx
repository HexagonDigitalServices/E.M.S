export const attendancePageStyles = {
  // AttendanceTable
  attendanceTableRoot:
    "mt-3 overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm",
  attendanceTableInner: "min-w-120",
  attendanceTableHeader:
    "grid grid-cols-[1.5fr_1.5fr_1fr] gap-3 bg-zinc-50 p-4 text-sm font-black text-zinc-500",
  attendanceTableHeaderCell: "text-center",
  attendanceTableRow:
    "grid grid-cols-[1.5fr_1.5fr_1fr] gap-3 border-t border-zinc-100 p-4 text-sm items-center",
  attendanceTableEmployee: "flex flex-col",
  attendanceTableName: "font-bold text-zinc-950",
  attendanceTableEmpId: "text-xs text-zinc-400 font-semibold",
  attendanceTableEmpty: "p-6 text-center text-sm font-bold text-zinc-400",

  // Main section
  mainContainer:
    "relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm",
  mainBgDeco: "absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-zinc-100",
  mainHeader: "flex flex-wrap items-center justify-between gap-4",
  mainDateContainer: "relative",
  mainDateLabel: "flex items-center gap-2 text-sm font-medium text-zinc-500",
  mainTitle: "mt-1 text-2xl font-black",
  mainSubtitle: "mt-1 text-sm text-zinc-500",
  mainActions: "relative flex flex-wrap gap-3",
  presentButton:
    "inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 font-bold text-white shadow-lg shadow-zinc-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none",
  leaveButton:
    "rounded-xl border border-zinc-950 bg-white px-5 py-3 font-bold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-50 disabled:text-zinc-400 disabled:shadow-none",

  // Spinner (shared)
  spinner: "animate-spin h-4 w-4 text-current inline-block",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",

  // Details & filter
  detailsContainer:
    "mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  detailsTitle: "text-xl font-black",
  filterLabel:
    "flex w-full flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-bold text-zinc-500 sm:w-auto",
  filterInput:
    "min-w-0 flex-1 bg-transparent text-zinc-950 outline-none sm:flex-none",
  filterClear: "rounded-md bg-zinc-100 px-2 py-1 text-xs",

  // Modal
  modalOverlay: "fixed inset-0 z-40 grid place-items-center bg-black/40 p-4",
  modalForm: "w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl",
  modalHeader: "mb-4 flex items-center justify-between",
  modalTitle: "text-xl font-black",
  modalClose: "rounded-lg border border-zinc-200 p-2",
  modalGrid: "grid gap-3 sm:grid-cols-2",
  modalLabel: "text-sm font-bold text-zinc-500",
  modalInput: "mt-1 w-full rounded-xl border border-zinc-200 p-3 text-zinc-950",
  modalTextarea: "mt-3 h-28 w-full rounded-xl border border-zinc-200 p-3",
  modalSubmit:
    "mt-4 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed",
};

export const dashboardPageStyles = {
  // Root
  root: "space-y-8",

  // Stats grid
  statsGrid: "grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",

  // Stat card
  statCard:
    "group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl",
  statCardDeco:
    "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-zinc-100 transition group-hover:scale-150",
  statCardContent: "relative",
  statIconWrapper:
    "mb-5 grid h-11 w-11 place-items-center rounded-xl bg-zinc-950 text-white",
  statTitle: "text-sm font-medium text-zinc-500",
  statValueRow: "mt-1 flex items-end justify-between",
  statValue: "text-4xl text-zinc-950",
  statNote: "text-zinc-400",

  // Toast
  toastContainer:
    "fixed right-4 top-4 z-50 animate-[pulse_.8s_ease] rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold shadow-2xl",
  toastIcon: "mr-2 inline",

  // Announcements header
  announcementHeader: "mb-5 flex items-center gap-3",
  announcementHeaderIcon:
    "flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white",
  announcementTitle: "text-xl font-black tracking-normal text-zinc-950",
  announcementSubtitle: "mt-0.5 text-xs font-semibold text-zinc-500",

  // Empty state
  emptyAnnouncements:
    "rounded-2xl border border-dashed border-zinc-200 bg-white px-4 py-12 text-center shadow-xs",
  emptyIcon: "mx-auto h-8 w-8 text-zinc-400",
  emptyText: "mt-3 text-sm font-bold text-zinc-600",

  // Announcements grid
  announcementsGrid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",

  // Announcement card
  announcementCard:
    "group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md",
  announcementCardDeco:
    "absolute -right-8 -top-8 h-20 w-20 rounded-full bg-zinc-50 transition group-hover:scale-150",
  announcementCardInner:
    "relative flex flex-col justify-between h-full min-h-[130px]",
  announcementCardHeader: "flex items-start justify-between gap-3",
  announcementCardTitle: "text-sm font-black text-zinc-950 line-clamp-1",
  announcementBadgeBase:
    "shrink-0 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
  announcementBadgeDirect:
    "bg-amber-100 text-amber-800 border border-amber-200",
  announcementBadgeBroadcast:
    "bg-zinc-100 text-zinc-800 border border-zinc-200",
  announcementCardMessage:
    "mt-2.5 text-xs font-medium leading-relaxed text-zinc-500 line-clamp-3",
  announcementCardDates:
    "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-zinc-400",
  announcementCardDateChip:
    "rounded-md bg-zinc-100 px-1.5 py-0.5 text-zinc-600",
  announcementCardFooter:
    "mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-[10px] font-bold text-zinc-400",

  // Modal
  modalOverlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-xs",
  modalContainer:
    "relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl",
  modalCloseButton:
    "absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-950 hover:text-zinc-950",
  modalHeader: "flex items-center gap-2.5",
  modalHeaderIcon:
    "flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white",
  modalBadgeBase:
    "rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider",
  modalBadgeDirect: "bg-amber-100 text-amber-800 border border-amber-200",
  modalBadgeBroadcast: "bg-zinc-100 text-zinc-800 border border-zinc-200",
  modalDate: "text-[10px] font-bold text-zinc-400 mt-0.5",
  modalTitle: "mt-4 text-lg font-black text-zinc-950",
  modalBody:
    "mt-4 max-h-60 overflow-y-auto border-t border-zinc-100 pt-4 text-xs font-medium leading-relaxed text-zinc-600",
  modalMessage: "whitespace-pre-wrap",
  modalPeriod:
    "mt-4 flex flex-wrap items-center gap-1.5 border-t border-zinc-100 pt-3 text-[11px] font-bold text-zinc-500",
  modalPeriodChip: "rounded-md bg-zinc-100 px-2 py-0.5 text-zinc-700",
  modalFooter: "mt-6 flex justify-end",
  modalCloseAction:
    "rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-black text-white hover:bg-zinc-800",
};

export const statusStyles = {
  getStatusClass: (status) => {
    const base =
      "inline-flex w-fit min-w-24 justify-center items-center justify-self-center rounded-full px-3 py-1.5 text-xs font-bold shadow-sm";

    let variant = "";
    if (status === "Approved" || status === "Present") {
      variant = "bg-zinc-950 text-white";
    } else if (status === "Absent") {
      variant = "bg-rose-50 text-rose-700 border border-rose-200";
    } else if (status === "Rejected") {
      variant = "bg-zinc-200 text-zinc-950";
    } else {
      variant = "border border-zinc-300 bg-white text-zinc-700";
    }

    return `${base} ${variant}`;
  },
};

export const leavePageStyles = {
  container:
    "mt-5 overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm",
  innerWrapper: "min-w-190",
  header:
    "grid grid-cols-[1.2fr_1fr_1fr_minmax(0,1.5fr)_1fr] gap-3 bg-zinc-50 p-4 text-sm font-black text-zinc-500",
  headerAction: "text-center",
  row: "grid grid-cols-[1.2fr_1fr_1fr_minmax(0,1.5fr)_1fr] gap-3 border-t border-zinc-100 p-4 text-sm items-center",
  employeeColumn: "flex flex-col",
  employeeName: "font-bold text-zinc-950",
  employeeId: "text-xs text-zinc-400 font-semibold",
  reason: "min-w-0 whitespace-normal wrap-break-word text-zinc-500",
  emptyState: "p-6 text-center text-sm font-bold text-zinc-400",
};

export const navbarStyles = {
  header:
    "sticky top-0 z-30 border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-8",

  container:
    "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3",

  logoLink: "group flex min-w-0 items-center gap-3",

  logoIconWrapper:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950 shadow-[0_12px_24px_rgba(24,24,27,0.18)]",

  logoIcon: "h-6 w-6 text-white",

  logoTextWrapper: "min-w-0 text-left",

  logoText:
    "block truncate text-lg font-black tracking-normal text-zinc-950 sm:text-xl",

  logoSubtext:
    "hidden text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 sm:block",

  desktopNav: "hidden flex-wrap gap-2 xl:flex",

  getDesktopNavLinkClass: (isActive) => {
    const base =
      "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5";
    const active = "border-zinc-950 bg-zinc-950 text-white shadow-lg shadow-zinc-300";
    const inactive = "border-zinc-200 bg-white text-zinc-700";
    return `${base} ${isActive ? active : inactive}`;
  },

  actionWrapper: "flex shrink-0 items-center gap-2",

  logoutDesktop:
    "hidden items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 sm:inline-flex",

  menuToggle:
    "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-zinc-950 xl:hidden",

  mobileNavBase:
    "w-full gap-2 border-t border-zinc-200 pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:hidden",

  mobileNavOpen: "grid",
  mobileNavClosed: "hidden",

  getMobileNavLinkClass: (isActive) => {
    const base =
      "inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold transition";
    const active = "border-zinc-950 bg-zinc-950 text-white shadow-lg shadow-zinc-300";
    const inactive = "border-zinc-200 bg-white text-zinc-700";
    return `${base} ${isActive ? active : inactive}`;
  },

  logoutMobile:
    "inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-bold text-white sm:hidden",
};

export const loginPageStyles = {
  mainContainer:
    "grid min-h-dvh place-items-center bg-zinc-50 px-3 py-4 text-zinc-950 sm:px-6 sm:py-8 lg:px-8",

  section:
    "grid w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/80 sm:rounded-3xl lg:max-w-5xl lg:grid-cols-[1fr_430px]",

  leftPanel:
    "hidden bg-zinc-950 p-10 text-white lg:block",

  leftPanelIcon:
    "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-950",

  leftPanelLabel:
    "text-sm font-bold uppercase tracking-[0.18em] text-zinc-400",

  leftPanelTitle:
    "mt-3 max-w-md text-4xl font-black leading-tight",

  leftPanelFeatures:
    "mt-10 grid gap-3 text-sm font-bold text-zinc-300",

  featureItem:
    "rounded-2xl border border-white/10 bg-white/5 p-4",

  form:
    "min-w-0 p-5 sm:p-8",

  formIcon:
    "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-200 sm:mb-6 sm:h-13 sm:w-13",

  formLabel:
    "text-sm font-bold uppercase tracking-[0.16em] text-zinc-500",

  formTitle:
    "mt-2 text-2xl font-black sm:text-3xl",

  errorBox:
    "mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700",

  inputLabel:
    "mt-6 block",

  inputLabelText:
    "mb-2 block text-sm font-black text-zinc-700",

  inputWrapper:
    "flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 transition focus-within:border-zinc-950 focus-within:bg-white focus-within:ring-4 focus-within:ring-zinc-200 sm:h-13 sm:px-4",

  inputIcon:
    "h-5 w-5 text-zinc-400",

  inputField:
    "h-full min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-zinc-400",

  passwordToggle:
    "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-zinc-500 transition hover:bg-white hover:text-zinc-950",

  submitButton:
    "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-sm font-black text-white shadow-lg shadow-zinc-200 transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:opacity-50 sm:h-13",

  spinner:
    "animate-spin -ml-1 mr-2 h-4 w-4 text-current inline-block",

  spinnerCircle:
    "opacity-25",

  spinnerPath:
    "opacity-75",
};


export const signupPageStyles = {
  mainContainer:
    "grid min-h-dvh place-items-center bg-zinc-50 px-3 py-4 text-zinc-950 sm:px-6 sm:py-8 lg:px-8",

  section:
    "grid w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/80 sm:rounded-3xl lg:max-w-5xl lg:grid-cols-[1fr_430px]",

  leftPanel:
    "hidden bg-zinc-950 p-10 text-white lg:block",

  leftPanelIcon:
    "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-950",

  leftPanelLabel:
    "text-sm font-bold uppercase tracking-[0.18em] text-zinc-400",

  leftPanelTitle:
    "mt-3 max-w-md text-4xl font-black leading-tight",

  leftPanelFeatures:
    "mt-10 grid gap-3 text-sm font-bold text-zinc-300",

  featureItem:
    "rounded-2xl border border-white/10 bg-white/5 p-4",

  form:
    "min-w-0 p-5 sm:p-8",

  formIcon:
    "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-200 sm:mb-6 sm:h-13 sm:w-13",

  formLabel:
    "text-sm font-bold uppercase tracking-[0.16em] text-zinc-500",

  formTitle:
    "mt-2 text-2xl font-black sm:text-3xl",

  errorBox:
    "mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700",

  inputLabelName:
    "mt-6 block",

  inputLabelEmail:
    "mt-4 block",

  inputLabelPassword:
    "mt-4 block",

  inputLabelText:
    "mb-2 block text-sm font-black text-zinc-700",

  inputWrapper:
    "flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 transition focus-within:border-zinc-950 focus-within:bg-white focus-within:ring-4 focus-within:ring-zinc-200 sm:h-13 sm:px-4",

  inputIcon:
    "h-5 w-5 text-zinc-400",

  inputField:
    "h-full min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-zinc-400",

  passwordToggle:
    "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-zinc-500 transition hover:bg-white hover:text-zinc-950",

  submitButton:
    "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-sm font-black text-white shadow-lg shadow-zinc-200 transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:opacity-50 sm:h-13",

  spinner:
    "animate-spin -ml-1 mr-2 h-4 w-4 text-current inline-block",

  spinnerCircle:
    "opacity-25",

  spinnerPath:
    "opacity-75",

  signupFooter:
    "mt-6 text-center text-xs font-bold text-zinc-500",

  signupLink:
    "text-zinc-950 underline transition hover:text-zinc-800",
};

export const verifyOtpPageStyles = {
  mainContainer:
    "grid min-h-dvh place-items-center bg-zinc-50 px-3 py-4 text-zinc-950 sm:px-6 sm:py-8 lg:px-8",

  section:
    "grid w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/80 sm:rounded-3xl lg:max-w-5xl lg:grid-cols-[1fr_430px]",

  leftPanel:
    "hidden bg-zinc-950 p-10 text-white lg:block",

  leftPanelIcon:
    "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-950",

  leftPanelLabel:
    "text-sm font-bold uppercase tracking-[0.18em] text-zinc-400",

  leftPanelTitle:
    "mt-3 max-w-md text-4xl font-black leading-tight",

  leftPanelFeatures:
    "mt-10 grid gap-3 text-sm font-bold text-zinc-300",

  featureItem:
    "rounded-2xl border border-white/10 bg-white/5 p-4",

  form:
    "min-w-0 p-5 sm:p-8",

  formIcon:
    "mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-lg shadow-zinc-200 sm:mb-6 sm:h-13 sm:w-13",

  formLabel:
    "text-sm font-bold uppercase tracking-[0.16em] text-zinc-500",

  formTitle:
    "mt-2 text-2xl font-black sm:text-3xl",

  errorBox:
    "mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700",

  successBox:
    "mt-5 rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-800",

  inputLabelEmail:
    "mt-6 block",

  inputLabelOtp:
    "mt-4 block",

  inputLabelText:
    "mb-2 block text-sm font-black text-zinc-700",

  inputWrapper:
    "flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 transition focus-within:border-zinc-950 focus-within:bg-white focus-within:ring-4 focus-within:ring-zinc-200 sm:h-13 sm:px-4",

  inputIcon:
    "h-5 w-5 text-zinc-400",

  inputField:
    "h-full min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-zinc-400",

  resendContainer:
    "mt-2 text-right",

  resendButton:
    "inline-flex items-center gap-1.5 text-xs font-black text-zinc-700 hover:text-zinc-950 underline transition disabled:no-underline disabled:text-zinc-400",

  resendSpinner:
    "animate-spin h-3.5 w-3.5 text-current inline-block",

  submitButton:
    "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-sm font-black text-white shadow-lg shadow-zinc-200 transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:opacity-50 sm:h-13",

  submitSpinner:
    "animate-spin -ml-1 mr-2 h-4 w-4 text-current inline-block",

  spinnerCircle:
    "opacity-25",

  spinnerPath:
    "opacity-75",

  footer:
    "mt-6 text-center text-xs font-bold text-zinc-500",

  footerLink:
    "text-zinc-950 underline transition hover:text-zinc-800",
};

export const homePageStyles = {
  main: "min-h-screen bg-zinc-50 px-4 py-6 text-zinc-950 sm:px-8",
  container: "mx-auto max-w-7xl",
  heading: "mb-6 text-3xl font-black",
};