import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { dashboardPath, getSession } from '../../lib/auth'

export function ProtectedRoute({ allowedRole }) {
  const session = getSession()
  const location = useLocation()

  if (!session?.token || !session?.user?.role) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (allowedRole && session.user.role !== allowedRole) {
    return <Navigate to={dashboardPath(session.user.role)} replace />
  }

  return <Outlet />
}
