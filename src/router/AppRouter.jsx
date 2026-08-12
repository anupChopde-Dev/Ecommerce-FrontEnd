import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { dashboardPath, getSession } from '../lib/auth'
import { AdminDashboard } from '../pages/AdminDashboard'
import { AuthPage } from '../pages/AuthPage'
import { VendorDashboard } from '../pages/VendorDashboard'
import { AdminLayout } from '../pages/admin/AdminLayout'
import { AdminCatalog, AdminOrders, AdminReports, AdminSettings, AdminVendors } from '../pages/admin/AdminChildPages'
import { VendorLayout } from '../pages/vendor/VendorLayout'
import { VendorAnalytics, VendorOrders, VendorPayouts, VendorProducts } from '../pages/vendor/VendorChildPages'

function HomeRedirect() { const session = getSession(); return <Navigate to={session?.token ? dashboardPath(session.user.role) : '/login'} replace /> }

export function AppRouter() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<HomeRedirect />} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/signup" element={<AuthPage mode="signup" />} />
    <Route element={<ProtectedRoute allowedRole="admin" />}>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="vendors" element={<AdminVendors />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="catalog" element={<AdminCatalog />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Route>
    <Route element={<ProtectedRoute allowedRole="vendor" />}>
      <Route path="/vendor" element={<VendorLayout />}>
        <Route path="dashboard" element={<VendorDashboard />} />
        <Route path="products" element={<VendorProducts />} />
        <Route path="orders" element={<VendorOrders />} />
        <Route path="analytics" element={<VendorAnalytics />} />
        <Route path="payouts" element={<VendorPayouts />} />
      </Route>
    </Route>
    <Route path="*" element={<HomeRedirect />} />
  </Routes></BrowserRouter>
}
