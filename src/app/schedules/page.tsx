export default function SchedulesPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Schedules</h1>
        <p>Assign playlists by group/device with daypart rules.</p>
      </section>
      <section className="section grid" style={{ gap: "16px" }}>
        <div className="panel">
          <h2>Assignment</h2>
          <div className="toolbar" style={{ marginTop: "12px" }}>
            <select defaultValue="Playlist: Spring Launch">
              <option>Playlist: Spring Launch</option>
              <option>Playlist: Summer Promo</option>
              <option>Playlist: Holiday Loop</option>
            </select>
            <select defaultValue="Group: Flagship">
              <option>Group: Flagship</option>
              <option>Group: North</option>
              <option>Device: Screen 204</option>
            </select>
            <button type="button">Assign</button>
          </div>
        </div>
        <div className="panel">
          <h2>Daypart rules</h2>
          <table className="table" style={{ marginTop: "12px" }}>
            <thead>
              <tr>
                <th>Daypart</th>
                <th>Time</th>
                <th>Playlist</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Morning</td>
                <td>06:00 - 11:00</td>
                <td>Morning Menu Loop</td>
              </tr>
              <tr>
                <td>Midday</td>
                <td>11:00 - 16:00</td>
                <td>Lunch Promo</td>
              </tr>
              <tr>
                <td>Evening</td>
                <td>16:00 - 22:00</td>
                <td>Evening Campaign</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
