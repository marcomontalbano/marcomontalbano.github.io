/**
 * Formats a date the way the site shows it, e.g. "November 12, 2026".
 * In Italian time, where posts are written, rather than the build server's UTC, which would show the previous day
 * for anything published just after midnight.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Rome' });
}
