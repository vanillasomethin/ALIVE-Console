const incidents = [
  {
    id: "INC-2041",
    title: "Store 112 offline after power event",
    severity: "High",
    time: "12m ago"
  },
  {
    id: "INC-2040",
    title: "Player crash loop on Screen 090-3",
    severity: "Medium",
    time: "38m ago"
  },
  {
    id: "INC-2039",
    title: "Low storage on Dallas kiosk cluster",
    severity: "Low",
    time: "1h ago"
  }
];

export default function DashboardPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Dashboard</h1>
        <p>Operational pulse across your signage fleet.</p>
        <div className="grid grid-3" style={{ marginTop: "20px" }}>
          <div className="card">
            <div className="badge">Online</div>
            <h2 style={{ fontSize: "32px" }}>4,812</h2>
            <p>Devices currently reporting in.</p>
          </div>
          <div className="card">
            <div className="badge" style={{ background: "#fef3c7", color: "#b45309" }}>
              Offline
            </div>
            <h2 style={{ fontSize: "32px" }}>108</h2>
            <p>Devices offline in the last hour.</p>
          </div>
          <div className="card">
            <div className="badge" style={{ background: "#fee2e2", color: "#b91c1c" }}>
              Needs attention
            </div>
            <h2 style={{ fontSize: "32px" }}>27</h2>
            <p>Actively failing or misconfigured.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Recent incidents</h2>
        <div className="list">
          {incidents.map((incident) => (
            <div key={incident.id} className="list-item">
              <div>
                <strong>{incident.title}</strong>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{incident.id}</div>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span className="pill">{incident.severity}</span>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>{incident.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
