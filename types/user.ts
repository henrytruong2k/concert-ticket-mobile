import { ApiResponse } from "./api";

export enum UserRole {
  Attendee = "attendee",
  Manager = "manager",
}

export type AuthResponse = ApiResponse<{ token: string; user: User }>;

export type User = {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};
