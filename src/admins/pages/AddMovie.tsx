import React, { useState } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import MoviePoster from "../../components/PosterUpload";
import MovieForm from "../../components/MovieForm";
import TicketPrices from "../../components/TicketPrice";
import CinemaLocations from "../../components/Location";

const AddMovie = () => {
  const [poster, setPoster] = useState<string | null>(null);
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState("");
  const [movieType, setMovieType] = useState("");
  const [languagesSelected, setLanguagesSelected] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [ticketPriceAdult, setTicketPriceAdult] = useState("0.00");
  const [ticketPriceChild, setTicketPriceChild] = useState("0.00");
  const [ticketPriceOKU, setTicketPriceOKU] = useState("0.00");

  return (
    <div className="add-movie-page">
      <NavbarAdmin />
      <div className="movie-details">
        {/* Movie Poster */}
        <MoviePoster poster={poster} setPoster={setPoster} />

        {/* Movie Form */}
        <MovieForm
          movieName={movieName}
          releaseDate={releaseDate}
          endDate={endDate}
          duration={duration}
          movieType={movieType}
          languagesSelected={languagesSelected}
          setMovieName={setMovieName}
          setReleaseDate={setReleaseDate}
          setEndDate={setEndDate}
          setDuration={setDuration}
          setMovieType={setMovieType}
          setLanguagesSelected={setLanguagesSelected}
        />

        {/* Ticket Prices */}
        <TicketPrices
          ticketPriceAdult={ticketPriceAdult}
          ticketPriceChild={ticketPriceChild}
          ticketPriceOKU={ticketPriceOKU}
          setTicketPriceAdult={setTicketPriceAdult}
          setTicketPriceChild={setTicketPriceChild}
          setTicketPriceOKU={setTicketPriceOKU}
        />

        {/* Cinema Locations */}
        <CinemaLocations
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />

        <div className="buttons">
          <button>Add Movie</button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
