// Type definitions for the maintenance request app

export type UserRole = "homeowner" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unitNumber?: string;
  profileImage?: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  unitNumber: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTechnician?: string;
  priority?: "low" | "medium" | "high";
}

export type RequestCategory =
  | "plumbing"
  | "electrical"
  | "security"
  | "general";

export type RequestStatus =
  | "pending"
  | "in-progress"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface CategoryCard {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: RequestCategory;
}
