export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export type Device = {
  id: string;
  name: string;
  group: string;
  store: string;
  city: string;
  status: "online" | "offline" | "attention";
  last_seen: string;
};

export type PairingResponse = {
  code: string;
  expires_at: string;
};

export async function fetchDevices(): Promise<Device[]> {
  const response = await fetch(`${API_BASE_URL}/admin/devices`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load devices");
  }
  return response.json();
}

export async function createPairingCode(): Promise<PairingResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/pairing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Failed to create pairing code");
  }
  return response.json();
}
