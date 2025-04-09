import { MovieProps } from "../interfaces/movies";
import { CinemaProps } from "../interfaces/cinemas";
import { Seats } from "../interfaces/seats";
import { generateMockSeats } from "./generateMockSeats";

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
        cinema: "Pavilion KL",
        sessions: [
          {
            date: "2025-04-08",
            time: "13:00",
            status: "available",
            roomId: "room1",
          },
          {
            date: "2025-04-09",
            time: "15:30",
            status: "selling fast",
            roomId: "room1",
          },
          {
            date: "2025-04-09",
            time: "20:15",
            status: "sold out",
            roomId: "room2",
          },
        ],
      },
      {
        cinema: "Boulevard Bintulu",
        sessions: [
          {
            date: "2025-04-09",
            time: "12:45",
            status: "available",
            roomId: "room3",
          },
          {
            date: "2025-04-10",
            time: "17:00",
            status: "available",
            roomId: "room3",
          },
          {
            date: "2025-04-09",
            time: "21:30",
            status: "sold out",
            roomId: "room3",
          },
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
        cinema: "Pavillion KL",
        sessions: [
          {
            date: "2025-04-09",
            time: "11:00",
            status: "available",
            roomId: "roomA",
          },
          {
            date: "2025-04-09",
            time: "14:00",
            status: "selling fast",
            roomId: "roomA",
          },
          {
            date: "2025-04-10",
            time: "18:45",
            status: "selling fast",
            roomId: "roomB",
          },
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

export const mockSeats: Seats[] = [
  generateMockSeats(1, "Boulevard Bintulu", "2025-04-10", "17:00", 10), // Match with session in mockMovies
  generateMockSeats(1, "Pavilion KL", "2025-04-09", "21:30", 5),
];
