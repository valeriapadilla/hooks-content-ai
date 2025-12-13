"""
Configuración de la aplicación.
Carga variables de entorno y proporciona configuración centralizada.
"""
import os
from typing import Optional
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()


class Settings:
    """Configuración de la aplicación."""
    
    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_SERVICE_KEY: Optional[str] = os.getenv("SUPABASE_SERVICE_KEY")
    
    # Whisper
    WHISPER_CLI_PATH: str = os.getenv(
        "WHISPER_CLI_PATH",
        "./whisper.cpp/build/bin/whisper-cli"
    )
    WHISPER_MODEL_PATH: str = os.getenv(
        "WHISPER_MODEL_PATH",
        "./whisper.cpp/models/ggml-base.bin"
    )
    WHISPER_LANGUAGE: str = os.getenv("WHISPER_LANGUAGE", "es")
    
    # Servidor
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")
    
    # Descargas
    DOWNLOAD_DIR: str = os.getenv("DOWNLOAD_DIR", "downloads")
    
    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
    
    @classmethod
    def validate(cls) -> bool:
        """
        Valida que las configuraciones requeridas estén presentes.
        
        Returns:
            True si todas las configuraciones requeridas están presentes
        """
        if not cls.SUPABASE_URL:
            raise ValueError("SUPABASE_URL no está configurado")
        if not cls.SUPABASE_KEY:
            raise ValueError("SUPABASE_KEY no está configurado")
        if not cls.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY no está configurado")
        return True


# Instancia global de configuración
settings = Settings()

