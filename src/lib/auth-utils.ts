// Funções utilitárias que podem ser usadas no cliente
import { type UserRole } from "@/lib/types";

export function isAdmin(role: UserRole): boolean {
  return role === "ADMIN";
}

export function isEditor(role: UserRole): boolean {
  return role === "EDITOR";
}

export function canManageUsers(role: UserRole): boolean {
  return role === "ADMIN";
}

export function canManageContent(role: UserRole): boolean {
  return role === "ADMIN" || role === "EDITOR";
}
