export interface MovieProps {
  id: number;
  title: string;
  image: string;
  banner: string;
  rating: string;
  category: "NOW SHOWING" | "BOOK EARLY" | "COMING SOON";
  hasBookNow: boolean;
  releaseDate: string;
  genre: string;
  languages: string[];
  duration: string;
  screenings: {
    cinema: string;
    sessions: {
      date: string; // e.g. "2025-04-08"
      time: string; // e.g. "13:00"
    }[];
  }[];
}
