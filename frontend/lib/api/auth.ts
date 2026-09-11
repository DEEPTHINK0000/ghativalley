import { apiFetch } from "@/lib/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(
  data: RegisterData
) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(
  data: LoginData
) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logoutUser(
  token: string
) {
  return apiFetch("/api/auth/logout", {
    method: "POST",
    token,
  });
}