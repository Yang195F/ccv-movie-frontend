// roomTemplates.ts
import { SeatProps } from "../interfaces/seats";
import { generateSeatGrid } from "../utils/generateLayout";

export const RoomTemplates: Record<
  "INDULGE" | "IMAX" | "LUX",
  { layoutType: string; generate: () => SeatProps[][] }
> = {
  INDULGE: {
    layoutType: "INDULGE",
    generate: () => generateSeatGrid(5, 10), // 5 rows, 10 seats
  },
  IMAX: {
    layoutType: "IMAX",
    generate: () => generateSeatGrid(6, 12), // 6x12 layout
  },
  LUX: {
    layoutType: "LUX",
    generate: () => generateSeatGrid(4, 8), // 4x8 layout
  },
};
