import { MovieProps } from "../interfaces/movies";
import { CinemaProps } from "../interfaces/cinemas";
import { ShowtimeSeats } from "../interfaces/showtime_seats";

export const mockMovies: MovieProps[] = [
  {
    id: 1,
    title: "Bad Boys",
    image: "https://imgur.com/66iKVYe.jpg",
    banner: "https://imgur.com/cAh8q3p.jpg",
    rating: "P12",
    category: "BOOK EARLY",
    releaseDate: "2025-04-08",
    genre: "Action, Comedy",
    languages: ["English"],
    duration: "1h 50m",
    hasBookNow: true,
    screenings: [
      {
        cinema: "Boulevard Bintulu",
        sessions: [
          { date: "2025-04-08", time: "13:00" },
          { date: "2025-04-08", time: "15:30" },
          { date: "2025-04-09", time: "20:15" },
        ],
      },
      {
        cinema: "Pavilion KL",
        sessions: [
          { date: "2025-04-08", time: "12:45" },
          { date: "2025-04-08", time: "17:00" },
          { date: "2025-04-08", time: "21:30" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "THE MARTIAN",
    image: "https://imgur.com/4g2YpxN.jpg",
    banner: "https://imgur.com/caVTbAu.jpg",
    rating: "P13",
    category: "NOW SHOWING",
    releaseDate: "2025-04-08",
    genre: "Sci-Fi, Thriller",
    languages: ["English", "Japanese"],
    duration: "2h 28m",
    hasBookNow: true,
    screenings: [
      {
        cinema: "1 Utama",
        sessions: [
          { date: "2025-04-08", time: "11:00" },
          { date: "2025-04-08", time: "14:00" },
          { date: "2025-04-08", time: "18:45" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "GHOST BUSTERS FROZEN EMPIRE",
    image: "https://imgur.com/Y63vDcx.jpg",
    banner: "https://imgur.com/WAekdBQ.jpg",
    rating: "18",
    category: "COMING SOON",
    releaseDate: "2025-05-01",
    genre: "Drama, Thriller",
    languages: ["English"],
    duration: "2h 2m",
    hasBookNow: false,
    screenings: [],
  },
];

export const mockCinemas: CinemaProps[] = [
  { id: "1utama", name: "1 UTAMA" },
  { id: "pavilion", name: "PAVILION BUKIT JALIL" },
  { id: "boulevard", name: "Boulevard Bintulu" },
  { id: "gurney", name: "Gurney Plaza Penang" },
];

export const showtimeSeats: ShowtimeSeats[] = [
  {
    movieId: 2,
    cinema: "1 Utama",
    date: "2025-04-09",
    time: "12:30 PM",
    seats: [
      { id: "A1", row: "A", number: 1, status: "available" },
      { id: "A2", row: "A", number: 2, status: "sold" },
      { id: "A3", row: "A", number: 3, status: "available" },
      { id: "A4", row: "A", number: 4, status: "available" },
      { id: "B1", row: "B", number: 1, status: "sold" },
      { id: "C2", row: "C", number: 2, status: "available" },
      // ... more
    ],
  },
  // Add more showtimes here...
];
