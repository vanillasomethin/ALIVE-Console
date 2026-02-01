const assets = [
  {
    name: "Spring campaign hero.mp4",
    tags: ["campaign", "hero"],
    duration: "00:30",
    resolution: "1920x1080",
    sha: "a7c3...91ff"
  },
  {
    name: "Promo card - June.png",
    tags: ["promo", "static"],
    duration: "00:10",
    resolution: "1080x1920",
    sha: "c4b1...0d4e"
  },
  {
    name: "Menu loop v3.mov",
    tags: ["menu", "loop"],
    duration: "02:00",
    resolution: "3840x2160",
    sha: "f2d9...aa12"
  }
];

export default function ContentPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Content Library</h1>
        <p>Upload, tag, and inspect content assets before adding them to playlists.</p>
      </section>
      <section className="section grid" style={{ gap: "16px" }}>
        <div className="panel">
          <h2>Upload new content</h2>
          <div className="toolbar" style={{ marginTop: "12px" }}>
            <input type="file" />
            <input type="text" placeholder="Add tags (comma-separated)" />
            <button type="button">Upload</button>
          </div>
        </div>
        <div className="panel">
          <h2>Content assets</h2>
          <table className="table" style={{ marginTop: "12px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tags</th>
                <th>Duration</th>
                <th>Resolution</th>
                <th>SHA</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.name}>
                  <td>{asset.name}</td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {asset.tags.map((tag) => (
                        <span key={tag} className="pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{asset.duration}</td>
                  <td>{asset.resolution}</td>
                  <td>{asset.sha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
