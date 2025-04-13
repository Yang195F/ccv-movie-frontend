// components/DateTabBar.tsx
import React, { useMemo } from "react";
import "../users/styles/date_tab.css"; // adjust path if needed
import { mockMovies } from "../data/mockData";

interface DateTabBarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  filterPastDates?: boolean; // optional toggle
}

const DateTabBar: React.FC<DateTabBarProps> = ({
  selectedDate,
  onDateSelect,
  filterPastDates = true,
}) => {
  const todayISO = new Date().toISOString().split("T")[0];

  const availableDates = useMemo(() => {
    const rawDates = mockMovies.flatMap(
      (movie) =>
        movie.screenings?.flatMap(
          (screening) =>
            screening.sessions?.map((session) => session.date) || []
        ) || []
    );

    const uniqueDates = Array.from(new Set(rawDates));

    const sortedDates = uniqueDates
      .filter((d) => !filterPastDates || new Date(d) >= new Date(todayISO))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    return sortedDates;
  }, [filterPastDates]);

  return (
    <div className="date-tab-bar">
      {availableDates.map((date) => {
        const label = new Date(date).toLocaleDateString("en", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });

        return (
          <div
            key={date}
            className={`date-tab ${selectedDate === date ? "active" : ""}`}
            onClick={() => onDateSelect(date)}
          >
            <span className="date-text">{label.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DateTabBar;
