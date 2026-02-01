"use client";

import { useMemo, useRef, useState } from "react";

export type Screen = {
  id: string;
  name: string;
  group: string;
  store: string;
  city: string;
  status: "Online" | "Offline" | "Attention";
  lastSeen: string;
};

const groups = ["North", "South", "East", "West", "Flagship"];
const stores = ["Store 12", "Store 34", "Store 56", "Store 78", "Store 90"];
const cities = ["Seattle", "Austin", "Denver", "Miami", "Chicago"];
const statuses: Screen["status"][] = ["Online", "Offline", "Attention"];

const lastSeenOptions = ["Any", "< 1h", "< 24h", "< 7d"];

function buildScreens(count: number): Screen[] {
  return Array.from({ length: count }).map((_, index) => {
    const status = statuses[index % statuses.length];
    return {
      id: `SCR-${index + 1}`,
      name: `Screen ${index + 1}`,
      group: groups[index % groups.length],
      store: stores[index % stores.length],
      city: cities[index % cities.length],
      status,
      lastSeen: status === "Offline" ? "2h" : status === "Attention" ? "45m" : "5m"
    };
  });
}

export function VirtualizedScreensTable() {
  const [groupFilter, setGroupFilter] = useState("All");
  const [storeFilter, setStoreFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [lastSeenFilter, setLastSeenFilter] = useState("Any");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [scrollTop, setScrollTop] = useState(0);

  const allScreens = useMemo(() => buildScreens(5000), []);

  const filtered = useMemo(() => {
    return allScreens.filter((screen) => {
      if (groupFilter !== "All" && screen.group !== groupFilter) return false;
      if (storeFilter !== "All" && screen.store !== storeFilter) return false;
      if (cityFilter !== "All" && screen.city !== cityFilter) return false;
      if (statusFilter !== "All" && screen.status !== statusFilter) return false;
      if (lastSeenFilter !== "Any") {
        if (lastSeenFilter === "< 1h" && screen.lastSeen === "2h") return false;
        if (lastSeenFilter === "< 24h" && screen.lastSeen === "2h") return false;
        if (lastSeenFilter === "< 7d" && screen.lastSeen === "7d+") return false;
      }
      return true;
    });
  }, [allScreens, groupFilter, storeFilter, cityFilter, statusFilter, lastSeenFilter]);

  const rowHeight = 48;
  const containerHeight = 420;
  const overscan = 6;
  const totalHeight = filtered.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(
    filtered.length,
    Math.ceil((scrollTop + containerHeight) / rowHeight) + overscan
  );
  const visibleRows = filtered.slice(startIndex, endIndex);

  const containerRef = useRef<HTMLDivElement | null>(null);

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
        <select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
          <option value="All">All groups</option>
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <select value={storeFilter} onChange={(event) => setStoreFilter(event.target.value)}>
          <option value="All">All stores</option>
          {stores.map((store) => (
            <option key={store} value={store}>
              {store}
            </option>
          ))}
        </select>
        <select value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}>
          <option value="All">All cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="All">All status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select value={lastSeenFilter} onChange={(event) => setLastSeenFilter(event.target.value)}>
          {lastSeenOptions.map((option) => (
            <option key={option} value={option}>
              Last seen {option}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleSelectAll}>
          {selectedIds.size === filtered.length && filtered.length > 0
            ? "Clear selection"
            : `Select ${filtered.length} screens`}
        </button>
      </div>

      <div className="panel">
        <div className="toolbar" style={{ marginBottom: "12px" }}>
          <strong>{selectedIds.size} selected</strong>
          <button type="button">Assign playlist</button>
          <button type="button">Force resync</button>
          <button type="button">Reboot (API placeholder)</button>
          <button type="button">Move group</button>
        </div>
        <div
          ref={containerRef}
          className="virtual-container"
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        >
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
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>{screen.lastSeen} ago</div>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
