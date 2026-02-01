"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/screens", label: "Screens" },
  { href: "/content", label: "Content" },
  { href: "/playlists", label: "Playlists" },
  { href: "/schedules", label: "Schedules" },
  { href: "/monitoring", label: "Monitoring" },
  { href: "/reports", label: "Reports" }
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <strong>ALIVE Console</strong>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={pathname === item.href ? "active" : ""}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
