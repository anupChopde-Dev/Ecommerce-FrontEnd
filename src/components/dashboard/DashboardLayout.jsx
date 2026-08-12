import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { getSession } from "../../lib/auth";

export function DashboardLayout({ title, subtitle, role, links, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const name =
    getSession()?.user?.name ||
    (role === "admin" ? "Admin User" : "Vendor User");
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-page)] text-[var(--color-text)]">
      <Sidebar
        title={title}
        role={role}
        links={links}
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
      />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-between gap-5 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 md:px-10 md:py-3">
          <div>
           
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
           
          </div>
          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="hidden size-10 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] sm:grid"
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Notifications"
              className="relative hidden size-10 place-items-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] sm:grid"
            >
              <Bell size={20} />
              <i className="absolute right-2 top-2 size-1.5 rounded-full bg-[var(--color-danger)]" />
            </button>
            <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-3">
              <span className="grid size-9 place-items-center rounded-full bg-[var(--color-primary-soft)] text-[11px] font-bold text-[var(--color-primary)]">
                {initials}
              </span>
              <div className="hidden text-xs sm:grid">
                <b>{name}</b>
                <small className="capitalize text-[var(--color-muted)]">
                  {role}
                </small>
              </div>
            </div>
          </div>
        </header>
        <section className="min-h-0 flex-1 overflow-y-auto p-4 md:p-8 md:px-10">
          {children || <Outlet />}
        </section>
      </main>
    </div>
  );
}
