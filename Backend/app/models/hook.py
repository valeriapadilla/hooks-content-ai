from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID
from decimal import Decimal


class ViralHookCreate(BaseModel):
    """Modelo para crear un hook viral."""
    idea_input: str
    hook_text: str
    hook_type: Optional[str] = None  # 'emocional', 'racional', 'sorpresa', 'controversial', 'curiosidad', etc.
    retention_score: Optional[float] = None  # 0-100
    niche: Optional[str] = None  # 'Fitness', 'Tecnología', etc.
    metadata: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None


class ViralHookUpdate(BaseModel):
    """Modelo para actualizar un hook viral."""
    hook_text: Optional[str] = None
    hook_type: Optional[str] = None
    retention_score: Optional[float] = None
    niche: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None


class ViralHook(BaseModel):
    """Modelo completo de hook viral (respuesta de BD)."""
    id: UUID
    user_id: UUID
    idea_input: str
    hook_text: str
    hook_type: Optional[str] = None
    retention_score: Optional[float] = None
    niche: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class HookGenerateRequest(BaseModel):
    """Modelo para la petición de generación de hooks."""
    idea_input: str
    niche: Optional[str] = None
    hook_types: Optional[list[str]] = None  # Tipos de hooks a generar


class HookGenerateResponse(BaseModel):
    """Modelo para la respuesta de generación de hooks."""
    hooks: list[ViralHookCreate]  # Múltiples versiones del hook

