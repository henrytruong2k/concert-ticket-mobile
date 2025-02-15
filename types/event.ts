import { ApiResponse } from "./api";

export type EventResponse = ApiResponse<Event>;
export type EventListResponse = ApiResponse<Event[]>;

export type Event = {
  _id: string;
  name: string;
  location: string;
  amount: number;
  image: string;
  publicId: string;
  totalTicketsPurchased: number;
  totalTicketsEntered: number;
  date: string;
  createdAt: string;
  updatedAt: string;
};
