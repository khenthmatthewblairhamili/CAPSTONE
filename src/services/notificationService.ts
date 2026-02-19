import { api } from "./api";

export interface Notification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export const notificationService = {
  async getAll(is_read?: boolean): Promise<Notification[]> {
    let endpoint = "/notifications";
    if (is_read !== undefined) {
      endpoint += `?is_read=${is_read}`;
    }
    return await api.get(endpoint);
  },

  async getUnreadCount(): Promise<{ count: number }> {
    return await api.get("/notifications/unread/count");
  },

  async markAsRead(id: number): Promise<Notification> {
    return await api.put(`/notifications/${id}/read`, {});
  },

  async markAllAsRead(): Promise<void> {
    await api.put("/notifications/read-all", {});
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },
};
