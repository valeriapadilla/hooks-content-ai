from typing import Optional, Dict, Any
from uuid import UUID
from supabase import create_client, Client
from app.config import settings


class SupabaseService:
    """Servicio para operaciones con Supabase."""
    
    def __init__(self):
        """Inicializa el cliente de Supabase."""
        settings.validate()
        self.client: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY
        )
    
    def save_video_analysis(
        self,
        user_id: str,
        video_url: str,
        transcript: Optional[str] = None,
        hook: Optional[str] = None,
        script_base: Optional[str] = None,
        video_title: Optional[str] = None,
        video_duration: Optional[int] = None,
        platform: Optional[str] = None,
        metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Guarda un análisis de video en Supabase.
        
        Args:
            user_id: ID del usuario
            video_url: URL del video
            transcript: Transcript del video
            hook: Hook identificado
            script_base: Script base replicable
            video_title: Título del video
            video_duration: Duración en segundos
            platform: Plataforma (instagram, youtube, etc.)
            metadata: Metadatos adicionales
            
        Returns:
            Diccionario con el análisis guardado
        """
        data = {
            "user_id": user_id,
            "video_url": video_url,
        }
        
        # Agregar campos opcionales solo si tienen valor
        if transcript:
            data["transcript"] = transcript
        if hook:
            data["hook"] = hook
        if script_base:
            data["script_base"] = script_base
        if video_title:
            data["video_title"] = video_title
        if video_duration:
            data["video_duration"] = video_duration
        if platform:
            data["platform"] = platform
        if metadata:
            data["metadata"] = metadata
        
        result = self.client.table("video_analyses").insert(data).execute()
        
        if not result.data:
            raise Exception("No se pudo guardar el análisis")
        
        return result.data[0]

