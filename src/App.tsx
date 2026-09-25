import { Checklist } from "./components/Checklist/Checklist";
import { Header } from "./components/Header/Header";
import { History } from "./components/History/History";
import { Progress } from "./components/Progress/Progress";
import { WeeklySummary } from "./components/WeeklySummary/WeeklySummary";
import { useDailyChecklist } from "./hooks/useDailyChecklist";

export default function App() {
  const checklist = useDailyChecklist();

  return (
    <main className="app">
      <Header todayKey={checklist.todayKey} />
      <Progress completed={checklist.completedCount} total={checklist.total} />
      <Checklist
        completedIds={checklist.completedIds}
        isComplete={checklist.isComplete}
        onToggle={checklist.toggleItem}
      />
      <WeeklySummary completed={checklist.weeklyCompleted} total={checklist.weeklyTotal} />
      <History entries={checklist.history} />
    </main>
  );
}
