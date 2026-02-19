import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";

export interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "homeowner";
  phone?: string;
  address?: string;
  position?: string;
  community?: string;
  profile_image?: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/login", { email, password });
    await AsyncStorage.setItem("authToken", response.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.user));
    return response;
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
    role: "admin" | "homeowner";
    phone?: string;
    address?: string;
    position?: string;
    community?: string;
  }): Promise<AuthResponse> {
    const response = await api.post("/auth/register", data);
    await AsyncStorage.setItem("authToken", response.token);
    await AsyncStorage.setItem("user", JSON.stringify(response.user));
    return response;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("user");
  },

  async getCurrentUser(): Promise<User> {
    return await api.get("/auth/me");
  },

  async updateProfile(data: {
    name?: string;
    phone?: string;
    address?: string;
    position?: string;
    community?: string;
    profile_image?: string | null;
  }): Promise<User> {
    const response = await api.put("/auth/profile", data);
    await AsyncStorage.setItem("user", JSON.stringify(response));
    return response;
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await api.put("/auth/password", { currentPassword, newPassword });
  },

  async getStoredUser(): Promise<User | null> {
    const userStr = await AsyncStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  async getStoredToken(): Promise<string | null> {
    return await AsyncStorage.getItem("authToken");
  },
};
