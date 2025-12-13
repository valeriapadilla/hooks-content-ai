import { API_BASE_URL } from '../config/api'

export interface ApiError {
  detail: string
  status?: number
}

export class ApiClientError extends Error {
  status: number
  detail: string

  constructor(message: string, status: number, detail: string) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.detail = detail
  }
}

interface RequestOptions extends RequestInit {
  requireAuth?: boolean
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Obtiene el token de acceso del localStorage.
   */
  private getAccessToken(): string | null {
    try {
      const auth = localStorage.getItem('auth')
      if (!auth) return null
      
      const authData = JSON.parse(auth)
      return authData?.session?.access_token || null
    } catch {
      return null
    }
  }

  /**
   * Construye los headers para la petición.
   */
  private buildHeaders(options: RequestOptions): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Agregar token de autenticación si es requerido
    if (options.requireAuth) {
      const token = this.getAccessToken()
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
    }

    // Permitir headers personalizados
    if (options.headers) {
      Object.assign(headers, options.headers)
    }

    return headers
  }

  /**
   * Maneja errores de la respuesta.
   */
  private async handleError(response: Response): Promise<never> {
    let errorDetail = 'Error desconocido'
    
    try {
      const errorData = await response.json()
      errorDetail = errorData.detail || errorData.message || errorDetail
    } catch {
      errorDetail = response.statusText || errorDetail
    }

    throw new ApiClientError(
      `Error ${response.status}: ${errorDetail}`,
      response.status,
      errorDetail
    )
  }

  /**
   * Realiza una petición HTTP genérica.
   */
  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers = this.buildHeaders(options)

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        await this.handleError(response)
      }

      // Si la respuesta está vacía, retornar objeto vacío
      const contentType = response.headers.get('content-type')
      if (!contentType?.includes('application/json')) {
        return {} as T
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      }
      
      // Error de red u otro error
      throw new ApiClientError(
        'Error de conexión con el servidor',
        0,
        error instanceof Error ? error.message : 'Error desconocido'
      )
    }
  }

  /**
   * Método GET.
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    })
  }

  /**
   * Método POST.
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Método PUT.
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /**
   * Método DELETE.
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    })
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient(API_BASE_URL)

