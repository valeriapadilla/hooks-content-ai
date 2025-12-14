import { useState, useCallback } from 'react'
import { authService } from '../services/authService'
import { ApiClientError } from '../services/apiClient'
import {
  saveAuth,
  getAuth,
  clearAuth,
  isAuthenticated,
  getUserId,
} from '../utils/authStorage'
import type { SignUpRequest, SignInRequest, AuthData } from '../types/api'

interface UseAuthReturn {
  user: AuthData['user'] | null
  isAuth: boolean
  isLoading: boolean
  error: string | null
  signUp: (data: SignUpRequest) => Promise<void>
  signIn: (data: SignInRequest) => Promise<void>
  signOut: () => void
  getUserId: () => string | null
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<AuthData['user'] | null>(() => {
    const auth = getAuth()
    return auth?.user || null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signUp = useCallback(async (data: SignUpRequest) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const authData = await authService.signUp(data)
      saveAuth(authData)
      setUser(authData.user)
    } catch (err: unknown) {
      let errorMessage = 'Error al registrar usuario'
      
      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signIn = useCallback(async (data: SignInRequest) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const authData = await authService.signIn(data)
      saveAuth(authData)
      setUser(authData.user)
    } catch (err: unknown) {
      let errorMessage = 'Error al iniciar sesión'
      
      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(() => {
    clearAuth()
    setUser(null)
    setError(null)
  }, [])

  return {
    user,
    isAuth: isAuthenticated(),
    isLoading,
    error,
    signUp,
    signIn,
    signOut,
    getUserId,
  }
}

