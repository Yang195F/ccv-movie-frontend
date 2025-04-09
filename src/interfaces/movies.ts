export interface MovieProps {
  id: number;
  title: string;
  image: string; // Poster
  banner: string; // Full-width background
  rating: string; // e.g. "P13"
  category: "NOW SHOWING" | "BOOK EARLY" | "COMING SOON";
  hasBookNow: boolean;
  releaseDate: string; // ISO date
  genre: string;
  languages: string[];
  duration: string; // e.g. "1h 50m"

  screenings?: {
    cinema: string;
    sessions?: {
      date: string; // "2025-04-08"
      time: string; // "13:00"
      status: "available" | "selling fast" | "sold out";
      roomId?: string; // Links to CinemaRoomProps
    }[];
  }[];
}
