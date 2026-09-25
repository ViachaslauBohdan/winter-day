import { describe, expect, it } from "vitest";
import type { ChecklistItemId } from "../types/checklist";
import {
  buildHistory,
  completionRatio,
  countCompletedInRange,
  todayCompleted,
  toggleCompleted,
} from "./checklist";

const yesterday: Record<string, ChecklistItemId[]> = {
  "2026-09-24": ["daylight", "fresh-air", "water", "warmth"],
};

describe("checklist completion", () => {
  it("checks an activity and unchecks it again", () => {
    const checked = toggleCompleted([], "daylight");
    expect(checked).toEqual(["daylight"]);
    expect(toggleCompleted(checked, "daylight")).toEqual([]);
  });

  it("reports progress as a count and a percentage", () => {
    expect(completionRatio(4, 6)).toBe(67);
    expect(completionRatio(6, 6)).toBe(100);
    expect(completionRatio(0, 0)).toBe(0);
  });
});

describe("daily reset and weekly statistics", () => {
  it("starts a new calendar day empty and keeps the previous day", () => {
    expect(todayCompleted(yesterday, "2026-09-25")).toEqual([]);
    expect(yesterday["2026-09-24"]).toHaveLength(4);
  });

  it("counts only the last seven calendar days, including zeros", () => {
    const days: Record<string, ChecklistItemId[]> = {
      ...yesterday,
      "2026-09-20": ["movement", "people"],
      "2026-08-01": ["daylight", "water", "warmth", "movement", "people", "fresh-air"],
    };
    expect(countCompletedInRange(days, "2026-09-25")).toBe(6);
    expect(buildHistory(days).map((entry) => entry.date)).toEqual([
      "2026-09-24",
      "2026-09-20",
      "2026-08-01",
    ]);
  });
});
