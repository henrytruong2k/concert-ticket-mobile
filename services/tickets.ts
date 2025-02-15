import { Ticket, TicketListResponse, TicketResponse } from "@/types/ticket";
import { Api } from "./api";
import { ApiResponse } from "@/types/api";
import { Event } from "@/types/event";

async function createOne(event: Event): Promise<TicketResponse> {
  return Api.post("/ticket", { event });
}

async function getOne(
  id: number,
): Promise<ApiResponse<{ ticket: Ticket; qrcode: string }>> {
  return Api.get(`/ticket/${id}`);
}

async function getAll(): Promise<TicketListResponse> {
  return Api.get("/ticket");
}

async function validateOne(
  ticketId: number,
  ownerId: number,
): Promise<TicketResponse> {
  return Api.post("/ticket/validate", { ticketId, ownerId });
}

const ticketService = {
  createOne,
  getOne,
  getAll,
  validateOne,
};

export { ticketService };
