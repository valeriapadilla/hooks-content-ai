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
    hook: Optional[str] = Field(None, description="Hook identificado")
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
    hook: Optional[str] = Field(None, description="Hook identificado")
    script_base: Optional[str] = Field(None, description="Script base")
    platform: Optional[str] = Field(None, description="Plataforma")
    created_at: str = Field(None, description="Fecha de creación")
    updated_at: str = Field(None, description="Fecha de actualización")


class VideoAnalysisListResponse(BaseModel):
    """Response model for list of video analyses."""
    status: str = Field(..., description="Estado de la respuesta")
    data: List[VideoAnalysisListItem] = Field(..., description="Lista de análisis")
    total: int = Field(..., description="Total de análisis")


class HookGenerationRequest(BaseModel):
    """Request model for generating hooks."""
    idea: str = Field(..., description="Idea o guion base para generar hooks")
    nicho: Optional[str] = Field(None, description="Nicho o categoría del contenido")
    platform: Optional[str] = Field(None, description="Plataforma: tiktok, instagram, twitter, linkedin, facebook")


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


# ============================================
# VIRAL HOOKS - Guardar y listar hooks generados
# ============================================

class ViralHookSaveRequest(BaseModel):
    """Request model for saving a viral hook."""
    user_id: str = Field(..., description="UUID del usuario")
    idea_input: str = Field(..., description="Idea o guion base original")
    hook_text: str = Field(..., description="Texto del hook generado")
    hook_type: Optional[str] = Field(None, description="Tipo de hook (emocional, racional, etc)")
    retention_score: Optional[float] = Field(None, description="Score de retención (0-100)")
    niche: Optional[str] = Field(None, description="Nicho del contenido")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Metadata adicional")
    notes: Optional[str] = Field(None, description="Notas del usuario")


class ViralHookSaveResponse(BaseModel):
    """Response model for saving a viral hook."""
    status: str = Field(..., description="Estado de la respuesta")
    message: str = Field(..., description="Mensaje de confirmación")
    hook_id: Optional[str] = Field(None, description="ID del hook guardado")


class ViralHookListItem(BaseModel):
    """Model for a single viral hook item in list."""
    id: str = Field(..., description="ID del hook")
    idea_input: str = Field(..., description="Idea original")
    hook_text: str = Field(..., description="Texto del hook")
    hook_type: Optional[str] = Field(None, description="Tipo de hook")
    retention_score: Optional[float] = Field(None, description="Score de retención")
    niche: Optional[str] = Field(None, description="Nicho")
    notes: Optional[str] = Field(None, description="Notas")
    created_at: Optional[str] = Field(None, description="Fecha de creación")


class ViralHookListResponse(BaseModel):
    """Response model for list of viral hooks."""
    status: str = Field(..., description="Estado de la respuesta")
    data: List[ViralHookListItem] = Field(..., description="Lista de hooks")
    total: int = Field(..., description="Total de hooks")
