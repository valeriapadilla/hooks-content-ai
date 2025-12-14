from pydantic import BaseModel, EmailStr
from typing import Optional


class SignUpRequest(BaseModel):
    """Modelo para solicitud de registro de usuario."""
    email: EmailStr
    password: str
    full_name: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "usuario@ejemplo.com",
                "password": "contraseña123",
                "full_name": "Juan Pérez"
            }
        }


class SignInRequest(BaseModel):
    """Modelo para solicitud de inicio de sesión."""
    email: EmailStr
    password: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "usuario@ejemplo.com",
                "password": "contraseña123"
            }
        }


class UserResponse(BaseModel):
    """Modelo para datos del usuario."""
    id: str
    email: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "email": "usuario@ejemplo.com"
            }
        }


class SessionResponse(BaseModel):
    """Modelo para datos de sesión."""
    access_token: str
    refresh_token: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }


class AuthResponse(BaseModel):
    """Modelo para respuesta de autenticación."""
    user: UserResponse
    session: SessionResponse
    
    class Config:
        json_schema_extra = {
            "example": {
                "user": {
                    "id": "550e8400-e29b-41d4-a716-446655440000",
                    "email": "usuario@ejemplo.com"
                },
                "session": {
                    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                }
            }
        }


class SignUpResponse(BaseModel):
    """Modelo para respuesta de registro."""
    status: str
    message: str
    data: AuthResponse
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "success",
                "message": "Usuario registrado correctamente",
                "data": {
                    "user": {
                        "id": "550e8400-e29b-41d4-a716-446655440000",
                        "email": "usuario@ejemplo.com"
                    },
                    "session": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    }
                }
            }
        }


class SignInResponse(BaseModel):
    """Modelo para respuesta de inicio de sesión."""
    status: str
    message: str
    data: AuthResponse
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "success",
                "message": "Sesión iniciada correctamente",
                "data": {
                    "user": {
                        "id": "550e8400-e29b-41d4-a716-446655440000",
                        "email": "usuario@ejemplo.com"
                    },
                    "session": {
                        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    }
                }
            }
        }

