// src/interfaces/bookingSeat.ts
export interface BookingSeat {
    id: string;
    row: string;
    number: number;
    displayStatus: "available" | "sold"; // For Seat component
    actualStatus: "available" | "reserved" | "sold" | "selected"; // Internal tracking
    username?: string; // For reservations
  }