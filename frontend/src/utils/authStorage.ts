import type { AuthData } from '../types/api'

const AUTH_STORAGE_KEY = 'auth'

/**
 * Guarda los datos de autenticación en localStorage.
 */
export const saveAuth = (authData: AuthData): void => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
  } catch (error) {
    console.error('Error al guardar datos de autenticación:', error)
  }
}

/**
 * Obtiene los datos de autenticación del localStorage.
 */
export const getAuth = (): AuthData | null => {
  try {
    const authString = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!authString) return null
    
    return JSON.parse(authString) as AuthData
  } catch (error) {
    console.error('Error al obtener datos de autenticación:', error)
    return null
  }
}

/**
 * Obtiene el ID del usuario actual.
 */
export const getUserId = (): string | null => {
  const auth = getAuth()
  return auth?.user?.id || null
}

/**
 * Obtiene el token de acceso del usuario actual.
 */
export const getAccessToken = (): string | null => {
  const auth = getAuth()
  return auth?.session?.access_token || null
}

/**
 * Elimina los datos de autenticación del localStorage.
 */
export const clearAuth = (): void => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error) {
    console.error('Error al eliminar datos de autenticación:', error)
  }
}

/**
 * Verifica si el usuario está autenticado.
 */
export const isAuthenticated = (): boolean => {
  const auth = getAuth()
  return !!auth?.session?.access_token
}

