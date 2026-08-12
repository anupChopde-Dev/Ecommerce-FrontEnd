import {
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";

const links = [
  { label: "Overview", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Vendors", to: "/admin/vendors", icon: Users },
  { label: "Orders", to: "/admin/orders", icon: ShoppingBag },
  { label: "Catalog", to: "/admin/catalog", icon: Package },
  { label: "Reports", to: "/admin/reports", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export function AdminLayout() {
  return (
    <DashboardLayout
      title="Admin dashboard"
      subtitle="Manage your marketplace."
      role="admin"
      links={links}
    />
  );
}
