"""
Servicio de autenticación con Supabase.
Responsabilidad única: Manejar todas las operaciones de autenticación.
"""
from typing import Dict, Any, Optional
from supabase import create_client, Client
from app.config import settings


class AuthService:
    """Servicio para operaciones de autenticación con Supabase."""
    
    def __init__(self):
        """Inicializa el cliente de Supabase para autenticación."""
        if not settings.SUPABASE_URL:
            raise ValueError("SUPABASE_URL no está configurado")
        if not settings.SUPABASE_KEY:
            raise ValueError("SUPABASE_KEY no está configurado")
        
        # Para autenticación usamos la anon key (no service key)
        # porque necesitamos que RLS funcione correctamente
        self.client: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )
    
    def sign_up(
        self,
        email: str,
        password: str,
        full_name: str
    ) -> Dict[str, Any]:
        """
        Registra un nuevo usuario en Supabase.
        
        Args:
            email: Email del usuario
            password: Contraseña del usuario
            full_name: Nombre completo del usuario
            
        Returns:
            Diccionario con los datos del usuario y sesión
            
        Raises:
            Exception: Si hay error al registrar el usuario
        """
        try:
            # Registrar usuario en auth.users
            response = self.client.auth.sign_up({
                "email": email,
                "password": password,
            })
            
            if not response.user:
                raise Exception("No se pudo crear el usuario")
            
            user_id = response.user.id
            
            # El trigger automáticamente crea el perfil en user_profiles
            # Actualizamos el perfil con el nombre completo
            if full_name:
                self._update_user_profile(user_id, full_name=full_name)
            
            return {
                "user": {
                    "id": user_id,
                    "email": response.user.email,
                },
                "session": {
                    "access_token": response.session.access_token if response.session else None,
                    "refresh_token": response.session.refresh_token if response.session else None,
                }
            }
            
        except Exception as e:
            error_message = str(e)
            # Mejorar mensajes de error comunes
            if "User already registered" in error_message or "already registered" in error_message.lower():
                raise Exception("El usuario ya está registrado con este email")
            elif "Password" in error_message or "password" in error_message:
                raise Exception("La contraseña no cumple con los requisitos mínimos")
            else:
                raise Exception(f"Error al registrar usuario: {error_message}")
    
    def sign_in(self, email: str, password: str) -> Dict[str, Any]:
        """
        Inicia sesión de un usuario en Supabase.
        
        Args:
            email: Email del usuario
            password: Contraseña del usuario
            
        Returns:
            Diccionario con los datos del usuario y sesión
            
        Raises:
            Exception: Si las credenciales son inválidas
        """
        try:
            response = self.client.auth.sign_in_with_password({
                "email": email,
                "password": password,
            })
            
            if not response.user:
                raise Exception("Credenciales inválidas")
            
            return {
                "user": {
                    "id": response.user.id,
                    "email": response.user.email,
                },
                "session": {
                    "access_token": response.session.access_token,
                    "refresh_token": response.session.refresh_token,
                }
            }
            
        except Exception as e:
            error_message = str(e)
            if "Invalid login credentials" in error_message or "invalid" in error_message.lower():
                raise Exception("Email o contraseña incorrectos")
            else:
                raise Exception(f"Error al iniciar sesión: {error_message}")
    
    def get_user(self, access_token: str) -> Dict[str, Any]:
        """
        Obtiene información del usuario desde el token de acceso.
        
        Args:
            access_token: Token de acceso JWT
            
        Returns:
            Diccionario con los datos del usuario
            
        Raises:
            Exception: Si el token es inválido
        """
        try:
            # Crear cliente temporal con el token
            temp_client = create_client(
                settings.SUPABASE_URL,
                settings.SUPABASE_KEY
            )
            temp_client.auth.set_session(
                access_token=access_token,
                refresh_token=""
            )
            
            user_response = temp_client.auth.get_user(access_token)
            
            if not user_response or not user_response.user:
                raise Exception("Token inválido")
            
            return {
                "id": user_response.user.id,
                "email": user_response.user.email,
            }
            
        except Exception as e:
            raise Exception(f"Error al obtener usuario: {str(e)}")
    
    def sign_out(self, access_token: str) -> bool:
        """
        Cierra la sesión del usuario.
        
        Args:
            access_token: Token de acceso JWT
            
        Returns:
            True si se cerró la sesión correctamente
        """
        try:
            # Crear cliente temporal con el token
            temp_client = create_client(
                settings.SUPABASE_URL,
                settings.SUPABASE_KEY
            )
            temp_client.auth.set_session(
                access_token=access_token,
                refresh_token=""
            )
            temp_client.auth.sign_out()
            return True
        except Exception:
            return False
    
    def _update_user_profile(
        self,
        user_id: str,
        full_name: str
    ) -> None:
        """
        Actualiza el perfil del usuario (método privado).
        
        Args:
            user_id: ID del usuario
            full_name: Nombre completo
        """
        try:
            if full_name:
                # Usar service key para actualizar perfil desde el backend
                from app.services.supabase_service import SupabaseService
                supabase_service = SupabaseService()
                supabase_service.client.table("user_profiles").update({
                    "full_name": full_name
                }).eq("id", user_id).execute()
        except Exception:
            # Si falla, no es crítico, el perfil ya existe por el trigger
            pass

