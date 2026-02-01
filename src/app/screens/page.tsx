import { VirtualizedScreensTable } from "@/components/tables/VirtualizedScreensTable";

export default function ScreensPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <section className="section">
        <h1>Screens</h1>
        <p>Monitor and control screens at scale with fast, virtualized browsing.</p>
      </section>
      <section className="section">
        <VirtualizedScreensTable />
      </section>
    </div>
  );
}
