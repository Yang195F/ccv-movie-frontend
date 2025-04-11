import { SeatProps } from "../interfaces/seats";

export const generateSeatGrid = (rows: number, cols: number): SeatProps[][] => {
  const seatGrid: SeatProps[][] = [];
  const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  for (let r = 0; r < rows; r++) {
    const row: SeatProps[] = [];
    for (let c = 1; c <= cols; c++) {
      row.push({
        id: `${rowLabels[r]}${c}`,
        row: rowLabels[r],
        number: c,
        status: "available",
      });
    }
    seatGrid.push(row);
  }

  return seatGrid;
};
