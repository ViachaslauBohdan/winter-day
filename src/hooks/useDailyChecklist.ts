import { useEffect, useState } from "react";
import { ACTIVITIES_PER_DAY } from "../data/checklistItems";
import type { ChecklistItemId } from "../types/checklist";
import {
  buildHistory,
  countCompletedInRange,
  SUMMARY_DAYS,
  todayCompleted,
  toggleCompleted,
} from "../utils/checklist";
import { getTodayKey } from "../utils/date";
import { loadDays, saveDays } from "../utils/storage";

export function useDailyChecklist() {
  const [todayKey, setTodayKey] = useState(getTodayKey);
  const [days, setDays] = useState<Record<string, ChecklistItemId[]>>(loadDays);

  useEffect(() => {
    saveDays(days);
  }, [days]);

  useEffect(() => {
    const refreshDate = () => {
      const next = getTodayKey();
      setTodayKey((current) => (current === next ? current : next));
    };
    const intervalId = window.setInterval(refreshDate, 30_000);
    document.addEventListener("visibilitychange", refreshDate);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", refreshDate);
    };
  }, []);

  const completedIds = todayCompleted(days, todayKey);

  function toggleItem(id: ChecklistItemId) {
    setDays((current) => ({
      ...current,
      [todayKey]: toggleCompleted(current[todayKey] ?? [], id),
    }));
  }

  return {
    todayKey,
    completedIds,
    completedCount: completedIds.length,
    total: ACTIVITIES_PER_DAY,
    isComplete: completedIds.length === ACTIVITIES_PER_DAY,
    toggleItem,
    history: buildHistory(days),
    weeklyCompleted: countCompletedInRange(days, todayKey),
    weeklyTotal: SUMMARY_DAYS * ACTIVITIES_PER_DAY,
  };
}
