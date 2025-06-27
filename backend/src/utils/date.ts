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
