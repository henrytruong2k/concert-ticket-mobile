import { ApiResponse } from "./api";

export type EventResponse = ApiResponse<Event>;
export type EventListResponse = ApiResponse<Event[]>;

export type Event = {
  _id: number;
  name: string;
  location: string;
  amount: number;
  totalTicketsPurchased: number;
  totalTicketsEntered: number;
  date: string;
  createdAt: string;
  updatedAt: string;
};
