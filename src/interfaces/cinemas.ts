import { CinemaRoomProps } from "./cinema_rooms";

// src/interfaces/CinemaProps.ts
export interface CinemaProps {
  id: string;
  name: string;
  cinemaRooms: CinemaRoomProps[]; // Array of cinema rooms
}
