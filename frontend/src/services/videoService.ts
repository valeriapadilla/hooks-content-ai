/**
 * Servicio de análisis de video.
 * Responsabilidad única: Manejar todas las operaciones relacionadas con videos.
 * SRP: Solo se encarga de analizar y guardar videos.
 */
import { apiClient } from './apiClient'
import { API_ENDPOINTS } from '../config/api'
import type {
  VideoRequest,
  VideoAnalysisResponse,
  VideoAnalysisSaveRequest,
  VideoAnalysisSaveResponse,
  VideoAnalysisListResponse,
  HookGenerationRequest,
  HookGenerationResponse,
  ViralHookSaveRequest,
  ViralHookSaveResponse,
  ViralHookListResponse,
} from '../types/api'

class VideoService {
  /**
   * Analiza un video desde su URL.
   */
  async analyzeVideo(data: VideoRequest): Promise<VideoAnalysisResponse> {
    return apiClient.post<VideoAnalysisResponse>(
      API_ENDPOINTS.VIDEO.ANALYZE,
      data
    )
  }

  /**
   * Guarda un análisis de video en la base de datos.
   * Requiere autenticación.
   */
  async saveVideoAnalysis(
    data: VideoAnalysisSaveRequest
  ): Promise<VideoAnalysisSaveResponse> {
    return apiClient.post<VideoAnalysisSaveResponse>(
      API_ENDPOINTS.VIDEO.SAVE,
      data,
      { requireAuth: true }
    )
  }

  /**
   * Obtiene los análisis de video guardados por un usuario.
   * Requiere autenticación.
   */
  async getVideoAnalyses(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<VideoAnalysisListResponse> {
    return apiClient.get<VideoAnalysisListResponse>(
      `${API_ENDPOINTS.VIDEO.GET_ANALYSES}?user_id=${userId}&limit=${limit}&offset=${offset}`,
      { requireAuth: true }
    )
  }

  /**
   * Genera hooks virales basados en una idea.
   */
  async generateHooks(data: HookGenerationRequest): Promise<HookGenerationResponse> {
    return apiClient.post<HookGenerationResponse>(
      API_ENDPOINTS.HOOKS.GENERATE,
      data
    )
  }

  /**
   * Guarda un hook viral en la base de datos.
   * Requiere autenticación.
   */
  async saveViralHook(data: ViralHookSaveRequest): Promise<ViralHookSaveResponse> {
    return apiClient.post<ViralHookSaveResponse>(
      API_ENDPOINTS.HOOKS.SAVE,
      data,
      { requireAuth: true }
    )
  }

  /**
   * Obtiene los hooks virales guardados por un usuario.
   * Requiere autenticación.
   */
  async getViralHooks(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<ViralHookListResponse> {
    return apiClient.get<ViralHookListResponse>(
      `${API_ENDPOINTS.HOOKS.LIST}?user_id=${userId}&limit=${limit}&offset=${offset}`,
      { requireAuth: true }
    )
  }
}

// Instancia singleton del servicio
export const videoService = new VideoService()

