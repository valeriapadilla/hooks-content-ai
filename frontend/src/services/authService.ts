/**
 * Servicio de autenticación.
 * Responsabilidad única: Manejar todas las operaciones de autenticación.
 * SRP: Solo se encarga de login, signup y gestión de sesión.
 */
import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../config/api'
import type {
  SignUpRequest,
  SignInRequest,
  AuthResponse,
  AuthData,
} from '../types/api'

class AuthService {
  /**
   * Registra un nuevo usuario.
   */
  async signUp(data: SignUpRequest): Promise<AuthData> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      data
    )
    return response.data
  }

  /**
   * Inicia sesión de un usuario.
   */
  async signIn(data: SignInRequest): Promise<AuthData> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNIN,
      data
    )
    return response.data
  }
}

// Instancia singleton del servicio
export const authService = new AuthService()

