import { apiFetch } from "@/lib/api";

export async function getInventory(
  token: string
) {
  return apiFetch("/api/inventory", {
    token,
  });
}

export async function createInventoryItem(
  data: {
    name: string;
    category?: string;
    quantity: number;
    unit?: string;
    minimum_quantity?: number;
  },
  token: string
) {
  return apiFetch("/api/inventory", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function updateInventory(
  id: number,
  data: Record<string, unknown>,
  token: string
) {
  return apiFetch(`/api/inventory/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}

export async function updateStock(
  id: number,
  quantity: number,
  token: string
) {
  return apiFetch(
    `/api/inventory/${id}/stock`,
    {
      method: "PATCH",
      token,
      body: JSON.stringify({
        quantity,
      }),
    }
  );
}

export async function deleteInventory(
  id: number,
  token: string
) {
  return apiFetch(`/api/inventory/${id}`, {
    method: "DELETE",
    token,
  });
}