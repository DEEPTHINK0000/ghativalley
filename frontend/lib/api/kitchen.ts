import { apiFetch } from "@/lib/api";

export async function getKitchenOrders(
  token: string
) {
  return apiFetch("/api/kitchen/orders", {
    token,
  });
}

export async function approveOrder(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/kitchen/orders/${id}/approve`,
    {
      method: "PATCH",
      token,
    }
  );
}

export async function rejectOrder(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/kitchen/orders/${id}/reject`,
    {
      method: "PATCH",
      token,
    }
  );
}

export async function cookOrder(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/kitchen/orders/${id}/cook`,
    {
      method: "PATCH",
      token,
    }
  );
}

export async function markCooked(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/kitchen/orders/${id}/cooked`,
    {
      method: "PATCH",
      token,
    }
  );
}