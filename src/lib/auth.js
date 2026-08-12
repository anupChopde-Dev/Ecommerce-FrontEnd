const SESSION_KEY = 'marketly_session'

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

// Replace this with your API response handling when the backend is connected.
export function saveSession(response) {
  const session = {
    token: response.token || 'demo-token',
    user: response.user || { name: 'Marketly User', role: response.role },
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function dashboardPath(role) {
  return role === 'admin' ? '/admin/dashboard' : '/vendor/dashboard'
}
