import os
import uuid
import yt_dlp
from typing import Optional


class VideoDownloader:
    """Servicio responsable de descargar videos desde URLs."""
    
    def __init__(self, download_dir: Optional[str] = None):
        """
        Inicializa el descargador de videos.
        
        Args:
            download_dir: Directorio donde se guardarán los videos descargados (opcional, usa env var)
        """
        self.download_dir = download_dir or os.getenv("DOWNLOAD_DIR", "downloads")
        self._ensure_download_dir()
    
    def _ensure_download_dir(self):
        """Asegura que el directorio de descargas existe."""
        os.makedirs(self.download_dir, exist_ok=True)
    
    def download_video(self, url: str) -> str:
        """
        Descarga un video desde una URL.
        
        Args:
            url: URL del video a descargar
            
        Returns:
            Ruta del archivo descargado
            
        Raises:
            Exception: Si ocurre un error durante la descarga
        """
        video_id = str(uuid.uuid4())
        output_path = os.path.join(self.download_dir, f"{video_id}.mp4")
        
        ydl_opts = {
            "outtmpl": output_path,
            "quiet": True,
            "no_warnings": True,
        }
        
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                ydl.download([url])
            return output_path
        except Exception as e:
            raise Exception(f"Error descargando video: {str(e)}")

