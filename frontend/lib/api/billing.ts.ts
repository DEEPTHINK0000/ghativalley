import { apiFetch } from "@/lib/api";

export async function getBills(
  token: string
) {
  return apiFetch("/api/bills", {
    token,
  });
}

export async function getBill(
  id: number,
  token: string
) {
  return apiFetch(`/api/bills/${id}`, {
    token,
  });
}

export async function generateBill(
  orderId: number,
  discount: number,
  token: string
) {
  return apiFetch("/api/bills", {
    method: "POST",
    token,
    body: JSON.stringify({
      order_id: orderId,
      discount,
    }),
  });
}

export async function updateBill(
  id: number,
  data: Record<string, unknown>,
  token: string
) {
  return apiFetch(`/api/bills/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}