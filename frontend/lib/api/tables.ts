import { apiFetch } from "@/lib/api";

export async function getTables(
  token: string
) {
  return apiFetch("/api/tables", {
    token,
  });
}

export async function createTable(
  data: {
    table_number: string;
    capacity: number;
  },
  token: string
) {
  return apiFetch("/api/tables", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}

export async function allocateTable(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/tables/${id}/allocate`,
    {
      method: "PATCH",
      token,
    }
  );
}

export async function releaseTable(
  id: number,
  token: string
) {
  return apiFetch(
    `/api/tables/${id}/release`,
    {
      method: "PATCH",
      token,
    }
  );
}