// ======= Seat Interface =======
export interface SeatProps {
  id: string; // e.g. "A1"
  row: string; // e.g. "A"
  number: number; // e.g. 1
  status: "available" | "sold"; // optionally "selected" at runtime
}

// ======= Show-specific Seat Map =======
export interface Seats {
  movieId: number;
  cinema: string;
  date: string; // e.g. "2025-04-09"
  time: string; // e.g. "13:00"
  seats: SeatProps[]; // flat list of seats (you can shape this into a grid at runtime)
}
