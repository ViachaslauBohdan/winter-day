import { formatLongDate } from "../../utils/date";
import "./Header.css";

interface HeaderProps {
  todayKey: string;
}

export function Header({ todayKey }: HeaderProps) {
  return (
    <header className="header">
      <p className="header__kicker">Daily winter routine</p>
      <h1 className="header__title">☀️ Winter Day</h1>
      <p className="header__subtitle">Small things that can make winter days feel better.</p>
      <p className="header__date">
        <time dateTime={todayKey}>{formatLongDate(todayKey)}</time>
      </p>
    </header>
  );
}
