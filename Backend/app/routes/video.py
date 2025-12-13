from fastapi import APIRouter, HTTPException
from app.models.video import (
    VideoRequest,
    VideoAnalysisResponse,
    VideoAnalysisSaveRequest,
    VideoAnalysisSaveResponse
)
from app.services.video_downloader import VideoDownloader
from app.services.transcription_service import TranscriptionService
from app.services.video_analysis_service import VideoAnalysisService
from app.services.supabase_service import SupabaseService

router = APIRouter(prefix="/video", tags=["video"])

# Inicializar servicios (SRP: cada servicio tiene una responsabilidad única)
video_downloader = VideoDownloader()
transcription_service = TranscriptionService()
video_analysis_service = VideoAnalysisService()
supabase_service = SupabaseService()


@router.post("/analyze", response_model=VideoAnalysisResponse)
def analyze_video(data: VideoRequest):
    """
    Analiza un video: lo descarga, transcribe y analiza con ChatGPT.
    
    Proceso:
    1. Descarga el video desde la URL
    2. Extrae y transcribe el audio
    3. Analiza el transcript con ChatGPT (hook, estructura, emociones, plantilla)
    
    Args:
        data: Request con la URL del video
        
    Returns:
        VideoAnalysisResponse con transcript y análisis completo
        
    Raises:
        HTTPException: Si hay error en cualquier paso del proceso
    """
    try:
        # Paso 1: Descargar video (responsabilidad: VideoDownloader)
        video_path = video_downloader.download_video(data.url)
        
        # Paso 2: Transcribir video (responsabilidad: TranscriptionService)
        raw_transcript = transcription_service.transcribe_video(video_path)
        
        # Validar que el transcript no esté vacío
        if not raw_transcript or not raw_transcript.strip():
            raise HTTPException(
                status_code=400,
                detail="No se pudo generar la transcripción del video"
            )
        
        # Paso 3: Mejorar transcript (responsabilidad: VideoAnalysisService)
        improved_transcript = video_analysis_service.improve_transcript(raw_transcript)
        
        # Paso 4: Analizar transcript mejorado con ChatGPT (responsabilidad: VideoAnalysisService)
        analysis = video_analysis_service.analyze_transcript(improved_transcript)
        
        # Retornar respuesta simplificada
        return VideoAnalysisResponse(
            status="success",
            transcript=improved_transcript,  # Transcript mejorado
            hook=analysis.get("hook", {}),  # Solo el hook
            script_base=analysis.get("script_base", "")  # Solo el script base
        )
    
    except HTTPException:
        # Re-lanzar HTTPException sin modificar
        raise
    except ValueError as e:
        # Errores de validación
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Otros errores inesperados
        raise HTTPException(
            status_code=500,
            detail=f"Error al analizar el video: {str(e)}"
        )


@router.post("/save", response_model=VideoAnalysisSaveResponse)
def save_video_analysis(data: VideoAnalysisSaveRequest):
    """
    Guarda un análisis de video en Supabase.
    
    Este endpoint guarda el análisis completo de un video para que el usuario
    pueda acceder a su historial más tarde.
    
    Args:
        data: Request con los datos del análisis a guardar
            - user_id: UUID del usuario (obtenido del token de autenticación)
            - video_url: URL del video analizado
            - transcript: Transcript mejorado del video
            - hook: Hook identificado (texto general)
            - script_base: Script base replicable con espacios en blanco
            - video_title, video_duration, platform, metadata: Opcionales
            
    Returns:
        VideoAnalysisSaveResponse con el ID del análisis guardado
        
    Raises:
        HTTPException: Si hay error al guardar
    """
    try:
        # Validar que user_id y video_url estén presentes
        if not data.user_id:
            raise HTTPException(
                status_code=400,
                detail="user_id es requerido"
            )
        if not data.video_url:
            raise HTTPException(
                status_code=400,
                detail="video_url es requerido"
            )
        
        # Guardar en Supabase (responsabilidad: SupabaseService)
        saved_analysis = supabase_service.save_video_analysis(
            user_id=data.user_id,
            video_url=data.video_url,
            transcript=data.transcript,
            hook=data.hook,
            script_base=data.script_base,
            video_title=data.video_title,
            video_duration=data.video_duration,
            platform=data.platform,
            metadata=data.metadata
        )
        
        return VideoAnalysisSaveResponse(
            status="success",
            message="Análisis guardado correctamente",
            analysis_id=saved_analysis.get("id")
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error al guardar el análisis: {str(e)}"
        )
