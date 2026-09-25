import { CHECKLIST_ITEM_IDS, type ChecklistItemId, type StoredChecklist } from "../types/checklist";
import { parseDateKey } from "./date";

const STORAGE_KEY = "winter-day.v1";

const VALID_IDS = new Set<string>(CHECKLIST_ITEM_IDS);

function isItemId(value: unknown): value is ChecklistItemId {
  return typeof value === "string" && VALID_IDS.has(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function sanitizeDays(value: unknown): Record<string, ChecklistItemId[]> {
  if (!isRecord(value) || !isRecord(value.days)) return {};

  const days: Record<string, ChecklistItemId[]> = {};
  for (const [date, ids] of Object.entries(value.days)) {
    if (!parseDateKey(date) || !Array.isArray(ids)) continue;
    const unique = ids.filter(isItemId).filter((id, index, list) => list.indexOf(id) === index);
    days[date] = unique;
  }
  return days;
}

export function loadDays(): Record<string, ChecklistItemId[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return sanitizeDays(JSON.parse(raw));
  } catch {
    // Invalid JSON or unavailable storage. Start from an empty checklist.
    return {};
  }
}

export function saveDays(days: Record<string, ChecklistItemId[]>): void {
  try {
    const payload: StoredChecklist = { days: sanitizeDays({ days }) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage can be unavailable or full. Keep the in-memory day usable.
  }
}
