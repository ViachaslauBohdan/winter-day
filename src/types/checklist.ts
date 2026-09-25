export const CHECKLIST_ITEM_IDS = [
  "daylight",
  "fresh-air",
  "water",
  "warmth",
  "movement",
  "people",
] as const;

export type ChecklistItemId = (typeof CHECKLIST_ITEM_IDS)[number];

export interface ChecklistItemDefinition {
  id: ChecklistItemId;
  emoji: string;
  title: string;
  description: string;
}

export interface StoredChecklist {
  days: Record<string, ChecklistItemId[]>;
}
