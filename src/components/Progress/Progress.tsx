import { completionRatio } from "../../utils/checklist";
import "./Progress.css";

interface ProgressProps {
  completed: number;
  total: number;
}

export function Progress({ completed, total }: ProgressProps) {
  const percentage = completionRatio(completed, total);

  return (
    <section className="progress" aria-labelledby="progress-label">
      <div className="progress__row">
        <h2 id="progress-label" className="progress__label">
          Today
        </h2>
        <p className="progress__count">
          <span className="progress__count-value">{completed}</span>
          <span className="progress__count-total"> / {total} completed</span>
        </p>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-label={`${completed} of ${total} completed`}
      >
        <span className="progress__fill" style={{ width: `${percentage}%` }} />
      </div>
    </section>
  );
}
