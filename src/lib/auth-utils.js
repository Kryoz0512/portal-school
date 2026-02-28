// auth utility functions for client-side use

export const getAuthUser = () => {
  if (typeof window === 'undefined') return null
  const user = sessionStorage.getItem('authUser')
  return user ? JSON.parse(user) : null
}

export const getUserRole = () => {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('userRole')
}

export const setAuthUser = (user) => {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('authUser', JSON.stringify(user))
  sessionStorage.setItem('userRole', user.role)
}

export const clearAuth = () => {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem('authUser')
  sessionStorage.removeItem('userRole')
  sessionStorage.removeItem('userEmail')
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  return !!sessionStorage.getItem('authUser')
}
