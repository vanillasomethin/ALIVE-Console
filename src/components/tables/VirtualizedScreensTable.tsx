"use client";

import { useMemo, useState } from "react";
import type { Device } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export type Screen = {
  id: string;
  name: string;
  group: string;
  store: string;
  city: string;
  status: "Online" | "Offline" | "Attention";
  lastSeen: string;
  lastSeenMinutes: number | null;
};

const lastSeenOptions = ["Any", "< 1h", "< 24h", "< 7d"];

function parseLastSeenMinutes(value: string): number | null {
  if (!value) return null;
  const relativeMatch = value.match(/(\d+)([mhd])/i);
  if (relativeMatch) {
    const amount = Number(relativeMatch[1]);
    const unit = relativeMatch[2].toLowerCase();
    if (unit === "m") return amount;
    if (unit === "h") return amount * 60;
    if (unit === "d") return amount * 60 * 24;
  }

  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) {
    const diffMs = Date.now() - parsed;
    return Math.max(0, Math.round(diffMs / 60000));
  }

  return null;
}

function mapDevice(device: Device): Screen {
  const statusMap: Record<Device["status"], Screen["status"]> = {
    online: "Online",
    offline: "Offline",
    attention: "Attention"
  };

  const lastSeen = device.last_seen || "Unknown";

  return {
    id: device.id,
    name: device.name,
    group: device.group,
    store: device.store,
    city: device.city,
    status: statusMap[device.status] ?? "Attention",
    lastSeen,
    lastSeenMinutes: parseLastSeenMinutes(lastSeen)
  };
}

export function VirtualizedScreensTable({ devices }: { devices: Device[] }) {
  const screens = useMemo(() => devices.map(mapDevice), [devices]);
  const groups = useMemo(() => Array.from(new Set(screens.map((screen) => screen.group))).sort(), [screens]);
  const stores = useMemo(() => Array.from(new Set(screens.map((screen) => screen.store))).sort(), [screens]);
  const cities = useMemo(() => Array.from(new Set(screens.map((screen) => screen.city))).sort(), [screens]);
  const statuses: Screen["status"][] = ["Online", "Offline", "Attention"];

  const [groupFilter, setGroupFilter] = useState("All");
  const [storeFilter, setStoreFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [lastSeenFilter, setLastSeenFilter] = useState("Any");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [scrollTop, setScrollTop] = useState(0);

  const filtered = useMemo(() => {
    return screens.filter((screen) => {
      if (groupFilter !== "All" && screen.group !== groupFilter) return false;
      if (storeFilter !== "All" && screen.store !== storeFilter) return false;
      if (cityFilter !== "All" && screen.city !== cityFilter) return false;
      if (statusFilter !== "All" && screen.status !== statusFilter) return false;
      if (lastSeenFilter !== "Any" && screen.lastSeenMinutes !== null) {
        if (lastSeenFilter === "< 1h" && screen.lastSeenMinutes > 60) return false;
        if (lastSeenFilter === "< 24h" && screen.lastSeenMinutes > 60 * 24) return false;
        if (lastSeenFilter === "< 7d" && screen.lastSeenMinutes > 60 * 24 * 7) return false;
      }
      return true;
    });
  }, [screens, groupFilter, storeFilter, cityFilter, statusFilter, lastSeenFilter]);

  const rowHeight = 52;
  const containerHeight = 420;
  const overscan = 6;
  const totalHeight = filtered.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(
    filtered.length,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan
  );
  const visibleRows = filtered.slice(startIndex, endIndex);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === filtered.length) {
        return new Set();
      }
      return new Set(filtered.map((screen) => screen.id));
    });
  };

  return (
    <div className="grid" style={{ gap: "16px" }}>
      <div className="toolbar">
        <Select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)} label="Group">
          <option value="All">All groups</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </Select>
        <Select value={storeFilter} onChange={(event) => setStoreFilter(event.target.value)} label="Store">
          <option value="All">All stores</option>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </Select>
        <Select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)} label="City">
          <option value="All">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
        <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} label="Status">
          <option value="All">All status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
        <Select
          value={lastSeenFilter}
          onChange={(event) => setLastSeenFilter(event.target.value)}
          label="Last seen"
        >
          {lastSeenOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Button type="button" onClick={handleSelectAll} variant="outline">
          {selectedIds.size === filtered.length && filtered.length > 0
            ? "Clear selection"
            : `Select ${filtered.length} screens`}
        </Button>
      </div>

      <div className="panel">
        <div className="toolbar" style={{ marginBottom: "12px" }}>
          <strong>{selectedIds.size} selected</strong>
          <Button type="button">Assign playlist</Button>
          <Button type="button" variant="secondary">
            Force resync
          </Button>
          <Button type="button" variant="outline">
            Reboot (API placeholder)
          </Button>
          <Button type="button" variant="outline">
            Move group
          </Button>
        </div>
        <div className="virtual-container" onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}>
          <div style={{ height: totalHeight, position: "relative" }}>
            <div className="virtual-row header" style={{ position: "sticky" }}>
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.size === filtered.length && filtered.length > 0}
                  onChange={handleSelectAll}
                />
              </div>
              <div>Screen</div>
              <div>Group</div>
              <div>Store</div>
              <div>City</div>
              <div>Status</div>
              <div>Last seen</div>
            </div>
            {visibleRows.map((screen, index) => {
              const rowIndex = startIndex + index;
              return (
                <div
                  key={screen.id}
                  className="virtual-row"
                  style={{
                    position: "absolute",
                    top: rowIndex * rowHeight + rowHeight,
                    left: 0,
                    right: 0
                  }}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(screen.id)}
                      onChange={() => handleToggle(screen.id)}
                    />
                  </div>
                  <div>
                    <strong>{screen.name}</strong>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{screen.id}</div>
                  </div>
                  <div>{screen.group}</div>
                  <div>{screen.store}</div>
                  <div>{screen.city}</div>
                  <div>
                    <span
                      className="pill"
                      style={{
                        background:
                          screen.status === "Online"
                            ? "#ecfdf3"
                            : screen.status === "Offline"
                            ? "#fee2e2"
                            : "#fef3c7",
                        color:
                          screen.status === "Online"
                            ? "#047857"
                            : screen.status === "Offline"
                            ? "#b91c1c"
                            : "#b45309"
                      }}
                    >
                      {screen.status}
                    </span>
                  </div>
                  <div>{screen.lastSeen}</div>
                </div>
              );
            })}
            {filtered.length === 0 && <div className="empty-state">No devices match the filters.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
