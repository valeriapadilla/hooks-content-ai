import os
import subprocess
import requests
from app.config import settings


class TranscriptionService:
    """Servicio responsable de transcribir audio/video a texto usando Deepgram."""
    
    def __init__(self):
        """
        Inicializa el servicio de transcripción con Deepgram.
        """
        if not settings.DEEPGRAM_API_KEY:
            raise ValueError("DEEPGRAM_API_KEY no está configurado")
        
        self.api_key = settings.DEEPGRAM_API_KEY
        self.language = os.getenv("DEEPGRAM_LANGUAGE", "es")
        self.model = os.getenv("DEEPGRAM_MODEL", "nova-2")
        self.base_url = "https://api.deepgram.com/v1/listen"
    
    def extract_audio(self, video_path: str) -> str:
        """
        Extrae el audio de un video a formato WAV.
        
        Args:
            video_path: Ruta del archivo de video
            
        Returns:
            Ruta del archivo de audio extraído
            
        Raises:
            Exception: Si ocurre un error durante la extracción
        """
        audio_path = video_path.replace(".mp4", ".wav")
        
        try:
            subprocess.run(
                [
                    "ffmpeg",
                    "-i", video_path,
                    "-vn",  # Sin video
                    "-ac", "1",  # Mono
                    "-ar", "16000",  # Sample rate 16kHz
                    audio_path
                ],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=True
            )
            return audio_path
        except subprocess.CalledProcessError as e:
            raise Exception(f"Error extrayendo audio: {str(e)}")
        except FileNotFoundError:
            raise Exception("ffmpeg no está instalado o no está en el PATH")
    
    def transcribe(self, audio_path: str) -> str:
        """
        Transcribe un archivo de audio a texto usando Deepgram.
        
        Args:
            audio_path: Ruta del archivo de audio
            
        Returns:
            Texto transcrito
            
        Raises:
            Exception: Si ocurre un error durante la transcripción
        """
        try:
            with open(audio_path, "rb") as audio_file:
                headers = {
                    "Authorization": f"Token {self.api_key}",
                    "Content-Type": "audio/wav",
                }
                
                params = {
                    "model": self.model,
                    "language": self.language,
                    "smart_format": "true",
                }
                
                response = requests.post(
                    self.base_url,
                    headers=headers,
                    params=params,
                    data=audio_file,
                    timeout=300
                )
            
            if response.status_code != 200:
                error_detail = response.text
                try:
                    error_json = response.json()
                    if "err" in error_json:
                        error_detail = error_json["err"].get("message", str(error_json))
                    elif "message" in error_json:
                        error_detail = error_json["message"]
                except:
                    pass
                raise Exception(f"Error en Deepgram API ({response.status_code}): {error_detail}")
            
            result = response.json()
            
            transcript = result.get("results", {}).get("channels", [{}])[0].get("alternatives", [{}])[0].get("transcript", "")
            
            if not transcript:
                raise Exception("No se pudo generar transcripción")
            
            return transcript
                
        except requests.exceptions.RequestException as e:
            raise Exception(f"Error en Deepgram API: {str(e)}")
        except Exception as e:
            raise Exception(f"Error en Deepgram: {str(e)}")
    
    def transcribe_video(self, video_path: str) -> str:
        """
        Transcribe un video completo: extrae audio y luego transcribe.
        
        Args:
            video_path: Ruta del archivo de video
            
        Returns:
            Texto transcrito
        """
        audio_path = self.extract_audio(video_path)
        try:
            return self.transcribe(audio_path)
        finally:
            # Limpiar archivo de audio temporal si existe
            if os.path.exists(audio_path):
                os.remove(audio_path)

