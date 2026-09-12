import { apiFetch } from "@/lib/api";

export async function getUsers(
  token: string
) {
  return apiFetch("/api/users", {
    token,
  });
}

export async function getUser(
  id: number,
  token: string
) {
  return apiFetch(`/api/users/${id}`, {
    token,
  });
}

export async function createUser(
  data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: string;
  },
  token: string
) {
  return apiFetch("/api/users", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

// export async function updateUser(
//   id: number,
//   data: Record<string, unknown>,
//   token: string
// ) {
//   return apiFetch(`/api/users/${id}`, {
//     method: PATCH,
//     token,
//     body: JSON.stringify(data),
//   });
// }

export async function deleteUser(
  id: number,
  token: string
) {
  return apiFetch(`/api/users/${id}`, {
    method: "DELETE",
    token,
  });
}
