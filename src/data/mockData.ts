import { MovieProps } from "../interfaces/movies";
import { CinemaProps } from "../interfaces/cinemas";
import { Seats } from "../interfaces/seats";
import { generateMockSeats } from "./generateMockSeats";
import { RoomTemplates } from "../config/roomTemplate";

export const mockMovies: MovieProps[] = [
  {
    movieId: 1,
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
    ticketPrice: 18,
    screenings: [
      {
        cinema: "Pavilion KL",
        sessions: [
          {
            date: "2025-04-11",
            time: "13:00",
            status: "available",
            roomId: "indulge2_pvl",
          },
          {
            date: "2025-04-12",
            time: "15:30",
            status: "selling fast",
            roomId: "imax1_pvl",
          },
          {
            date: "2025-04-11",
            time: "20:15",
            status: "available",
            roomId: "lux2_pvl",
          },
        ],
      },
      {
        cinema: "Boulevard Bintulu",
        sessions: [
          {
            date: "2025-04-11",
            time: "12:45",
            status: "available",
            roomId: "room3",
          },
          {
            date: "2025-04-12",
            time: "17:00",
            status: "available",
            roomId: "room3",
          },
          {
            date: "2025-04-14",
            time: "21:30",
            status: "sold out",
            roomId: "room3",
          },
        ],
      },
    ],
  },
  {
    movieId: 2,
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
    ticketPrice: 14,
    screenings: [
      {
        cinema: "Pavilion KL",
        sessions: [
          {
            date: "2025-04-11",
            time: "11:00",
            status: "available",
            roomId: "indulge1_pvl",
          },
          {
            date: "2025-04-19",
            time: "14:00",
            status: "selling fast",
            roomId: "imax1_pvl",
          },
          {
            date: "2025-04-11",
            time: "18:45",
            status: "selling fast",
            roomId: "imax1_pvl",
          },
        ],
      },
    ],
  },
  {
    movieId: 3,
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
  {
    id: "pavilion",
    name: "Pavilion KL",
    cinemaRooms: [
      {
        id: "indulge1_pvl",
        name: "INDULGE 1",
        layoutType: "INDULGE",
        seatGrid: RoomTemplates.INDULGE.generate(),
      },
      {
        id: "imax1_pvl",
        name: "IMAX 1",
        layoutType: "IMAX",
        seatGrid: RoomTemplates.IMAX.generate(),
      },
    ],
  },
  {
    id: "boulevard_pvl",
    name: "Boulevard Bintulu",
    cinemaRooms: [
      {
        id: "lux1",
        name: "LUX 1",
        layoutType: "LUX",
        seatGrid: RoomTemplates.LUX.generate(),
      },
    ],
  },
  {
    id: "1utama",
    name: "1 Utama",
    cinemaRooms: [
      {
        id: "imax1_1u",
        name: "IMAX 1",
        layoutType: "IMAX",
        seatGrid: RoomTemplates.IMAX.generate(),
      },
      {
        id: "indulge1_1u",
        name: "INDULGE 1",
        layoutType: "INDULGE",
        seatGrid: RoomTemplates.INDULGE.generate(),
      },
    ],
  },
];
