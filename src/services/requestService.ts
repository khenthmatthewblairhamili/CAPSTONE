import { api } from "./api";

export interface MaintenanceRequest {
  id: string;
  user_id: number;
  type: string;
  description: string;
  unit: string;
  address?: string;
  priority: "High" | "Medium" | "Low";
  status: "pending" | "in-progress" | "completed";
  assigned_technician?: string;
  technician_notes?: string;
  completion_notes?: string;
  completed_date?: string;
  created_at: string;
  updated_at: string;
  messages?: Message[];
}

export interface Message {
  id: number;
  request_id: string;
  sender: "admin" | "homeowner";
  message: string;
  created_at: string;
}

export interface RequestStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
}

export const requestService = {
  async create(data: {
    type: string;
    description: string;
    unit: string;
    address?: string;
    priority?: string;
  }): Promise<MaintenanceRequest> {
    return await api.post("/requests", data);
  },

  async getAll(filters?: {
    status?: string;
    type?: string;
    priority?: string;
  }): Promise<MaintenanceRequest[]> {
    let endpoint = "/requests";

    if (filters) {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.type) params.append("type", filters.type);
      if (filters.priority) params.append("priority", filters.priority);

      const queryString = params.toString();
      if (queryString) {
        endpoint += `?${queryString}`;
      }
    }

    return await api.get(endpoint);
  },

  async getById(id: string): Promise<MaintenanceRequest> {
    return await api.get(`/requests/${id}`);
  },

  async update(
    id: string,
    data: {
      priority?: string;
      status?: string;
      assigned_technician?: string;
      technician_notes?: string;
      completion_notes?: string;
      completed_date?: string;
    }
  ): Promise<MaintenanceRequest> {
    return await api.put(`/requests/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/requests/${id}`);
  },

  async getStats(): Promise<RequestStats> {
    return await api.get("/requests/stats/summary");
  },
};
