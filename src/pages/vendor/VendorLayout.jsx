import { BarChart3, CreditCard, LayoutDashboard, Package, ShoppingBag } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'

const links = [
  { label: 'Overview', to: '/vendor/dashboard', icon: LayoutDashboard },
  { label: 'Products', to: '/vendor/products', icon: Package },
  { label: 'Orders', to: '/vendor/orders', icon: ShoppingBag },
  { label: 'Analytics', to: '/vendor/analytics', icon: BarChart3 },
  { label: 'Payouts', to: '/vendor/payouts', icon: CreditCard },
]

export function VendorLayout() {
  return <DashboardLayout title="Vendor dashboard" subtitle="Manage your store." role="vendor" links={links} />
}
