import "./globals.css";
import type { ReactNode } from "react";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "ALIVE Signage Console",
  description: "Modern ops console for managing signage screens."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
