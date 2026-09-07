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

