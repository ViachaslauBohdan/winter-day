import { ACTIVITIES_PER_DAY } from "../data/checklistItems";
import type { ChecklistItemId } from "../types/checklist";
import { lastNDayKeys } from "./date";

export const HISTORY_LIMIT = 14;
export const SUMMARY_DAYS = 7;

export interface HistoryEntry {
  date: string;
  completed: number;
  total: number;
  percentage: number;
}

export function toggleCompleted(
  ids: readonly ChecklistItemId[],
  id: ChecklistItemId,
): ChecklistItemId[] {
  return ids.includes(id) ? ids.filter((itemId) => itemId !== id) : [...ids, id];
}

export function completionRatio(completed: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((completed / total) * 100);
}

export function todayCompleted(
  days: Record<string, readonly ChecklistItemId[]>,
  todayKey: string,
): ChecklistItemId[] {
  return [...(days[todayKey] ?? [])];
}

export function buildHistory(
  days: Record<string, readonly ChecklistItemId[]>,
  limit = HISTORY_LIMIT,
): HistoryEntry[] {
  return Object.entries(days)
    .map(([date, ids]) => ({
      date,
      completed: ids.length,
      total: ACTIVITIES_PER_DAY,
      percentage: completionRatio(ids.length, ACTIVITIES_PER_DAY),
    }))
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, limit);
}

export function countCompletedInRange(
  days: Record<string, readonly ChecklistItemId[]>,
  todayKey: string,
  dayCount = SUMMARY_DAYS,
): number {
  return lastNDayKeys(todayKey, dayCount).reduce(
    (sum, date) => sum + (days[date]?.length ?? 0),
    0,
  );
}
