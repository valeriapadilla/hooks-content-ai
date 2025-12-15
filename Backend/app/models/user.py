from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID


class UserProfileCreate(BaseModel):
    """Modelo para crear un perfil de usuario."""
    username: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None


class UserProfileUpdate(BaseModel):
    """Modelo para actualizar un perfil de usuario."""
    username: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None


class UserProfile(BaseModel):
    """Modelo completo de perfil de usuario (respuesta de BD)."""
    id: UUID
    username: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserSignUp(BaseModel):
    """Modelo para registro de usuario."""
    email: EmailStr
    password: str
    username: Optional[str] = None
    full_name: Optional[str] = None


class UserSignIn(BaseModel):
    """Modelo para inicio de sesión."""
    email: EmailStr
    password: str

