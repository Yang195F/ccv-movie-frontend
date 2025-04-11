export interface Ticket {
  ticketId: string;
  name: string;
  email: string;
  movieTitle: string;
  cinemaName: string;
  roomName: string;
  date: string;
  time: string;
  seats: string[];
  language: string;
  genre: string;
  rating: string;
  duration: string;
  bookedAt: string;
  pricePerTicket?: number; // Optional, can be set later
  totalPrice?: number; // Optional, can be set later
}
