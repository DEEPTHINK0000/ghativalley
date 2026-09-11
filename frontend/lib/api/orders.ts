import { apiFetch } from "@/lib/api";

export interface OrderItem {
  menu_id: number;
  quantity: number;
}

export async function getOrders(
  token: string
) {
  return apiFetch("/api/orders", {
    token,
  });
}

export async function getOrder(
  id: number,
  token: string
) {
  return apiFetch(`/api/orders/${id}`, {
    token,
  });
}

export async function createOrder(
  data: {
    items: OrderItem[];
    table_id?: number;
    room_id?: number;
  },
  token: string
) {
  return apiFetch("/api/orders", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function updateOrder(
  id: number,
  status: string,
  token: string
) {
  return apiFetch(`/api/orders/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status }),
  });
}

export async function cancelOrder(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/orders/${id}/cancel`,
    {
      method: "POST",
      token,
    }
  );
}