from fastapi import APIRouter, HTTPException
from app.models.video import VideoRequest
from app.services.video_downloader import VideoDownloader
from app.services.transcription_service import TranscriptionService

router = APIRouter(prefix="/video", tags=["video"])

# Inicializar servicios
video_downloader = VideoDownloader()
transcription_service = TranscriptionService()


@router.post("/analyze")
def analyze_video(data: VideoRequest):
    """
    Analiza un video: lo descarga y transcribe su audio.
    
    Args:
        data: Request con la URL del video
        
    Returns:
        Dict con el estado y la transcripción
    """
    try:
        # Descargar video
        video_path = video_downloader.download_video(data.url)
        
        # Transcribir video
        transcript = transcription_service.transcribe_video(video_path)
        
        return {
            "status": "success",
            "transcript": transcript
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
