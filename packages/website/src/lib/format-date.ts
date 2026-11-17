/** Formats a date the way the site shows it, e.g. "November 12, 2026". */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
