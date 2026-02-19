import { api } from "./api";

export interface Message {
  id: number;
  request_id: string | number;
  sender: "admin" | "homeowner";
  message: string;
  created_at: string;
}

export const messageService = {
  async create(request_id: string | number, message: string): Promise<Message> {
    return await api.post("/messages", { request_id, message });
  },

  async getByRequestId(request_id: string | number): Promise<Message[]> {
    return await api.get(`/messages/request/${request_id}`);
  },
};
