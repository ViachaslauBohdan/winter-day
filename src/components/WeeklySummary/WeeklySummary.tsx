import "./WeeklySummary.css";

interface WeeklySummaryProps {
  completed: number;
  total: number;
}

export function WeeklySummary({ completed, total }: WeeklySummaryProps) {
  return (
    <section className="summary" aria-label="Last 7 days">
      <p className="summary__text">
        Last 7 days: <strong>{completed} / {total}</strong> activities completed
      </p>
    </section>
  );
}
