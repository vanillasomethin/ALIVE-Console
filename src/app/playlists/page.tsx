"use client";

import { useState } from "react";

const initialPlaylist = [
  { id: "asset-1", name: "Spring campaign hero.mp4", weight: 2 },
  { id: "asset-2", name: "Promo card - June.png", weight: 1 },
  { id: "asset-3", name: "Menu loop v3.mov", weight: 3 }
];

export default function PlaylistsPage() {
  const [items, setItems] = useState(initialPlaylist);

  const moveItem = (index: number, direction: number) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(nextIndex, 0, moved);
    setItems(next);
  };

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Playlists</h1>
        <p>Arrange content ordering, weights, and assign playlists to targets.</p>
      </section>
      <section className="section grid" style={{ gap: "16px" }}>
        <div className="panel">
          <h2>Playlist editor</h2>
          <div className="list" style={{ marginTop: "12px" }}>
            {items.map((item, index) => (
              <div key={item.id} className="list-item">
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>Weight: {item.weight}</div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button type="button" onClick={() => moveItem(index, -1)}>
                    Up
                  </button>
                  <button type="button" onClick={() => moveItem(index, 1)}>
                    Down
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel">
          <h2>Assign playlist</h2>
          <div className="toolbar" style={{ marginTop: "12px" }}>
            <select defaultValue="Group: North">
              <option>Group: North</option>
              <option>Group: South</option>
              <option>Group: East</option>
              <option>Device: Screen 120</option>
            </select>
            <button type="button">Assign to target</button>
          </div>
          <div style={{ marginTop: "12px", fontSize: "13px", color: "#6b7280" }}>
            Assignment actions will hit the alive-signage-backend API.
          </div>
        </div>
      </section>
    </div>
  );
}
