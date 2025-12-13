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
}

// Instancia singleton del servicio
export const videoService = new VideoService()

