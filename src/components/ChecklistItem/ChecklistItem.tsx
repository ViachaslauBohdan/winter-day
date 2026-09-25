import type { ChecklistItemDefinition, ChecklistItemId } from "../../types/checklist";
import "./ChecklistItem.css";

interface ChecklistItemProps {
  item: ChecklistItemDefinition;
  completed: boolean;
  onToggle: (id: ChecklistItemId) => void;
}

export function ChecklistItem({ item, completed, onToggle }: ChecklistItemProps) {
  return (
    <li className={completed ? "item item--done" : "item"}>
      <button
        type="button"
        className="item__button"
        aria-pressed={completed}
        onClick={() => onToggle(item.id)}
      >
        <span className="item__emoji" aria-hidden="true">
          {item.emoji}
        </span>
        <span className="item__copy">
          <span className="item__title">{item.title}</span>
          <span className="item__description">{item.description}</span>
        </span>
        <span className={completed ? "item__check item__check--on" : "item__check"} aria-hidden="true">
          <svg viewBox="0 0 24 24" className="item__check-icon">
            <path d="M5 12.5 9.2 17 19 7" />
          </svg>
        </span>
        <span className="visually-hidden">{completed ? "Completed. Tap to undo." : "Mark complete."}</span>
      </button>
    </li>
  );
}
