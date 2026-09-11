import { apiFetch } from "@/lib/api";

export async function getMenu() {
  return apiFetch("/api/menu");
}

export async function getDish(id: number) {
  return apiFetch(`/api/menu/${id}`);
}

export async function createDish(
  data: {
    name: string;
    category: string;
    description?: string;
    price: number;
    image?: string;
    available?: number;
  },
  token: string
) {
  return apiFetch("/api/menu", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function updateDish(
  id: number,
  data: Record<string, unknown>,
  token: string
) {
  return apiFetch(`/api/menu/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}

export async function deleteDish(
  id: number,
  token: string
) {
  return apiFetch(`/api/menu/${id}`, {
    method: "DELETE",
    token,
  });
}
