import React from "react";

interface ScreenHeaderProps {
  movieTitle: string;
  cinema: string;
  date: string;
  time: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  movieTitle,
  cinema,
  date,
  time,
}) => {
  return (
    <div className="screen-header">
      <h2>{movieTitle}</h2>
      <p>
        {cinema} | {date} {time}
      </p>
      <div className="screen-line"></div>
    </div>
  );
};

export default ScreenHeader;
