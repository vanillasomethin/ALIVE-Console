"use client";

import { useMemo, useState } from "react";

const campaigns = ["Spring Launch", "Summer Promo", "Holiday" ];

const reportRows = [
  { store: "Store 12", plays: 1840, impressions: 29800 },
  { store: "Store 34", plays: 1620, impressions: 27100 },
  { store: "Store 56", plays: 1410, impressions: 23900 },
  { store: "Store 78", plays: 1985, impressions: 31150 }
];

export default function ReportsPage() {
  const [campaign, setCampaign] = useState(campaigns[0]);
  const [startDate, setStartDate] = useState("2024-06-01");
  const [endDate, setEndDate] = useState("2024-06-30");

  const totals = useMemo(() => {
    return reportRows.reduce(
      (acc, row) => {
        acc.plays += row.plays;
        acc.impressions += row.impressions;
        return acc;
      },
      { plays: 0, impressions: 0 }
    );
  }, []);

  const handleExport = () => {
    const csvRows = [
      ["Campaign", campaign],
      ["Date range", `${startDate} to ${endDate}`],
      ["Store", "Plays", "Impressions"],
      ...reportRows.map((row) => [row.store, row.plays, row.impressions]),
      ["Total", totals.plays, totals.impressions]
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `proof-of-play-${campaign}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Proof-of-play reports</h1>
        <p>View totals by campaign and export CSV for downstream analytics.</p>
      </section>
      <section className="section grid" style={{ gap: "16px" }}>
        <div className="panel">
          <h2>Report filters</h2>
          <div className="toolbar" style={{ marginTop: "12px" }}>
            <select value={campaign} onChange={(event) => setCampaign(event.target.value)}>
              {campaigns.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
            <button type="button">Run report</button>
            <button type="button" onClick={handleExport}>
              Export CSV
            </button>
          </div>
        </div>
        <div className="panel">
          <h2>Totals</h2>
          <div className="grid grid-3" style={{ marginTop: "12px" }}>
            <div className="card">
              <strong>Total plays</strong>
              <h3>{totals.plays}</h3>
            </div>
            <div className="card">
              <strong>Total impressions</strong>
              <h3>{totals.impressions}</h3>
            </div>
            <div className="card">
              <strong>Date range</strong>
              <h3>{startDate} → {endDate}</h3>
            </div>
          </div>
        </div>
        <div className="panel">
          <h2>Per-store breakdown</h2>
          <table className="table" style={{ marginTop: "12px" }}>
            <thead>
              <tr>
                <th>Store</th>
                <th>Plays</th>
                <th>Impressions</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((row) => (
                <tr key={row.store}>
                  <td>{row.store}</td>
                  <td>{row.plays}</td>
                  <td>{row.impressions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
