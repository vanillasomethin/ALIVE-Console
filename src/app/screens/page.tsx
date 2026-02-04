"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VirtualizedScreensTable } from "@/components/tables/VirtualizedScreensTable";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { createPairingCode, fetchDevices, type Device, type PairingResponse } from "@/lib/api";

export default function ScreensPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pairing, setPairing] = useState<PairingResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await fetchDevices();
        if (isMounted) {
          setDevices(data);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError instanceof Error ? fetchError.message : "Unable to load devices.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleGenerateCode = async () => {
    try {
      const response = await createPairingCode();
      setPairing(response);
    } catch (pairError) {
      setError(pairError instanceof Error ? pairError.message : "Unable to create claim code.");
    }
  };

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Screens</h1>
        <p>Monitor and control screens at scale with backend-connected device data.</p>
        <div style={{ marginTop: "12px" }}>
          <Link href="/screens/add">
            <Button type="button" variant="outline">
              Add screen
            </Button>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
          <Card>
            <CardHeader>
              <h2>Device list</h2>
              <p style={{ color: "#6b7280" }}>
                Data is sourced from <code>/admin/devices</code>. Use filters to narrow results.
              </p>
            </CardHeader>
            <CardContent>
              {loading && <div className="empty-state">Loading devices...</div>}
              {error && !loading && <div className="empty-state">{error}</div>}
              {!loading && !error && <VirtualizedScreensTable devices={devices} />}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2>Pairing</h2>
              <p style={{ color: "#6b7280" }}>
                Generate a claim code to pair a new device via <code>/admin/pairing</code>.
              </p>
            </CardHeader>
            <CardContent>
              <Button type="button" onClick={handleGenerateCode}>
                Generate claim code
              </Button>
              {pairing && (
                <div className="panel" style={{ marginTop: "12px" }}>
                  <strong style={{ fontSize: "20px" }}>{pairing.code}</strong>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    Expires {pairing.expires_at}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
