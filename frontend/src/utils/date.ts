// utils/dateUtils.ts

function isValidDateString(dateStr: string): boolean {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateStr.match(regex);
  if (!match) return false;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);

  const date = new Date(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function validateOrDefaultDateStrings(
  startDateStr: string,
  endDateStr: string
): { startDate: string; endDate: string } {
  const validStart = isValidDateString(startDateStr);
  const validEnd = isValidDateString(endDateStr);

  if (validStart && validEnd) {
    return { startDate: startDateStr, endDate: endDateStr };
  }

  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: formatDate(firstDay),
    endDate: formatDate(lastDay),
  };
}

export function parseDateStringsToObjects(
  startDateStr: string,
  endDateStr: string
): { startDate: Date; endDate: Date } {
  const [sd, sm, sy] = startDateStr.split("/").map(Number);
  const [ed, em, ey] = endDateStr.split("/").map(Number);

  const startDate = new Date(sy, sm - 1, sd);
  const endDate = new Date(ey, em - 1, ed);

  return { startDate, endDate };
}

export function getToday(): string {
  const today = new Date();
  return formatDate(today);
}

export function getCurrentWeek(): { startDate: string; endDate: string } {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)

  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    startDate: formatDate(monday),
    endDate: formatDate(sunday),
  };
}

export function getCurrentMonth(): { startDate: string; endDate: string } {
  const now = new Date();

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: formatDate(firstDay),
    endDate: formatDate(lastDay),
  };
}

function getStartOfWeek(date: Date): Date {
  const dayOfWeek = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getEndOfWeek(date: Date): Date {
  const end = getStartOfWeek(date);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function isToday(startDate: Date, endDate: Date) {
  return startDate?.toDateString() === endDate?.toDateString();
}

export function isWeek(startDate: Date, endDate: Date) {
  return (
    startDate?.toDateString() === getStartOfWeek(new Date()).toDateString() &&
    endDate?.toDateString() === getEndOfWeek(new Date()).toDateString()
  );
}

export function isMonth(startDate: Date, endDate: Date) {
  return (
    startDate?.toDateString() === getStartOfMonth(new Date()).toDateString() &&
    endDate?.toDateString() === getEndOfMonth(new Date()).toDateString()
  );
}

export function getTomorrow(): Date {
  const now = new Date();
  const tomorrow = new Date(now); // clone the date
  tomorrow.setDate(now.getDate() + 1); // add 1 day
  return tomorrow;
}
