
import { apiFetch } from "@/lib/api";

export async function getRooms(
  token: string
) {
  return apiFetch("/api/rooms", {
    token,
  });
}

export async function createRoom(
  data: {
    room_number: string;
    room_type: string;
    price: number;
  },
  token: string
) {
  return apiFetch("/api/rooms", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function reserveRoom(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/rooms/${id}/reserve`,
    {
      method: "PATCH",
      token,
    }
  );
}

export async function checkIn(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/rooms/${id}/check-in`,
    {
      method: "PATCH",
      token,
    }
  );
}

export async function checkOut(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/rooms/${id}/check-out`,
    {
      method: "PATCH",
      token,
    }
  );
}

export async function cleanRoom(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/rooms/${id}/clean`,
    {
      method: "PATCH",
      token,
    }
  );
}