import React from "react";

interface MovieFormProps {
  movieName: string;
  releaseDate: string;
  endDate: string;
  duration: string;
  movieType: string;
  languagesSelected: string[];
  setMovieName: React.Dispatch<React.SetStateAction<string>>;
  setReleaseDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setMovieType: React.Dispatch<React.SetStateAction<string>>;
  setLanguagesSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const MovieForm: React.FC<MovieFormProps> = ({
  movieName,
  releaseDate,
  endDate,
  duration,
  movieType,
  languagesSelected,
  setMovieName,
  setReleaseDate,
  setEndDate,
  setDuration,
  setMovieType,
  setLanguagesSelected,
}) => {
  const durations = [
    { label: "30 minutes", value: "30min" },
    { label: "1 hour", value: "1h" },
    { label: "1 hour 30 minutes", value: "1h30min" },
    { label: "2 hours", value: "2h" },
    { label: "2 hours 30 minutes", value: "2h30min" },
    { label: "3 hours", value: "3h" },
  ];

  const languages = ["English", "Chinese", "Japanese", "Malay"];

  const toggleLanguage = (language: string) => {
    setLanguagesSelected((prev) =>
      prev.includes(language) ? prev.filter((lang) => lang !== language) : [...prev, language]
    );
  };

  return (
    <div className="movie-form">
      <label>Movie Name :</label>
      <input type="text" value={movieName} onChange={(e) => setMovieName(e.target.value)} />

      <label>Release Date :</label>
      <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />

      <label>End Date :</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <label htmlFor="durations">Durations:</label>
      <select id="durations" name="durations" value={duration} onChange={(e) => setDuration(e.target.value)}>
        {durations.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>

      <label>Movie Type :</label>
      <select value={movieType} onChange={(e) => setMovieType(e.target.value)}>
        <option value="">Select a movie type</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
      </select>

      <label>Select Language :</label>
      <div className="languages">
        {languages.map((language) => (
          <button
            key={language}
            className={languagesSelected.includes(language) ? "selected" : ""}
            onClick={() => toggleLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieForm;
