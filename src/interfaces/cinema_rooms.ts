import { SeatProps } from "./seats";

//======= Cinema Room Definition (REUSABLE) =======
export interface CinemaRoomProps {
  id: string; // unique ID per room, e.g. "room1"
  layoutType: string; // e.g. "6x6", "VIP_5x5" (used for reusable templates)
  seatGrid?: SeatProps[][]; // optional: static grid layout if fixed
}
