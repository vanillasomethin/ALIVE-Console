"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { claimPairingCode, type ClaimResponse } from "@/lib/api";

const stores = ["Store 12", "Store 34", "Store 56", "Store 78"];
const groups = ["North", "South", "East", "West", "Flagship"];

export default function AddScreenPage() {
  const [code, setCode] = useState("");
  const [store, setStore] = useState(stores[0]);
  const [group, setGroup] = useState(groups[0]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [claimed, setClaimed] = useState<ClaimResponse | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setClaimed(null);

    if (!code.trim()) {
      setError("Enter a pairing code to continue.");
      return;
    }

    try {
      setLoading(true);
      const response = await claimPairingCode(code.trim(), store, group);
      setClaimed(response);
    } catch (claimError) {
      setError(claimError instanceof Error ? claimError.message : "Unable to claim device.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Add Screen</h1>
        <p>Claim a pairing code and assign the new device to a store and group.</p>
      </section>

      <section className="section">
        <Card style={{ maxWidth: "520px" }}>
          <CardHeader>
            <h2>Pairing claim</h2>
            <p style={{ color: "#6b7280" }}>
              Submit the pairing code to <code>/v1/admin/device/pairing/claim</code>.
            </p>
          </CardHeader>
          <CardContent>
            <Input
              label="Pairing code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Enter code"
            />
            <Select label="Store" value={store} onChange={(event) => setStore(event.target.value)}>
              {stores.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Select label="Group" value={group} onChange={(event) => setGroup(event.target.value)}>
              {groups.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Button type="button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Claiming..." : "Claim device"}
            </Button>
            {error && <div className="empty-state">{error}</div>}
            {claimed && (
              <div className="panel" style={{ marginTop: "12px" }}>
                <strong>Success</strong>
                <div style={{ marginTop: "6px" }}>
                  Device {claimed.device_name ?? claimed.device_id} claimed successfully.
                </div>
                <Link href={`/screens/${claimed.device_id}`} style={{ color: "#2563eb" }}>
                  View device record
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
