import { CHECKLIST_ITEMS } from "../../data/checklistItems";
import type { ChecklistItemId } from "../../types/checklist";
import { ChecklistItem } from "../ChecklistItem/ChecklistItem";
import "./Checklist.css";

interface ChecklistProps {
  completedIds: ChecklistItemId[];
  isComplete: boolean;
  onToggle: (id: ChecklistItemId) => void;
}

export function Checklist({ completedIds, isComplete, onToggle }: ChecklistProps) {
  const completed = new Set(completedIds);

  return (
    <section className="checklist" aria-labelledby="checklist-heading">
      <h2 id="checklist-heading" className="visually-hidden">
        Today’s activities
      </h2>
      <ul className="checklist__list">
        {CHECKLIST_ITEMS.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            completed={completed.has(item.id)}
            onToggle={onToggle}
          />
        ))}
      </ul>
      {isComplete ? (
        <div className="checklist__done" role="status">
          <p className="checklist__done-title">☀️ You did it!</p>
          <p className="checklist__done-copy">
            You gave yourself more light, air, warmth, movement and connection today.
          </p>
        </div>
      ) : null}
    </section>
  );
}
