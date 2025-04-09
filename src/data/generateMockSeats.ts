import { Seats, SeatProps } from "../interfaces/seats"; // adjust the path as needed

export function generateMockSeats(
  movieId: number,
  cinema: string,
  date: string,
  time: string,
  sold: number = 0
): Seats {
  const rows = "ABCDEF"; // 6x6 grid
  const seats: SeatProps[] = [];
  let count = 0;

  for (const row of rows) {
    for (let num = 1; num <= 6; num++) {
      const seat: SeatProps = {
        id: `${row}${num}`,
        row,
        number: num,
        status: count < sold ? "sold" : "available", // 👈 type-safe now
      };
      seats.push(seat);
      count++;
    }
  }

  return {
    movieId,
    cinema,
    date,
    time,
    seats,
  };
}
