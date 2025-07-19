export function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Function to transform dd/MM/yyyy to MM/dd/yyyy
export function transformDateToUsLocale(date: string): string {
  const [day, month, year] = date.split("/");
  return `${month}/${day}/${year}`;
}

/**
 * Checks if a given date is within the last 32 days from the current date.
 *
 * @param date - The date to check. Can be a Date object, a timestamp (in milliseconds), or a date string.
 * @returns - True if the date is within the last 32 days, false otherwise.
 */
export function isWithinLast32Days(date: Date | number | string): boolean {
  // 1. Get the current date and time
  const now = new Date();

  // 2. Calculate the date 32 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 32);

  // 3. Convert the input date to a Date object
  const inputDate = new Date(date);

  // 4. Compare the input date with the date 32 days ago
  return inputDate >= thirtyDaysAgo && inputDate <= now;
}
