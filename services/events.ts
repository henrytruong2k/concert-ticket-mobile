import { EventResponse, EventListResponse } from "@/types/event";
import { Api } from "./api";

async function createOne(formData: FormData): Promise<EventResponse> {
  return Api.post("/event", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function getOne(id: string | string[]): Promise<EventResponse> {
  return Api.get(`/event/${id}`);
}

async function getAll(): Promise<EventListResponse> {
  return Api.get("/event");
}

async function updateOne(
  id: string,
  formData: FormData,
): Promise<EventResponse> {
  return Api.put(`/event/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function deleteOne(id: string | string[]): Promise<EventResponse> {
  return Api.delete(`/event/${id}`);
}

const eventService = {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
};

export { eventService };
