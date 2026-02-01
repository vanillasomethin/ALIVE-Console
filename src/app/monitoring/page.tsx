const alerts = [
  {
    title: "Offline during business hours",
    detail: "23 screens across 5 stores",
    priority: "High"
  },
  {
    title: "Low storage warnings",
    detail: "11 devices below 2GB free",
    priority: "Medium"
  },
  {
    title: "Crash loop detected",
    detail: "3 players rebooting repeatedly",
    priority: "High"
  }
];

export default function MonitoringPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Monitoring</h1>
        <p>Needs-attention queue for proactive operations.</p>
      </section>
      <section className="section">
        <h2>Needs attention</h2>
        <div className="list" style={{ marginTop: "12px" }}>
          {alerts.map((alert) => (
            <div key={alert.title} className="list-item">
              <div>
                <strong>{alert.title}</strong>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>{alert.detail}</div>
              </div>
              <span className="pill">{alert.priority}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
