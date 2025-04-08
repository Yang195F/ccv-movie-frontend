export interface ShowtimeSeats {
  movieId: number;
  cinema: string;
  date: string; // e.g. "2025-04-09"
  time: string; // e.g. "12:30 PM"
  seats: SeatProps[]; // all seat metadata for this showtime
}

interface SeatProps {
  id: string; // e.g. "A1", "B3"
  row: string; // e.g. "A"
  number: number; // e.g. 1
  status: "available" | "sold"; // you can also add "selected" at runtime
}
