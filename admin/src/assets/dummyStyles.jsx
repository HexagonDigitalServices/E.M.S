export const announcementPageStyles = {
  // Main container
  mainContainer:
    "min-h-screen bg-zinc-50 px-4 py-6 text-zinc-950 font-['Segoe_UI',Inter,Arial,sans-serif] sm:px-6 lg:px-8",

  // Delete modal
  deleteModal:
    "fixed right-4 top-24 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-950 shadow-[0_16px_34px_rgba(24,24,27,0.14)]",
  deleteModalInner: "flex items-start gap-3",
  deleteModalIcon:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-white",
  deleteModalIconSvg: "h-4 w-4",
  deleteModalContent: "min-w-0 flex-1",
  deleteModalTitle: "font-black",
  deleteModalSubtitle: "mt-1 line-clamp-2 font-medium text-zinc-500",
  deleteModalActions: "mt-3 flex gap-2",
  deleteConfirmButton:
    "rounded-lg bg-zinc-950 px-3 py-2 text-xs font-black text-white transition hover:bg-zinc-800",
  deleteCancelButton:
    "rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-black text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950",
  deleteCloseButton:
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950",
  deleteCloseIcon: "h-4 w-4",

  // Toast
  toast:
    "fixed right-4 top-24 z-50 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-950 shadow-[0_16px_34px_rgba(24,24,27,0.14)]",
  toastIcon: "mr-2 inline h-4 w-4",

  // Section
  section: "mx-auto max-w-7xl",

  // Header
  header:
    "mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
  headerLabel: "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  headerTitle:
    "mt-1 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl",
  headerBadge:
    "inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-bold text-zinc-600 shadow-sm",
  headerBadgeIcon: "h-4 w-4 text-zinc-950",

  // Grid
  grid: "grid gap-5 lg:grid-cols-[0.9fr_1.1fr]",

  // Form
  form:
    "rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_16px_38px_rgba(24,24,27,0.07)]",
  formHeader: "mb-5 flex items-center justify-between gap-3",
  formTitle: "text-lg font-black text-zinc-950",
  formSubtitle: "mt-1 text-sm font-medium text-zinc-500",
  formIcon:
    "flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-950 text-white",
  formIconSvg: "h-5 w-5",
  formFields: "grid gap-4",

  // Form fields
  fieldLabel: "grid gap-2",
  fieldText: "text-sm font-bold text-zinc-600",
  fieldInput:
    "h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-950",
  fieldTextarea:
    "min-h-32 resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium leading-6 text-zinc-950 outline-none transition focus:border-zinc-950",

  // Date grid
  dateGrid: "grid grid-cols-2 gap-4",

  // Inline style for date inputs
  dateInputStyle: { colorScheme: "light" },

  // Target toggle
  targetGroup: "grid gap-3",
  targetToggle:
    "grid grid-cols-2 gap-2 rounded-xl border border-zinc-200 bg-zinc-100 p-1",
  targetButtonBase:
    "inline-flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-black transition",
  targetButtonActive: "bg-zinc-950 text-white shadow-sm",
  targetButtonInactive: "text-zinc-600 hover:bg-white",
  targetIcon: "h-4 w-4",

  // Employee section
  employeeSection:
    "rounded-2xl border border-zinc-200 bg-zinc-50 p-4",
  employeeHeader: "mb-3 flex items-center justify-between gap-3",
  employeeTitle: "text-sm font-black text-zinc-950",
  employeeSubtitle: "mt-1 text-xs font-bold text-zinc-500",
  employeeIcon:
    "flex h-9 w-9 items-center justify-center rounded-lg bg-white text-zinc-950 shadow-sm",
  employeeIconSvg: "h-4 w-4",
  employeeFields: "grid gap-3",
  employeeIdLabel: "text-xs font-black uppercase text-zinc-500",
  employeeIdInput:
    "h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-950",
  employeeMatch:
    "mt-3 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-600",
  employeeMatchTitle: "font-black text-zinc-950 text-[13px] mb-1",

  // Submit button
  submitButton:
    "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-black text-white shadow-[0_12px_24px_rgba(24,24,27,0.18)] transition hover:bg-zinc-800 disabled:opacity-50",
  submitSpinner:
    "animate-spin h-4 w-4 text-current inline-block",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
  submitIcon: "h-4 w-4",

  // List panel
  listPanel:
    "rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_16px_38px_rgba(24,24,27,0.07)]",
  listHeader:
    "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  listTitle: "text-lg font-black text-zinc-950",
  listSubtitle: "mt-1 text-sm font-medium text-zinc-500",
  listFilters: "flex flex-col gap-2 sm:flex-row",
  listDateInput:
    "h-11 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-950",
  searchWrapper: "relative",
  searchIcon:
    "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400",
  searchInput:
    "h-11 w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 text-sm font-bold outline-none transition focus:border-zinc-950 sm:w-56",
  clearButton:
    "h-11 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-black text-zinc-600 transition hover:border-zinc-950 hover:text-zinc-950",

  // List items
  listItems: "space-y-3",

  listItem:
    "rounded-xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-4 shadow-sm",
  listItemHeader: "flex items-start justify-between gap-3",
  listItemContent: "min-w-0",
  listItemTitle: "text-base font-black text-zinc-950",
  listItemMessage: "mt-2 text-sm font-medium leading-6 text-zinc-600",
  listItemDates:
    "mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-zinc-500",
  listItemDateChip:
    "rounded-md bg-zinc-100 px-1.5 py-0.5 text-zinc-700",
  listItemDelete:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-950 hover:text-zinc-950",
  listItemDeleteIcon: "h-4 w-4",

  // Tags
  listItemTags: "mt-4 flex flex-wrap gap-2 text-xs font-bold",
  tagPrimary: "rounded-full bg-zinc-950 px-3 py-1 text-white",
  tagSecondary:
    "rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-500",

  // Show more/less buttons
  showMoreButton:
    "flex h-11 w-full items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-black text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950",
  showLatestButton:
    "flex h-11 w-full items-center justify-center rounded-xl bg-zinc-950 text-sm font-black text-white transition hover:bg-zinc-800",

  // Empty state
  emptyState:
    "rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-10 text-center",
  emptyIcon: "mx-auto h-8 w-8 text-zinc-400",
  emptyText: "mt-3 text-sm font-black text-zinc-950",
};

export const attendanceDetailsModalStyles = {
  // Modal overlay and container
  modalOverlay:
    "fixed inset-0 z-75 flex items-center justify-center bg-zinc-950/45 px-4 py-6 backdrop-blur-sm",
  modalContainer:
    "max-h-[calc(100vh-3rem)] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-[0_30px_90px_rgba(24,24,27,0.30)]",

  // Modal header
  modalHeader:
    "sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-4",
  modalHeaderLabel:
    "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  modalHeaderTitle: "mt-1 text-xl font-black text-zinc-950",
  modalHeaderSubtitle: "mt-1 text-sm font-bold text-zinc-500",
  modalCloseButton:
    "flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950",
  modalCloseIcon: "h-5 w-5",

  // Modal body
  modalBody: "p-5",

  // Filters
  filtersContainer:
    "flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between",
  filtersInner: "flex flex-wrap items-center gap-4",
  filterGroup: "flex flex-col gap-1",
  filterLabel:
    "text-xs font-black uppercase tracking-wider text-zinc-500",
  filterInput:
    "h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100",
  filterSelect:
    "h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100",
  clearFiltersButton:
    "h-10 self-end rounded-xl border border-zinc-200 bg-white px-4 text-xs font-black text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950",

  // Loading spinner
  loadingContainer: "flex h-64 items-center justify-center",
  spinner: "animate-spin h-8 w-8 text-zinc-950",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",

  // Records grid
  recordsGrid: "mt-5 grid gap-5 lg:grid-cols-2",

  // Attendance records table
  recordsTitle: "mb-3 text-sm font-black text-zinc-950",
  recordsTableWrapper:
    "max-h-96 overflow-y-auto rounded-2xl border border-zinc-200",
  recordsTable: "w-full border-collapse text-left",
  recordsTableHead: "sticky top-0 bg-zinc-950 text-white z-5",
  recordsTableHeader:
    "px-4 py-3 text-xs font-black uppercase tracking-[0.12em]",
  recordsTableBody: "divide-y divide-zinc-200",
  recordsTableRow: "hover:bg-zinc-50 transition",
  recordsTableCellDate: "px-4 py-3 text-sm font-bold text-zinc-600",
  recordsTableCellStatus: "px-4 py-3",
  recordsEmpty:
    "p-8 text-center text-sm font-bold text-zinc-500",

  // Leave requests
  leaveRequestsWrapper: "max-h-96 overflow-y-auto space-y-3 pr-1",
  leaveRequestCard:
    "rounded-2xl border border-zinc-200 p-4 bg-white",
  leaveRequestHeader:
    "flex items-center justify-between gap-3",
  leaveRequestDate: "text-sm font-black text-zinc-950",
  leaveRequestReason:
    "mt-2 text-sm font-bold leading-6 text-zinc-500",
  leaveRequestsEmpty:
    "rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm font-bold text-zinc-500",
};

export const attendanceFiltersStyles = {
  // Main container
  container:
    "mb-4 flex flex-col gap-3 rounded-3xl border border-white/80 bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 xl:flex-row xl:items-center xl:justify-between",

  // Title section
  title: "text-lg font-black text-zinc-950",
  subtitle: "mt-1 text-sm font-medium text-zinc-500",

  // Filters wrapper
  filtersWrapper: "flex flex-col gap-3 lg:flex-row lg:items-center",

  // Shared icon
  icon: "h-4 w-4 shrink-0",

  // Search label (wider on small screens)
  searchLabel:
    "flex h-12 min-w-0 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-bold text-zinc-500 transition focus-within:border-zinc-400 focus-within:bg-white sm:w-72",
  searchInput:
    "min-w-0 flex-1 bg-transparent font-bold text-zinc-950 outline-none placeholder:text-zinc-400",

  // Common filter label
  filterLabel:
    "flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-bold text-zinc-500 transition focus-within:border-zinc-400 focus-within:bg-white",

  // Common filter input (for date picker)
  filterInput:
    "bg-transparent font-bold text-zinc-950 outline-none",

  // Common filter select
  filterSelect:
    "bg-transparent pr-2 font-bold text-zinc-950 outline-none",
};


export const attendancePageStyles = {
  // Main container
  mainContainer:
    "min-h-screen bg-linear-to-b from-white to-zinc-100 px-4 pb-10 pt-6 font-sans text-zinc-950 sm:px-6 lg:px-8",

  // Section wrapper
  section: "mx-auto max-w-9xl",

  // Header card
  headerCard:
    "mb-5 flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_60px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 backdrop-blur xl:flex-row xl:items-end xl:justify-between",

  // Header badge
  headerBadge:
    "inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-zinc-500",

  // Header title
  headerTitle:
    "mt-1 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl",

  // Header description
  headerDescription:
    "mt-2 max-w-2xl text-sm font-medium leading-6 text-zinc-500",
};

export const attendanceSummaryStyles = {
  container: "mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5",

  card:
    "relative overflow-hidden rounded-3xl border border-white/80 bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_56px_rgba(24,24,27,0.12)]",

  cardBar: "absolute inset-x-0 top-0 h-1.5 bg-zinc-950",

  cardLabel: "text-sm font-bold text-zinc-500",

  cardValue: "mt-2 text-3xl font-black text-zinc-950",
};

export const attendanceTableStyles = {
  container:
    "rounded-3xl border border-white/80 bg-white p-4 shadow-[0_22px_60px_rgba(24,24,27,0.09)] ring-1 ring-zinc-950/5",

  tableWrapper:
    "overflow-x-auto rounded-2xl border border-zinc-200 shadow-inner shadow-zinc-950/2",

  table: "min-w-285 w-full border-collapse bg-white text-left",

  tableHead: "bg-zinc-950 text-white",

  tableHeader:
    "px-4 py-4 text-xs font-black uppercase tracking-[0.12em]",

  tableBody: "divide-y divide-zinc-200",

  tableRow: "transition hover:bg-zinc-50",

  cell: "px-4 py-4",

  employeeCell: "flex min-w-64 items-center gap-3",

  employeeImage:
    "h-12 w-12 rounded-2xl object-cover shadow-[0_10px_20px_rgba(24,24,27,0.12)] ring-2 ring-white",

  employeeName: "text-sm font-black text-zinc-950",

  employeeId: "mt-1 text-xs font-bold text-zinc-500",

  departmentName: "text-sm font-black text-zinc-950",

  designation: "mt-1 text-xs font-bold text-zinc-500",

  leaveStatusWrapper: "max-w-64",

  actions: "flex flex-wrap items-center gap-2",

  actionButton:
    "inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-black text-zinc-700 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white",

  actionIcon: "h-4 w-4",

  iconButton:
    "flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white",

  iconButtonSvg: "h-4 w-4",

  emptyState:
    "flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center",

  emptyIcon: "h-10 w-10 text-zinc-400",

  emptyTitle: "mt-3 text-sm font-black text-zinc-950",

  emptySubtitle: "mt-1 text-sm font-medium text-zinc-500",
};

export const leaveFormModalStyles = {
  // Overlay
  overlay:
    "fixed inset-0 z-80 flex items-center justify-center bg-zinc-950/45 px-4 py-6 backdrop-blur-sm",

  // Modal container
  modal:
    "w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_rgba(24,24,27,0.30)]",

  // Header
  header:
    "flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-4",
  headerLabel: "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  headerTitle: "mt-1 text-xl font-black text-zinc-950",

  // Close button
  closeButton:
    "flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950",
  closeIcon: "h-5 w-5",

  // Form
  form: "p-5",

  // Employee card
  employeeCard:
    "mb-5 flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4",
  employeeImage:
    "h-14 w-14 rounded-2xl object-cover ring-1 ring-zinc-200",
  employeeName: "text-lg font-black text-zinc-950",
  employeeDetails: "mt-1 text-sm font-bold text-zinc-500",

  // Fields grid
  fieldsGrid: "grid gap-4 sm:grid-cols-2",

  // Field label
  fieldLabel: "text-sm font-black text-zinc-700",
  fieldLabelFull: "sm:col-span-2",

  // Input helpers (dynamic)
  getInputClass: (hasError) => {
    const base =
      "mt-1 h-11 w-full rounded-xl border bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100";
    const errorClass = "border-rose-300 focus:ring-rose-50";
    const normalClass = "border-zinc-200";
    return `${base} ${hasError ? errorClass : normalClass}`;
  },

  getTextareaClass: (hasError) => {
    const base =
      "mt-1 min-h-28 w-full resize-none rounded-xl border bg-white px-3 py-3 text-sm font-bold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100";
    const errorClass = "border-rose-300 focus:ring-rose-50";
    const normalClass = "border-zinc-200";
    return `${base} ${hasError ? errorClass : normalClass}`;
  },

  // Error text
  errorText: "mt-1 text-xs font-bold text-rose-600",

  // Reason footer
  reasonFooter: "mt-1 flex items-center justify-between gap-3",
  charCount: "ml-auto text-xs font-bold text-zinc-400",

  // Action buttons
  actions:
    "mt-6 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:justify-end",

  cancelButton:
    "h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-black text-zinc-700 transition hover:bg-zinc-100",

  submitButton:
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(245,158,11,0.22)] transition hover:bg-amber-600",

  submitIcon: "h-4 w-4",
};

export const leaveReviewModalStyles = {
  // Overlay
  overlay:
    "fixed inset-0 z-85 flex items-center justify-center bg-zinc-950/45 px-4 py-6 backdrop-blur-sm",

  // Modal container
  modal:
    "w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_90px_rgba(24,24,27,0.30)]",

  // Header
  header:
    "flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-4",
  headerLabel: "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  headerTitle: "mt-1 text-xl font-black text-zinc-950",

  // Close button
  closeButton:
    "flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950",
  closeIcon: "h-5 w-5",

  // Body
  body: "p-5",

  // Employee card
  employeeCard:
    "mb-4 flex items-center gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4",
  employeeImage:
    "h-14 w-14 rounded-2xl object-cover ring-1 ring-zinc-200",
  employeeName: "text-lg font-black text-zinc-950",
  employeeSubtitle: "mt-1 text-sm font-bold text-zinc-500",

  // Info grid
  infoGrid: "grid gap-3 sm:grid-cols-2",

  // Info cards
  infoCard: "rounded-2xl border border-zinc-200 p-4",
  infoLabel: "mb-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500",
  employeeId: "text-sm font-black text-zinc-950",

  // Reason card
  reasonCard:
    "mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4",
  reasonLabel:
    "text-xs font-bold uppercase tracking-[0.14em] text-zinc-500",
  reasonText:
    "mt-2 whitespace-pre-wrap text-sm font-bold leading-6 text-zinc-700",

  // Actions
  actions:
    "mt-6 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:justify-end",

  closeActionButton:
    "h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-black text-zinc-700 transition hover:bg-zinc-100",

  rejectButton:
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 text-sm font-black text-rose-600 transition hover:bg-rose-50",

  approveButton:
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(5,150,105,0.22)] transition hover:bg-emerald-700",

  actionIcon: "h-4 w-4",
};

export const chartsPageStyles = {
  // Section & container
  section: "bg-zinc-50 px-4 pb-8 pt-3 text-zinc-950 sm:px-6 lg:px-8",
  container: "mx-auto max-w-9xl",

  // Skeleton / loading
  skeletonCard:
    "animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_18px_44px_rgba(24,24,27,0.07)]",
  skeletonTitle: "h-6 w-48 rounded bg-zinc-200 mb-6",
  skeletonGrid: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]",
  skeletonChart: "h-72 rounded-2xl bg-zinc-200",
  skeletonSidebar: "space-y-4",
  skeletonSelect: "h-10 rounded-xl bg-zinc-200",
  skeletonStat: "h-24 rounded-2xl bg-zinc-200",

  // Header
  headerWrapper:
    "mb-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between",
  headerLabel:
    "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  headerTitle:
    "mt-1 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl",

  // Filters
  filtersWrapper: "flex flex-wrap items-center gap-3",
  periodButtons:
    "flex flex-wrap rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm",

  getPeriodButtonClass: (isActive) => {
    const base =
      "h-10 rounded-xl px-4 text-sm font-black transition";
    const active =
      "bg-zinc-950 text-white shadow-[0_10px_20px_rgba(24,24,27,0.16)]";
    const inactive =
      "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950";
    return `${base} ${isActive ? active : inactive}`;
  },

  // SelectControl
  selectLabel:
    "relative flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-black text-zinc-700 shadow-sm",
  selectIcon: "h-4 w-4 text-zinc-500",
  selectInput:
    "appearance-none bg-transparent pr-7 font-black text-zinc-950 outline-none",
  selectChevron:
    "pointer-events-none absolute right-3 h-4 w-4 text-zinc-500",

  // Main grid
  mainGrid: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]",

  // Chart card
  chartCard:
    "animated-border-card slow-card-enter rounded-3xl border border-zinc-200 bg-white p-4 shadow-[0_18px_44px_rgba(24,24,27,0.07)]",
  chartHeader:
    "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
  chartTitle: "text-sm font-black text-zinc-950",
  chartSubtitle: "text-sm font-medium text-zinc-500",
  chartBadge:
    "inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-zinc-950 px-3 text-sm font-black text-white",
  badgeIcon: "h-4 w-4",

  // Wave chart
  waveWrapper: "overflow-x-auto pb-2",
  waveContainer:
    "min-w-240 rounded-2xl bg-linear-to-b from-zinc-50 to-white px-4 py-5",
  waveSvg: "h-80 w-full",

  // Bar chart
  barWrapper: "overflow-x-auto pb-2",
  barContainer:
    "flex h-72 min-w-170 items-end gap-3 rounded-2xl bg-linear-to-b from-zinc-50 to-white px-3 pt-6",

  getBarClasses: (metricKey) => {
    const base =
      "chart-bar w-full max-w-12 rounded-t-2xl shadow-[0_12px_24px_rgba(24,24,27,0.16)] transition-all duration-200 group-hover:brightness-90";
    const gradients = {
      employees: "from-zinc-950 via-zinc-700 to-zinc-300",
      salary: "from-zinc-950 via-zinc-700 to-zinc-300",
      announcements: "from-zinc-950 via-zinc-700 to-zinc-300",
    };
    return `${base} bg-linear-to-t ${gradients[metricKey] || gradients.employees}`;
  },

  barLabel:
    "mt-3 h-10 text-center text-xs font-bold text-zinc-500",
  barLabelPrimary: "block text-zinc-700",
  barLabelSecondary: "block text-[11px] text-zinc-400",

  // Aside panel
  asidePanel:
    "animated-border-card slow-card-enter rounded-3xl border border-zinc-200 bg-linear-to-br from-white via-white to-zinc-100 p-4 shadow-[0_18px_44px_rgba(24,24,27,0.07)]",
  asideHeader: "mb-4 flex items-center justify-between",
  asideTitle: "text-sm font-black text-zinc-950",
  asideSubtitle: "text-sm font-medium text-zinc-500",
  asideIcon:
    "flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white",
  asideIconSvg: "h-5 w-5",

  // Metric buttons
  metricButtons: "mb-5 grid md:grid-cols-3 lg:grid-cols-1 gap-2",

    waveGroup: "group cursor-pointer",

  waveDot:
    "transition-all duration-200 group-hover:fill-zinc-950 group-hover:stroke-zinc-950",

  waveTooltipGroup:
    "opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-100 z-30",

  // ---- Bar chart items ----
  barItem:
    "group flex h-full flex-1 flex-col justify-end cursor-pointer",

  barItemInner:
    "flex min-h-0 flex-1 items-end justify-center border-b border-zinc-200 relative",

  barTooltip:
    "absolute left-1/2 -translate-x-1/2 pointer-events-none opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-[-4px] z-20",

  barTooltipInner:
    "whitespace-nowrap rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-center shadow-lg",

  barTooltipLabel:
    "text-[10px] font-bold text-zinc-400",

  barTooltipValue:
    "text-xs font-extrabold text-white mt-0.5",

  getMetricButtonClass: (isActive) => {
    const base =
      "h-11 rounded-xl border px-3 text-left text-sm font-black transition";
    const active =
      "border-zinc-950 bg-zinc-950 text-white";
    const inactive =
      "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950";
    return `${base} ${isActive ? active : inactive}`;
  },



  // Stats
  statsContainer:
    "mt-4 divide-y divide-zinc-200 rounded-2xl bg-white/70 px-3",
  statItem:
    "flex items-center justify-between gap-3 py-3",
  statLabel: "text-xs font-bold text-zinc-500",
  statValue: "text-sm font-black",
  statPeak: "text-sm font-black text-zinc-950",

  getMetricTextClass: (metricKey) => {
    const colors = {
      employees: "text-zinc-950",
      salary: "text-zinc-950",
      announcements: "text-zinc-950",
    };
    return colors[metricKey] || "text-zinc-950";
  },

  // Animation delay helper (inline style)
  getAnimationDelayStyle: (delay) => ({ animationDelay: delay }),
};


export const dashboardPageStyles = {
  // Main container
  main: "bg-zinc-50 px-4 pb-3 pt-6 text-zinc-950 sm:px-6 lg:px-8",

  // Section wrapper
  section: "mx-auto max-w-7xl",

  // Header
  header: "mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
  headerLabel: "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  headerTitle: "mt-1 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl",

  // Stats grid (when not loading)
  statsGrid: "grid gap-4 md:grid-cols-3",

  // Stat card
  statCard:
    "animated-border-card slow-card-enter group overflow-hidden rounded-2xl border border-zinc-200 bg-white p-3 shadow-[0_12px_28px_rgba(24,24,27,0.05)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(24,24,27,0.10)]",
  statCardTop: "mb-4 flex items-center justify-between gap-3",
  statIcon:
    "flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-[0_10px_22px_rgba(24,24,27,0.16)] transition duration-500 group-hover:scale-105",
  statIconSvg: "h-4 w-4",
  statBadge:
    "rounded-full border border-zinc-200 bg-white/90 px-3 py-1 text-xs font-bold text-zinc-500",
  statLabel: "text-sm font-bold text-zinc-500",
  statValue: "mt-1 text-2xl font-black tracking-normal text-zinc-950",
  statHelper: "mt-1 text-xs font-bold leading-5 text-zinc-500",

  // Skeleton loading states
  skeletonGrid: "grid gap-4 md:grid-cols-3",
  skeletonCard:
    "animate-pulse rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_12px_28px_rgba(24,24,27,0.05)]",
  skeletonTop: "mb-4 flex items-center justify-between",
  skeletonIcon: "h-10 w-10 rounded-xl bg-zinc-200",
  skeletonBadge: "h-6 w-16 rounded-full bg-zinc-200",
  skeletonLine: "h-4 w-32 rounded bg-zinc-200",
  skeletonValue: "mt-2 h-8 w-24 rounded bg-zinc-200",
  skeletonHelper: "mt-2 h-3 w-48 rounded bg-zinc-200",

  // Helper for animation delay (inline style)
  getAnimationDelay: (index) => ({ animationDelay: `${index * 120}ms` }),
};

export const employeeDetailsModalStyles = {
  // Overlay
  overlay:
    "fixed inset-0 z-75 flex items-center justify-center bg-zinc-950/45 px-4 py-6 backdrop-blur-sm",

  // Modal container
  container:
    "max-h-[calc(100vh-3rem)] w-full max-w-7xl overflow-y-auto rounded-3xl bg-white shadow-[0_30px_90px_rgba(24,24,27,0.30)]",

  // Header
  header:
    "sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-4",
  headerLabel: "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  headerTitle: "mt-1 text-xl font-black text-zinc-950",

  // Close button
  closeButton:
    "flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950",
  closeIcon: "h-5 w-5",

  // Body
  body: "p-5",

  // Profile card
  profileCard:
    "mb-5 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between",
  profileInner: "flex items-center gap-4",
  profileImage:
    "h-20 w-20 rounded-3xl object-cover shadow-[0_12px_26px_rgba(24,24,27,0.18)] ring-1 ring-zinc-200",
  profileName: "text-2xl font-black text-zinc-950",
  profileId: "mt-1 flex items-center gap-2 text-sm font-bold text-zinc-500",
  profileIdIcon: "h-4 w-4",

  // Action buttons
  actionButtons: "flex gap-2",
  editButton:
    "inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-black text-zinc-700 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white",
  deleteButton:
    "inline-flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-black text-zinc-700 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white",
  actionIcon: "h-4 w-4",

  // Status card wrapper
  statusCardWrapper: "mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
  statusCard: "rounded-2xl border border-zinc-200 p-4",
  statusCardLabel:
    "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500",
  statusCardIcon: "h-4 w-4",

  // Details grid
  detailsGrid: "grid gap-3 sm:grid-cols-2",
  detailCard: "rounded-2xl border border-zinc-200 p-4",
  detailLabel:
    "text-xs font-bold uppercase tracking-[0.14em] text-zinc-500",
  detailValue: "mt-2 text-sm font-black text-zinc-950",

  // Contact grid
  contactGrid: "mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5",
  contactCard: "rounded-2xl border border-zinc-200 p-4",
  contactLabel:
    "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500",
  contactIcon: "h-4 w-4",
  contactValue: "break-all text-sm font-black text-zinc-950",
  salaryPeriod: "mt-1 text-xs font-bold text-zinc-400",

  // Bank grid
  bankGrid: "mt-5 grid gap-3 sm:grid-cols-3",
  bankCard: "rounded-2xl border border-zinc-200 p-4",
  bankLabel:
    "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500",
  bankIcon: "h-4 w-4",
  bankValue: "text-sm font-black text-zinc-950",
};

export const employeeFiltersStyles = {
  container: "flex flex-col gap-3 sm:flex-row",

  searchLabel:
    "flex h-12 min-w-0 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-bold text-zinc-500 transition focus-within:border-zinc-400 focus-within:bg-white sm:w-72",

  icon: "h-4 w-4 shrink-0",

  searchInput:
    "min-w-0 flex-1 bg-transparent font-bold text-zinc-950 outline-none placeholder:text-zinc-400",

  filterLabel:
    "flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-bold text-zinc-500 transition focus-within:border-zinc-400 focus-within:bg-white",

  select: "bg-transparent pr-2 font-bold text-zinc-950 outline-none",
};


export const employeeFormModalStyles = {
  // Overlay
  overlay:
    "fixed inset-0 z-80 flex items-center justify-center bg-zinc-950/45 px-4 py-6 backdrop-blur-sm",

  // Modal container
  container:
    "max-h-[calc(100vh-3rem)] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-[0_30px_90px_rgba(24,24,27,0.30)]",

  // Header
  header:
    "sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-4",
  headerLabel: "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",
  headerTitle: "mt-1 text-xl font-black text-zinc-950",

  // Close button
  closeButton:
    "flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950",
  closeIcon: "h-5 w-5",

  // Form body
  formBody: "p-5",

  // Main grid (image + fields)
  formGrid: "grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)]",

  // Image container (conditional)
  getImageContainerClass: (hasError) => {
    const base =
      "flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl border bg-zinc-100";
    const error = "border-rose-300 ring-4 ring-rose-50";
    const normal = "border-zinc-200";
    return `${base} ${hasError ? error : normal}`;
  },

  previewImage: "h-full w-full object-cover",
  placeholderIcon: "h-12 w-12 text-zinc-400",

  // Upload button
  uploadButton:
    "mt-3 inline-flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-black text-zinc-700 transition hover:bg-zinc-100",
  uploadIcon: "h-4 w-4",
  fileInput: "hidden",

  // Field error
  fieldError: "mt-1 text-xs font-bold text-rose-600",

  // Fields grid (3 columns)
  fieldsGrid: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",

  // Field label
  fieldLabel: "text-sm font-black text-zinc-700",

  // Joining date label (with lock icon)
  joiningDateLabel: "flex items-center gap-2",
  lockIcon: "h-3.5 w-3.5 text-zinc-400",

  // Input class helper (dynamic error)
  getInputClass: (field, formErrors) => {
    const base =
      "mt-1 h-11 w-full rounded-xl border bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100";
    const errorClass = "border-rose-300 focus:border-rose-400 focus:ring-rose-50";
    const normalClass = "border-zinc-200";
    return `${base} ${formErrors[field] ? errorClass : normalClass}`;
  },

  // Select class helper (dynamic error)
  getSelectClass: (field, formErrors) => {
    const base =
      "mt-1 h-11 w-full rounded-xl border bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100";
    const errorClass = "border-rose-300 focus:border-rose-400 focus:ring-rose-50";
    const normalClass = "border-zinc-200";
    return `${base} ${formErrors[field] ? errorClass : normalClass}`;
  },

  // Joining date class (disabled + error)
  getJoiningDateClass: (isEditMode, formErrors) => {
    const base =
      "mt-1 h-11 w-full rounded-xl border bg-white px-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-500 focus:ring-4 focus:ring-zinc-100 placeholder:text-zinc-400";
    const disabledClass =
      "cursor-not-allowed bg-zinc-100 text-zinc-500";
    const errorClass = "border-rose-300 focus:border-rose-400 focus:ring-rose-50";
    const normalClass = "border-zinc-200";
    const stateClass = formErrors.joiningDate ? errorClass : normalClass;
    return `${base} ${stateClass} ${isEditMode ? disabledClass : ""}`;
  },

  // Action buttons
  actions:
    "mt-6 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:justify-end",

  cancelButton:
    "h-11 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-black text-zinc-700 transition hover:bg-zinc-100",

  submitButton:
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(24,24,27,0.18)] transition hover:bg-zinc-800 disabled:opacity-50",

  submitIcon: "h-4 w-4",

  // Spinner
  spinner: "animate-spin h-4 w-4 text-current inline-block",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
};

export const employeePageStyles = {
  // Main container
  main: "min-h-screen bg-linear-to-b from-white to-zinc-100 px-4 pb-10 pt-6 font-sans text-zinc-950 sm:px-6 lg:px-8",

  // Section wrapper
  section: "mx-auto max-w-9xl",

  // Header card
  headerCard:
    "mb-5 flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_60px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 backdrop-blur xl:flex-row xl:items-end xl:justify-between",

  headerBadge:
    "inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-zinc-500",

  headerTitle:
    "mt-1 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl",

  headerDescription:
    "mt-2 max-w-2xl text-sm font-medium leading-6 text-zinc-500",

  // Add button
  addButton:
    "inline-flex h-12 w-fit items-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(24,24,27,0.18)] transition hover:bg-zinc-800",

  addIcon: "h-4 w-4",

  // Summary grid
  summaryGrid:
    "mb-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4",

  // Filter container
  filterContainer:
    "mb-4 flex flex-col gap-3 rounded-3xl border border-white/80 bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 lg:flex-row lg:items-center lg:justify-between",

  filterTitle: "text-lg font-black text-zinc-950",

  filterSubtitle: "mt-1 text-sm font-medium text-zinc-500",
};

export const employeeTableStyles = {
  // Main container
  container:
    "rounded-3xl border border-white/80 bg-white p-4 shadow-[0_22px_60px_rgba(24,24,27,0.09)] ring-1 ring-zinc-950/5",

  // Table wrapper
  tableWrapper:
    "overflow-x-auto rounded-2xl border border-zinc-200 shadow-inner shadow-zinc-950/2",

  // Table
  table: "min-w-230 w-full border-collapse bg-white text-left",

  // Table head
  tableHead: "bg-zinc-950 text-white",

  // Table header cells
  tableHeader:
    "px-4 py-4 text-xs font-black uppercase tracking-[0.12em]",

  // Table body
  tableBody: "divide-y divide-zinc-200",

  // Table row
  tableRow: "transition hover:bg-zinc-50",

  // Regular cell
  cell: "px-4 py-4",

  // Employee column
  employeeCell: "flex min-w-64 items-center gap-3",

  employeeImage:
    "h-12 w-12 rounded-2xl object-cover shadow-[0_10px_20px_rgba(24,24,27,0.16)] ring-2 ring-white",

  employeeName: "text-sm font-black text-zinc-950",

  employeeId: "mt-1 text-xs font-bold text-zinc-500",

  // Department column
  departmentCell: "inline-flex items-center gap-2 text-sm font-bold text-zinc-600",

  departmentIcon: "h-4 w-4 text-zinc-400",

  // Designation cell
  designationCell: "text-sm font-bold text-zinc-600",

  // Salary column
  salaryCell: "min-w-36",

  salaryText: "text-sm font-black text-zinc-950",

  // Actions
  actions: "flex items-center gap-2",

  actionButton:
    "flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white",

  actionIcon: "h-4 w-4",

  // Empty state
  emptyState:
    "flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-10 text-center",

  emptyIcon: "h-10 w-10 text-zinc-400",

  emptyTitle: "mt-3 text-sm font-black text-zinc-950",

  emptySubtitle: "mt-1 text-sm font-medium text-zinc-500",
};

export const employeeToastStyles = {
  // Root container (fixed position, pointer-events-none)
  root: "pointer-events-none fixed right-4 top-24 z-90 w-[calc(100%-2rem)] max-w-sm sm:right-6",

  // Toast inner container
  toastContainer:
    "pointer-events-auto overflow-hidden rounded-2xl border bg-white shadow-[0_18px_48px_rgba(24,24,27,0.16)] transition-all duration-300 ease-out",

  // Open/closed state helper
  getToastStateClass: (open) =>
    open
      ? "translate-x-0 translate-y-0 scale-100 opacity-100"
      : "translate-x-6 -translate-y-2 scale-95 opacity-0",

  // Content wrapper (flex)
  content: "flex items-start gap-3 p-4",

  // Icon wrapper
  iconWrapper:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white",

  // Icon SVG
  iconSvg: "h-5 w-5",

  // Text wrapper
  textWrapper: "min-w-0 flex-1",

  // Title
  title: "text-sm font-black text-zinc-950",

  // Message
  message: "mt-1 text-sm font-medium leading-5 text-zinc-500",

  // Confirm actions wrapper
  confirmActions: "mt-3 flex gap-2",

  // Delete button
  deleteButton:
    "inline-flex items-center gap-1.5 h-9 rounded-xl bg-rose-600 px-3 text-xs font-black text-white transition hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed",

  // Cancel button
  cancelButton:
    "h-9 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-black text-zinc-700 transition hover:bg-zinc-100",

  // Close button
  closeButton:
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-950",

  // Close icon
  closeIcon: "h-4 w-4",

  // Progress bar base
  progressBar: "h-1 transition-all duration-3400 ease-linear",

  // Progress state helper (width)
  getProgressStateClass: (progress) => (progress ? "w-0" : "w-full"),

  // Spinner SVG
  spinner: "animate-spin h-3.5 w-3.5 text-white inline-block",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
};

export const statusPillStyles = {
  getPillClass: (label) => {
    const base = "inline-flex h-8 items-center rounded-full border px-3 text-xs font-black";

    const variants = {
      // Define status-specific styles here – you can copy from your existing statusStyles
      // Example: 
      // "Present": "border-green-200 bg-green-100 text-green-700",
      // "Absent": "border-red-200 bg-red-100 text-red-700",
      // "Leave Applied": "border-yellow-200 bg-yellow-100 text-yellow-700",
      // "Approved": "border-blue-200 bg-blue-100 text-blue-700",
      // "Rejected": "border-gray-200 bg-gray-100 text-gray-600",
    };

    const variant = variants[label] || "border-zinc-200 bg-zinc-100 text-zinc-600";
    return `${base} ${variant}`;
  },
};

export const summaryCardStyles = {
  card:
    "group relative overflow-hidden rounded-3xl border border-white/80 bg-white p-5 shadow-[0_18px_48px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(24,24,27,0.12)]",

  cardBar: "absolute inset-x-0 top-0 h-1.5 bg-zinc-950",

  content: "flex items-center justify-between gap-3",

  label: "text-sm font-bold text-zinc-500",

  value: "mt-2 text-3xl font-black text-zinc-950",

  iconWrapper:
    "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-[0_14px_30px_rgba(24,24,27,0.18)] transition group-hover:scale-105",

  iconSvg: "h-5 w-5",
};


export const leavesPageStyles = {
  // Main container
  mainContainer:
    "min-h-screen bg-linear-to-b from-white to-zinc-100 px-4 pb-10 pt-6 font-sans text-zinc-950 sm:px-6 lg:px-8",

  // Section wrapper
  sectionWrapper: "mx-auto max-w-9xl",

  // Header card
  headerCard:
    "mb-5 flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_60px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 backdrop-blur xl:flex-row xl:items-end xl:justify-between",
  headerBadge:
    "inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-zinc-500",
  headerTitle:
    "mt-1 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl",
  headerDescription:
    "mt-2 max-w-2xl text-sm font-medium leading-6 text-zinc-500",

  // Stats grid
  statsGrid: "mb-6 grid gap-4 md:grid-cols-3",

  // Stat card (shared)
  statCard:
    "animated-border-card slow-card-enter group overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_12px_28px_rgba(24,24,27,0.05)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(24,24,27,0.10)]",
  statCardTop: "mb-4 flex items-center justify-between gap-3",
  statIconSvg: "h-4 w-4",
  statLabel: "text-sm font-bold text-zinc-500",
  statValue: "mt-1 text-3xl font-black tracking-normal text-zinc-950",
  statHelper: "mt-1 text-xs font-bold leading-5 text-zinc-400",

  // Stat icon helpers (tone-based)
  getStatIconClass: (tone) => {
    const base =
      "flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-[0_10px_22px_rgba(0,0,0,0.16)] transition duration-500 group-hover:scale-105";
    const tones = {
      pending: "bg-amber-500 shadow-amber-500/30",
      approved: "bg-emerald-500 shadow-emerald-500/30",
      rejected: "bg-rose-500 shadow-rose-500/30",
    };
    return `${base} ${tones[tone] || tones.pending}`;
  },

  getStatBadgeClass: (tone) => {
    const base =
      "rounded-full border px-3 py-1 text-xs font-bold";
    const tones = {
      pending: "border-amber-200 bg-amber-50 text-amber-700",
      approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
      rejected: "border-rose-200 bg-rose-50 text-rose-700",
    };
    return `${base} ${tones[tone] || tones.pending}`;
  },

  // Filter panel
  filterPanel:
    "mb-4 flex flex-col gap-3 rounded-3xl border border-white/80 bg-white p-4 shadow-[0_18px_48px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 xl:flex-row xl:items-center xl:justify-between",
  filterTitle: "text-lg font-black text-zinc-950",
  filterSubtitle: "mt-1 text-sm font-medium text-zinc-500",
  filterControls: "flex flex-col gap-3 lg:flex-row lg:items-center",

  // Search label (wider on sm)
  searchLabel:
    "flex h-12 min-w-0 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-bold text-zinc-500 transition focus-within:border-zinc-400 focus-within:bg-white sm:w-72",
  searchInput:
    "min-w-0 flex-1 bg-transparent font-bold text-zinc-950 outline-none placeholder:text-zinc-400",

  // Common filter label
  filterLabel:
    "flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-bold text-zinc-500 transition focus-within:border-zinc-400 focus-within:bg-white",
  filterIcon: "h-4 w-4 shrink-0 text-zinc-400",
  filterInput:
    "bg-transparent font-bold text-zinc-950 outline-none",
  filterSelect:
    "bg-transparent pr-2 font-bold text-zinc-950 outline-none",

  // Reset button
  resetButton:
    "flex h-12 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 text-xs font-bold text-zinc-500 hover:text-zinc-950 transition",
  resetIcon: "h-3.5 w-3.5",

  // Table section
  tableSection:
    "rounded-3xl border border-white/80 bg-white p-4 shadow-[0_22px_60px_rgba(24,24,27,0.09)] ring-1 ring-zinc-950/5",
  tableWrapper:
    "overflow-x-auto rounded-2xl border border-zinc-200 shadow-inner shadow-zinc-950/2",
  table: "min-w-285 w-full border-collapse bg-white text-left text-sm",
  tableHead: "bg-zinc-950 text-white",
  tableHeader:
    "px-6 py-4 text-xs font-black uppercase tracking-[0.12em]",
  tableHeaderCenter: "text-center",
  tableHeaderRight: "text-right",
  tableBody: "divide-y divide-zinc-200",
  tableRow: "transition hover:bg-zinc-50",

  // Table cells
  cell: "px-6 py-4",
  employeeName: "text-sm font-black text-zinc-950",
  employeeId: "mt-1 text-xs font-bold text-zinc-500",
  appliedDate: "text-sm font-bold text-zinc-500",
  durationFrom: "text-sm font-black text-zinc-950",
  durationTo: "mt-1 text-xs font-bold text-zinc-500",
  reasonCell:
    "max-w-xs px-6 py-4 truncate text-sm font-medium text-zinc-500",
  statusCell: "text-center",
  actionsCell: "text-right",

  // Loading state
  loadingCell: "py-20 text-center",
  loadingSpinner:
    "mx-auto h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-950",
  loadingText: "mt-3 text-sm font-bold text-zinc-500",

  // Empty state
  emptyCell: "py-20 text-center",
  emptyIcon: "mx-auto h-8 w-8 text-zinc-400",
  emptyTitle: "mt-2 text-sm font-bold text-zinc-950",
  emptySubtitle: "mt-1 text-xs font-bold text-zinc-500",

  // Action buttons (approve/reject)
  actionButtonsWrapper: "flex items-center justify-end gap-2",
  approveButton:
    "flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 transition hover:bg-emerald-600 hover:text-white hover:border-emerald-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
  rejectButton:
    "flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 transition hover:bg-rose-600 hover:text-white hover:border-rose-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
  actionIconSvg: "h-4 w-4",
  actionSpinner: "animate-spin h-4 w-4",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
  decidedText: "text-xs font-bold text-zinc-400 font-sans",
};

export const adminLoginPageStyles = {
  // Main container
  main:
    "relative min-h-dvh overflow-hidden bg-[#f7f8fb] px-3 py-4 text-zinc-950 sm:px-6 sm:py-6 lg:px-8",

  // Gradient background (inline style object)
  gradientBg:
    "pointer-events-none absolute inset-x-0 top-0 h-72",
  gradientStyle: {
    background:
      "radial-gradient(circle at 20% 15%, rgba(20,184,166,0.22), transparent 30%), radial-gradient(circle at 80% 0%, rgba(37,99,235,0.18), transparent 34%)",
  },

  // Section
  section:
    "relative mx-auto grid min-h-[calc(100dvh-2rem)] max-w-md items-center gap-6 sm:min-h-[calc(100dvh-3rem)] lg:max-w-6xl lg:grid-cols-[1fr_440px]",

  // Left panel (hidden on small screens)
  leftPanel: "hidden lg:block",

  leftPanelHeader: "mb-8 flex items-center gap-3",

  leftPanelLogo:
    "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-[0_18px_34px_rgba(24,24,27,0.20)]",

  logoIcon: "h-6 w-6",

  leftPanelTitle: "text-xl font-black",

  leftPanelSubtitle:
    "text-xs font-bold uppercase tracking-[0.18em] text-zinc-500",

  leftPanelHeading:
    "max-w-2xl text-5xl font-black leading-tight tracking-normal text-zinc-950",

  leftPanelDescription:
    "mt-5 max-w-xl text-base font-medium leading-7 text-zinc-600",

  featureGrid: "mt-8 grid max-w-xl gap-3 sm:grid-cols-3",

  featureCard:
    "rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_rgba(24,24,27,0.08)] backdrop-blur",

  featureIcon: "mb-3 h-5 w-5 text-teal-600",

  featureText: "text-sm font-black text-zinc-800",

  // Form
  form:
    "mx-auto w-full min-w-0 max-w-md rounded-3xl border border-white/80 bg-white p-5 shadow-[0_24px_70px_rgba(24,24,27,0.16)] sm:rounded-4xl sm:p-7",

  formHeader:
    "mb-6 flex items-start justify-between gap-3 sm:mb-7 sm:gap-4",

  formHeaderLeft: "min-w-0",

  formHeaderIcon:
    "mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-[0_14px_28px_rgba(24,24,27,0.18)] sm:h-12 sm:w-12",

  formHeaderIconSvg: "h-6 w-6",

  formHeaderLabel:
    "text-sm font-bold uppercase tracking-[0.16em] text-zinc-500",

  formHeaderTitle:
    "mt-2 text-2xl font-black tracking-normal text-zinc-950 sm:text-3xl",

  adminBadge:
    "shrink-0 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-black text-teal-700",

  // Error box
  errorBox:
    "mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700",

  // Input label
  inputLabel: "mb-4 block",

  passwordLabel: "mb-5",

  inputLabelText: "mb-2 block text-sm font-black text-zinc-700",

  inputWrapper:
    "flex h-12 items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 transition focus-within:border-zinc-950 focus-within:bg-white focus-within:ring-4 focus-within:ring-zinc-200 sm:h-13 sm:px-4",

  inputIcon: "h-5 w-5 text-zinc-400",

  inputField:
    "h-full min-w-0 flex-1 bg-transparent text-sm font-bold text-zinc-950 outline-none placeholder:text-zinc-400",

  passwordToggle:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-white hover:text-zinc-950",

  passwordToggleIcon: "h-4 w-4",

  // Submit button
  submitButton:
    "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 text-sm font-black text-white shadow-[0_16px_32px_rgba(24,24,27,0.22)] transition hover:-translate-y-0.5 hover:bg-zinc-800 disabled:opacity-50 sm:h-13",

  submitIcon: "h-4 w-4",

  // Spinner
  spinner: "animate-spin -ml-1 mr-2 h-4 w-4 text-current inline-block",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
};

export const adminNavbarStyles = {
  // Header
  header:
    "sticky top-0 z-50 overflow-hidden border-b border-zinc-200 bg-white/95 shadow-[0_14px_34px_rgba(24,24,27,0.07)] backdrop-blur-xl",
  headerGlow: "pointer-events-none absolute inset-0 opacity-80",
  headerLine: "pointer-events-none absolute inset-x-0 top-0 h-1 bg-zinc-950",

  // Navigation container
  nav: "relative mx-auto flex min-h-20 max-w-9xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",

  // Logo
  logoLink: "group flex min-w-0 items-center gap-3",
  logoIconWrapper:
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950 shadow-[0_12px_24px_rgba(24,24,27,0.18)]",
  logoIcon: "h-6 w-6 text-white",
  logoTextWrapper: "min-w-0",
  logoText:
    "block truncate text-lg font-black tracking-normal text-zinc-950 sm:text-xl",
  logoSubtext:
    "hidden text-xs font-bold uppercase tracking-[0.16em] text-zinc-500 sm:block",

  // Desktop nav
  desktopNavWrapper:
    "hidden items-center justify-center gap-1 rounded-2xl border border-zinc-200 bg-white/90 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_28px_rgba(24,24,27,0.08)] xl:flex",

  getDesktopNavLinkClass: (active) => {
    const base =
      "group flex h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold tracking-normal transition";
    const activeClass =
      "bg-zinc-950 text-white shadow-[0_10px_20px_rgba(24,24,27,0.18)] ring-2 ring-zinc-300";
    const inactiveClass =
      "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950";
    return `${base} ${active ? activeClass : inactiveClass}`;
  },

  getDesktopIconClass: (active) => {
    const base = "h-4 w-4";
    const activeClass = "text-white";
    const inactiveClass =
      "text-zinc-400 group-hover:text-zinc-950";
    return `${base} ${active ? activeClass : inactiveClass}`;
  },

  activeDotDesktop:
    "ml-1 h-2 w-2 rounded-full bg-white shadow-sm",

  // Actions (logout + mobile toggle)
  actionWrapper: "flex shrink-0 items-center gap-2",

  logoutDesktop:
    "hidden h-11 shrink-0 items-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-black tracking-normal text-white shadow-[0_10px_24px_rgba(24,24,27,0.16)] transition hover:bg-zinc-800 sm:flex",

  logoutIcon: "h-4 w-4 text-zinc-200",

  menuToggle:
    "flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-zinc-950 xl:hidden",

  menuIcon: "h-5 w-5",

  // Mobile menu
  getMobileMenuClass: (open) => {
    const base =
      "relative border-t border-zinc-200/70 px-4 pb-4 pt-3 xl:hidden";
    const openClass = "block";
    const closedClass = "hidden";
    return `${base} ${open ? openClass : closedClass}`;
  },

  mobileMenuGrid:
    "mx-auto grid max-w-7xl gap-2 sm:grid-cols-2 lg:grid-cols-3",

  getMobileNavLinkClass: (active) => {
    const base =
      "flex h-11 items-center gap-2 rounded-xl border px-3 text-sm font-bold tracking-normal transition";
    const activeClass =
      "border-zinc-950 bg-zinc-950 text-white shadow-[0_10px_20px_rgba(24,24,27,0.16)]";
    const inactiveClass =
      "border-zinc-200 bg-white/90 text-zinc-600 shadow-sm";
    return `${base} ${active ? activeClass : inactiveClass}`;
  },

  getMobileIconClass: (active) => {
    const base = "h-4 w-4";
    return `${base} ${active ? "text-white" : "text-zinc-950"}`;
  },

  activeDotMobile: "h-1.5 w-1.5 rounded-full bg-white",

  logoutMobile:
    "flex h-11 items-center gap-2 rounded-xl border border-zinc-950 bg-zinc-950 px-3 text-sm font-black tracking-normal text-white shadow-[0_10px_20px_rgba(24,24,27,0.16)] sm:hidden",
};

export const payrollFormStyles = {
  // Main container
  container:
    "rounded-3xl border border-white/80 bg-white p-5 shadow-[0_22px_60px_rgba(24,24,27,0.09)] ring-1 ring-zinc-950/5 md:p-6",

  // Header
  header: "flex items-center justify-between mb-5",
  title: "text-xl font-black text-zinc-950",
  subtitle: "text-sm font-medium text-zinc-500",
  badge:
    "rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-600",

  // Form grid
  grid: "grid grid-cols-1 md:grid-cols-2 gap-4",

  // Common label
  label: "mb-2 block text-sm font-bold text-zinc-600",

  // Common input (text, number, month)
  input:
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-950",

  // Read-only date display
  dateDisplay:
    "rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-black text-zinc-950",

  // Inline style for month input (light color scheme)
  monthInputStyle: { colorScheme: "light" },

  // Salary calculation section
  salarySection:
    "mt-6 rounded-2xl border border-zinc-950 bg-zinc-950 p-5 text-white",
  salaryInner:
    "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
  salaryLabel: "text-sm font-bold text-white/70",
  salaryValue: "mt-2 text-3xl font-black",

  // Button wrapper
  buttonWrapper: "flex flex-wrap gap-3",

  // Generate button
  generateButton:
    "group inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-black text-zinc-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-[0_14px_28px_rgba(255,255,255,0.14)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed",

  // Save icon with hover scale
  saveIcon:
    "mr-2 transition duration-200 group-hover:scale-110",

  // Spinner
  spinner:
    "animate-spin -ml-1 mr-2 h-4 w-4 text-zinc-950 inline-block",
  spinnerCircle: "opacity-25",
  spinnerPath: "opacity-75",
};

export const payrollHeaderStyles = {
  container:
    "mb-6 rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_22px_60px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 backdrop-blur md:flex md:items-end md:justify-between md:gap-4",

  badge:
    "inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-600 shadow-sm",

  title:
    "mt-4 text-3xl font-black tracking-normal text-zinc-950 md:text-4xl",

  description:
    "mt-2 max-w-2xl text-sm font-medium leading-6 text-zinc-500 md:text-base",

  actions:
    "mt-4 flex flex-wrap items-center gap-3 md:mt-0",

  actionButton:
    "group inline-flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-950 hover:text-zinc-950 hover:shadow-[0_12px_26px_rgba(24,24,27,0.10)] active:translate-y-0",

  exportIcon:
    "mr-2 transition duration-200 group-hover:-translate-y-0.5",

  payslipIcon:
    "mr-2 transition duration-200 group-hover:scale-110",
};

export const payrollPageStyles = {
  root:
    "min-h-screen bg-linear-to-b from-white to-zinc-100 p-4 text-zinc-950 font-['Segoe_UI',Inter,Arial,sans-serif] md:p-6 lg:p-8",

  container: "mx-auto max-w-7xl",

  grid: "grid grid-cols-1 gap-6",

  innerGrid: "space-y-6",
};

export const payrollRecordsTableStyles = {
  // Main container
  container:
    "rounded-3xl border border-white/80 bg-white p-5 shadow-[0_22px_60px_rgba(24,24,27,0.09)] ring-1 ring-zinc-950/5 md:p-6",

  // Header
  header: "flex items-center justify-between mb-5",
  title: "text-xl font-black text-zinc-950",
  subtitle: "text-sm font-medium text-zinc-500",

  // Controls container
  controls: "flex flex-col sm:flex-row gap-3",

  // Date input
  dateInput:
    "h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-950",
  dateInputStyle: { colorScheme: "light" },

  // Clear date button
  clearButton:
    "h-12 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-black text-zinc-600 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-950 hover:text-zinc-950 hover:shadow-[0_10px_22px_rgba(24,24,27,0.08)] active:translate-y-0",

  // Search wrapper
  searchWrapper: "relative",
  searchIcon:
    "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400",
  searchInput:
    "w-full rounded-xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-sm font-bold text-zinc-950 outline-none transition focus:border-zinc-950 sm:w-72",

  // Table wrapper
  tableWrapper: "overflow-hidden rounded-2xl border border-zinc-200",
  tableScroll: "overflow-x-auto",
  table: "w-full text-left",

  // Table header
  tableHead: "bg-zinc-950 text-sm text-white",
  tableHeader: "px-4 py-3 font-bold",

  // Table rows
  tableRow: "border-t border-zinc-200 transition hover:bg-zinc-50",

  // Cell styles (separate for clarity)
  cellId: "px-4 py-4 text-sm font-bold text-zinc-500",
  cellName: "px-4 py-4 font-black text-zinc-950",
  cellRole: "px-4 py-4 text-sm font-bold text-zinc-500",
  cellDepartment: "px-4 py-4 text-sm font-bold text-zinc-500",
  cellDate: "px-4 py-4 text-sm font-bold text-zinc-500",
  cellPeriod: "px-4 py-4 text-sm font-bold text-zinc-500",
  cellNetSalary: "px-4 py-4 font-black text-zinc-950",
  cellStatus: "px-4 py-4",
  cellDownload: "px-4 py-4",

  // Status badge
  statusBadge:
    "inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-700",

  // Download button
  downloadButton:
    "group inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-xs font-black text-zinc-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-950 hover:text-zinc-950 hover:shadow-[0_10px_22px_rgba(24,24,27,0.08)] active:translate-y-0",

  downloadIcon:
    "h-4 w-4 transition duration-200 group-hover:-translate-y-0.5",
};

export const payrollSummaryStyles = {
  grid: "mb-6 grid grid-cols-1 gap-4 md:grid-cols-3",

  card:
    "group relative overflow-hidden rounded-3xl border border-white/80 bg-white p-5 shadow-[0_18px_48px_rgba(24,24,27,0.08)] ring-1 ring-zinc-950/5 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(24,24,27,0.12)]",

  cardBar: "absolute inset-x-0 top-0 h-1.5 bg-zinc-950",

  cardContent: "flex items-center justify-between",

  label: "text-sm font-bold text-zinc-500",

  value: "mt-2 text-3xl font-black text-zinc-950",

  iconWrapper:
    "flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-[0_14px_30px_rgba(24,24,27,0.16)]",
};

export const payRollToastStyles = {
  containerBase:
    "fixed top-4 right-4 z-50 transform transition-all duration-300",

  getContainerClass: (open) => {
    const base = "fixed top-4 right-4 z-50 transform transition-all duration-300";
    const openClasses = "translate-x-0 opacity-100 scale-100";
    const closedClasses = "translate-x-6 opacity-0 scale-95 pointer-events-none";
    return `${base} ${open ? openClasses : closedClasses}`;
  },

  inner:
    "w-57.5 rounded-2xl border border-black/10 bg-white shadow-xl px-3 py-2",

  content: "flex items-start gap-2",

  iconWrapper:
    "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white",

  icon: "h-3 w-3",

  textWrapper: "min-w-0",

  title: "text-xs font-semibold text-black",

  message: "text-xs leading-4 text-black/80",
};