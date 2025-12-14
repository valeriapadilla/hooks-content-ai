"""
Pydantic models for video-related API endpoints.
"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class VideoRequest(BaseModel):
    """Request model for video analysis."""
    url: str = Field(..., description="URL del video a analizar")


class VideoAnalysisResponse(BaseModel):
    """Response model for video analysis."""
    status: str = Field(..., description="Estado de la respuesta")
    transcript: str = Field(..., description="Transcripción mejorada del video")
    hook: Dict[str, Any] = Field(..., description="Hook identificado en el video")
    script_base: str = Field(..., description="Script base replicable")


class VideoAnalysisSaveRequest(BaseModel):
    """Request model for saving video analysis."""
    user_id: str = Field(..., description="UUID del usuario")
    video_url: str = Field(..., description="URL del video analizado")
    transcript: Optional[str] = Field(None, description="Transcripción del video")
    hook: Optional[Dict[str, Any]] = Field(None, description="Hook identificado")
    script_base: Optional[str] = Field(None, description="Script base")
    video_title: Optional[str] = Field(None, description="Título del video")
    video_duration: Optional[int] = Field(None, description="Duración en segundos")
    platform: Optional[str] = Field(None, description="Plataforma (YouTube, TikTok, etc)")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Metadata adicional")


class VideoAnalysisSaveResponse(BaseModel):
    """Response model for saving video analysis."""
    status: str = Field(..., description="Estado de la respuesta")
    message: str = Field(..., description="Mensaje de confirmación")
    analysis_id: Optional[str] = Field(None, description="ID del análisis guardado")


class VideoAnalysisListItem(BaseModel):
    """Model for a single video analysis item in list."""
    id: str = Field(..., description="ID del análisis")
    video_url: str = Field(..., description="URL del video")
    video_title: Optional[str] = Field(None, description="Título del video")
    transcript: Optional[str] = Field(None, description="Transcripción")
    hook: Optional[Dict[str, Any]] = Field(None, description="Hook identificado")
    script_base: Optional[str] = Field(None, description="Script base")
    platform: Optional[str] = Field(None, description="Plataforma")
    created_at: Optional[str] = Field(None, description="Fecha de creación")
    updated_at: Optional[str] = Field(None, description="Fecha de actualización")


class VideoAnalysisListResponse(BaseModel):
    """Response model for list of video analyses."""
    status: str = Field(..., description="Estado de la respuesta")
    data: List[VideoAnalysisListItem] = Field(..., description="Lista de análisis")
    total: int = Field(..., description="Total de análisis")


class HookGenerationRequest(BaseModel):
    """Request model for generating hooks."""
    idea: str = Field(..., description="Idea o guion base para generar hooks")
    nicho: Optional[str] = Field(None, description="Nicho o categoría del contenido")


class GeneratedHook(BaseModel):
    """Model for a generated hook."""
    text: str = Field(..., description="Texto del hook")
    type: str = Field(..., description="Tipo de hook (emocional, racional, etc)")
    retention_score: float = Field(..., description="Score de retención estimado (0-100)")
    description: Optional[str] = Field(None, description="Descripción del hook")


class HookGenerationResponse(BaseModel):
    """Response model for hook generation."""
    status: str = Field(..., description="Estado de la respuesta")
    hooks: List[GeneratedHook] = Field(..., description="Lista de hooks generados")
