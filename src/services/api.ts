import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../config/environment";

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem("authToken");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  async get(endpoint: string) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  }

  async post(endpoint: string, data: any) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const text = await response.text();
      let error;
      try {
        error = JSON.parse(text);
      } catch {
        throw new Error(text || "Request failed");
      }
      throw new Error(error.error || "Request failed");
    }

    const text = await response.text();
    if (!text) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid response from server");
    }
  }

  async put(endpoint: string, data: any) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  }

  async delete(endpoint: string) {
    const headers = await this.getHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Request failed");
    }

    return response.json();
  }
}

export const api = new ApiClient(API_BASE_URL);
