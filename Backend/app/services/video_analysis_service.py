import json
from typing import Dict, Any, Optional
from openai import OpenAI
from app.config import settings


class VideoAnalysisService:
    """Servicio para analizar videos virales usando ChatGPT."""
    
    def __init__(self):
        """Inicializa el cliente de OpenAI."""
        if not settings.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY no está configurado")
        
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
    
    def improve_transcript(self, transcript: str) -> str:
        """
        Mejora y corrige el transcript usando ChatGPT.
        
        Args:
            transcript: Transcripción original (puede tener errores)
            
        Returns:
            Transcript mejorado y corregido
        """
        if not transcript or not transcript.strip():
            return transcript
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un experto en corrección de transcripciones de audio. Tu tarea es corregir errores de transcripción, mejorar la gramática y hacer el texto más claro, manteniendo el sentido original."
                    },
                    {
                        "role": "user",
                        "content": f"""Corrige y mejora la siguiente transcripción de un video. 
                        Corrige errores de transcripción, mejora la gramática y haz el texto más claro.
                        Mantén el sentido original y no cambies el contenido.

                        TRANSCRIPCIÓN ORIGINAL:
                        {transcript}

                        Responde SOLO con el texto corregido, sin explicaciones adicionales."""
                    }
                ],
                temperature=0.3,  # Baja temperatura para correcciones precisas
                max_tokens=2000
            )
            
            improved = response.choices[0].message.content.strip()
            return improved if improved else transcript
            
        except Exception:
            # Si falla, devolver el transcript original
            return transcript
    
    def analyze_transcript(self, transcript: str) -> Dict[str, Any]:
        """
        Analiza un transcript de video usando ChatGPT.
        
        Args:
            transcript: Transcripción completa del video (se mejora automáticamente)
            
        Returns:
            Diccionario con el análisis completo (hook, estructura, emociones, plantilla)
            
        Raises:
            Exception: Si hay error al llamar a OpenAI o parsear la respuesta
        """
        if not transcript or not transcript.strip():
            raise ValueError("El transcript no puede estar vacío")
        
        # Paso 1: Mejorar el transcript antes de analizar
        improved_transcript = self.improve_transcript(transcript)
        
        from app.prompts.video_analysis_prompts import get_video_analysis_prompt
        
        # Obtener el prompt con el transcript mejorado
        prompt = get_video_analysis_prompt(improved_transcript)
        
        try:
            # Llamar a ChatGPT
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un experto en análisis de contenido viral, storytelling y creación de videos exitosos. Siempre respondes en formato JSON válido."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},  # Forzar respuesta JSON
                temperature=0.5,  # Menos creatividad para respuestas más directas
                max_tokens=1000  # Menos tokens para respuesta más rápida
            )
            
            # Extraer y parsear la respuesta
            content = response.choices[0].message.content
            
            if not content:
                raise Exception("OpenAI no devolvió contenido")
            
            # Parsear JSON
            analysis = json.loads(content)
            
            return analysis
            
        except json.JSONDecodeError as e:
            raise Exception(f"Error al parsear respuesta de OpenAI: {str(e)}")
        except Exception as e:
            raise Exception(f"Error al analizar transcript con OpenAI: {str(e)}")
    
    def extract_hook(self, transcript: str) -> Optional[Dict[str, Any]]:
        """
        Extrae solo el hook del transcript (método rápido).
        
        Args:
            transcript: Transcripción completa del video
            
        Returns:
            Diccionario con información del hook o None
        """
        try:
            analysis = self.analyze_transcript(transcript)
            return analysis.get("hook")
        except Exception:
            return None
    
    def get_replicable_template(self, transcript: str) -> Optional[Dict[str, Any]]:
        """
        Obtiene solo la plantilla replicable del análisis.
        
        Args:
            transcript: Transcripción completa del video
            
        Returns:
            Diccionario con la plantilla replicable o None
        """
        try:
            analysis = self.analyze_transcript(transcript)
            return analysis.get("replicable_template")
        except Exception:
            return None

