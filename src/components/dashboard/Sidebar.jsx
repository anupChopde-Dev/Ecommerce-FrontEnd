import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut, Store } from "lucide-react";
import { clearSession } from "../../lib/auth";

export function Sidebar({ title, collapsed, onToggle, links, role }) {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`flex h-screen flex-col overflow-hidden bg-[var(--color-sidebar)] p-3 text-[var(--color-sidebar-text)] transition-all duration-300 ${collapsed ? "w-[76px] shrink-0" : "w-[258px] shrink-0"}`}
    >
     <div className={`flex justify-between items-center ${collapsed ? 'flex-col-reverse gap-4 ' : 'flex-row gap-3'} border-b border-[var(--color-border)] px-2 pb-6`}>
   <span className={`flex items-center gap-2 ${collapsed ? 'flex-col' : 'flex-row'}`}>
    <Link
      to={role === "admin" ? "/admin/dashboard" : "/vendor/dashboard"}
      className="grid size-9 shrink-0 place-items-center rounded-xl bg-[var(--color-primary)] text-[var(--color-surface)]"
    >
      <Store size={21} />
    </Link>
    {!collapsed && (
      <span className="text-lg font-bold tracking-tight text-[var(--color-surface)]">
        Marketly
      </span>
    )}
  </span>
  <span>
    {!collapsed && (
      <button
        onClick={onToggle}
        aria-label="Collapse sidebar"
        className="ml-auto grid size-8 place-items-center rounded-lg bg-[var(--color-sidebar-hover)] text-[var(--color-sidebar-muted)]"
      >
        <ChevronLeft size={18} />
      </button>
    )}
    {collapsed && (
      <button
        onClick={onToggle}
        aria-label="Expand sidebar"
        className="grid size-8 place-items-center rounded-md bg-[var(--color-sidebar-hover)] text-[var(--color-sidebar-muted)]"
      >
        <ChevronRight size={16} />
      </button>
    )}
  </span>

 
</div>

    
      <nav className="grid gap-1 mt-3">
        {links.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            title={collapsed ? label : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-[var(--color-sidebar-hover)] hover:text-[var(--color-surface)] ${location.pathname === to ? "bg-[var(--color-primary)] text-[var(--color-surface)]" : ""} ${collapsed ? "justify-center px-0" : ""}`}
          >
            <Icon size={19} />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-2 border-t border-[var(--color-border)] px-2 pt-4">
        {!collapsed && (
          <div className="grid flex-1 gap-0.5 text-xs">
            <strong className="text-[var(--color-sidebar-text)]">
              {title}
            </strong>
            <span className="text-[var(--color-sidebar-muted)]">
              {role === "admin" ? "Administrator" : "Store owner"}
            </span>
          </div>
        )}
        <button
          onClick={logout}
          title="Sign out"
          className="ml-auto rounded-lg p-2 text-[var(--color-sidebar-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-[var(--color-surface)]"
        >
          <LogOut size={19} />
        </button>
      </div>
    </aside>
  );
}
