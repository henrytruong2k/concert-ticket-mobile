import { Ticket, TicketListResponse, TicketResponse } from "@/types/ticket";
import { Api } from "./api";
import { ApiResponse } from "@/types/api";
import { Event } from "@/types/event";

async function getOne(
  id: number,
): Promise<ApiResponse<{ ticket: Ticket; qrCode: string }>> {
  return Api.get(`/ticket/${id}`);
}

async function getAll(): Promise<TicketListResponse> {
  return Api.get("/ticket");
}

async function buyTicket(email: string, event: Event): Promise<any> {
  return Api.post("/ticket/buy", { email, event });
}

async function scan(
  ticketId: string,
  ownerId: string,
): Promise<ApiResponse<Ticket>> {
  return Api.post("/ticket/scan", { ticketId, ownerId });
}

const ticketService = {
  getOne,
  getAll,
  buyTicket,
  scan,
};

export { ticketService };
