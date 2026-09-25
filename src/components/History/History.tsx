import type { HistoryEntry } from "../../utils/checklist";
import { formatDisplayDate } from "../../utils/date";
import "./History.css";

interface HistoryProps {
  entries: HistoryEntry[];
}

export function History({ entries }: HistoryProps) {
  return (
    <section className="history" aria-labelledby="history-heading">
      <h2 id="history-heading" className="history__title">
        History
      </h2>
      {entries.length === 0 ? (
        <p className="history__empty">Checked days will appear here.</p>
      ) : (
        <ul className="history__list">
          {entries.map((entry) => (
            <li key={entry.date} className="history__row">
              <time dateTime={entry.date}>{formatDisplayDate(entry.date)}</time>
              <span className="history__score">
                {entry.completed}/{entry.total}
                <span className="history__percent">{entry.percentage}%</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
