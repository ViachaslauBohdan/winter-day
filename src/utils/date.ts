const DATE_KEY = /^(\d{4})-(\d{2})-(\d{2})$/;

export function getTodayKey(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date | null {
  const match = DATE_KEY.exec(key);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function formatDisplayDate(key: string): string {
  const date = parseDateKey(key);
  if (!date) return key;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatLongDate(key: string): string {
  const date = parseDateKey(key);
  if (!date) return key;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function lastNDayKeys(todayKey: string, count: number): string[] {
  const base = parseDateKey(todayKey) ?? new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(base);
    date.setDate(base.getDate() - index);
    return getTodayKey(date);
  });
}
