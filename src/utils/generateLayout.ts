import { SeatProps } from "../interfaces/seats";

export const generateSeatGrid = (rows: number, cols: number): SeatProps[][] => {
  const grid: SeatProps[][] = [];

  for (let r = 0; r < rows; r++) {
    const rowLetter = String.fromCharCode(65 + r); // 'A', 'B', 'C', ...
    const row: SeatProps[] = [];

    for (let c = 1; c <= cols; c++) {
      row.push({
        id: `${rowLetter}${c}`,
        row: rowLetter,
        number: c,
        status: "available",
      });
    }

    grid.push(row);
  }

  return grid;
};
