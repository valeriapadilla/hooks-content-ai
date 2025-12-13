"""
Rutas de autenticación.
Responsabilidad única: Orquestar las peticiones de autenticación.
"""
from fastapi import APIRouter, HTTPException
from app.models.auth import (
    SignUpRequest,
    SignInRequest,
    SignUpResponse,
    SignInResponse,
    AuthResponse,
    UserResponse,
    SessionResponse
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

# Inicializar servicio de autenticación (SRP: responsabilidad única)
auth_service = AuthService()


@router.post("/signup", response_model=SignUpResponse)
def sign_up(data: SignUpRequest):
    """
    Registra un nuevo usuario en Supabase.
    
    Proceso:
    1. Valida los datos del request
    2. Registra el usuario en Supabase Auth
    3. El trigger automáticamente crea el perfil en user_profiles
    4. Retorna los datos del usuario y tokens de sesión
    
    Args:
        data: Request con email, password y full_name
        
    Returns:
        SignUpResponse con datos del usuario y sesión
        
    Raises:
        HTTPException: Si hay error al registrar
    """
    try:
        # Validar contraseña mínima
        if len(data.password) < 6:
            raise HTTPException(
                status_code=400,
                detail="La contraseña debe tener al menos 6 caracteres"
            )
        
        # Validar que full_name no esté vacío
        if not data.full_name or not data.full_name.strip():
            raise HTTPException(
                status_code=400,
                detail="El nombre completo es requerido"
            )
        
        # Registrar usuario (responsabilidad: AuthService)
        auth_data = auth_service.sign_up(
            email=data.email,
            password=data.password,
            full_name=data.full_name
        )
        
        return SignUpResponse(
            status="success",
            message="Usuario registrado correctamente",
            data=AuthResponse(
                user=UserResponse(
                    id=auth_data["user"]["id"],
                    email=auth_data["user"]["email"]
                ),
                session=SessionResponse(
                    access_token=auth_data["session"]["access_token"],
                    refresh_token=auth_data["session"]["refresh_token"]
                )
            )
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/signin", response_model=SignInResponse)
def sign_in(data: SignInRequest):
    """
    Inicia sesión de un usuario en Supabase.
    
    Proceso:
    1. Valida las credenciales
    2. Autentica el usuario en Supabase
    3. Retorna los datos del usuario y tokens de sesión
    
    Args:
        data: Request con email y password
        
    Returns:
        SignInResponse con datos del usuario y sesión
        
    Raises:
        HTTPException: Si las credenciales son inválidas
    """
    try:
        # Iniciar sesión (responsabilidad: AuthService)
        auth_data = auth_service.sign_in(
            email=data.email,
            password=data.password
        )
        
        return SignInResponse(
            status="success",
            message="Sesión iniciada correctamente",
            data=AuthResponse(
                user=UserResponse(
                    id=auth_data["user"]["id"],
                    email=auth_data["user"]["email"]
                ),
                session=SessionResponse(
                    access_token=auth_data["session"]["access_token"],
                    refresh_token=auth_data["session"]["refresh_token"]
                )
            )
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )

