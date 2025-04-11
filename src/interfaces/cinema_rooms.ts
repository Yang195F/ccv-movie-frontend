import { SeatProps } from "./seats";

export interface CinemaRoomProps {
  id: string; // e.g. "indulge1", "imax3"
  name: string; // Optional: display name like "INDULGE 1"
  layoutType: "INDULGE" | "IMAX" | "LUX";
  seatGrid: SeatProps[][];
}
