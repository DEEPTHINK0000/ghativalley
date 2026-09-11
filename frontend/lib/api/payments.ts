import { apiFetch } from "@/lib/api";

export async function createPayment(
  data: {
    bill_id: number;
    amount: number;
    payment_method: string;
    transaction_id?: string;
  },
  token: string
) {
  return apiFetch("/api/payments", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function getPayments(
  token: string
) {
  return apiFetch("/api/payments", {
    token,
  });
}