import os
import subprocess
from typing import Optional


class TranscriptionService:
    """Servicio responsable de transcribir audio/video a texto usando Whisper."""
    
    def __init__(
        self,
        whisper_cli_path: str = "./whisper.cpp/build/bin/whisper-cli",
        model_path: str = "./whisper.cpp/models/ggml-base.bin",
        language: str = "es"
    ):
        """
        Inicializa el servicio de transcripción.
        
        Args:
            whisper_cli_path: Ruta al ejecutable de whisper-cli
            model_path: Ruta al modelo de Whisper
            language: Idioma para la transcripción
        """
        self.whisper_cli_path = whisper_cli_path
        self.model_path = model_path
        self.language = language
    
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
        Transcribe un archivo de audio a texto usando Whisper.
        
        Args:
            audio_path: Ruta del archivo de audio
            
        Returns:
            Texto transcrito
            
        Raises:
            Exception: Si ocurre un error durante la transcripción
        """
        try:
            result = subprocess.run(
                [
                    self.whisper_cli_path,
                    "-m", self.model_path,
                    "-f", audio_path,
                    "--language", self.language,
                    "-otxt"
                ],
                capture_output=True,
                text=True,
                check=True
            )
            
            transcript = result.stdout.strip()
            
            if not transcript:
                raise Exception("No se pudo generar transcripción")
            
            return transcript
            
        except subprocess.CalledProcessError as e:
            raise Exception(f"Error en whisper-cli: {e.stderr}")
        except FileNotFoundError:
            raise Exception(f"whisper-cli no encontrado en: {self.whisper_cli_path}")
    
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

