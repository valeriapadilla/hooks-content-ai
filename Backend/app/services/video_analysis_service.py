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
    
    def generate_hooks(self, idea: str, nicho: Optional[str] = None) -> list[Dict[str, Any]]:
        """
        Genera múltiples versiones de hooks basadas en una idea.
        
        Args:
            idea: Descripción de la idea o guion base
            nicho: Nicho o categoría del contenido (opcional)
            
        Returns:
            Lista de hooks generados con sus scores de retención
            
        Raises:
            Exception: Si hay error al llamar a OpenAI o parsear la respuesta
        """
        if not idea or not idea.strip():
            raise ValueError("La idea no puede estar vacía")
        
        nicho_context = f"\n\nNicho o categoría: {nicho}" if nicho else ""
        
        prompt = f"""Genera 5 versiones diferentes de hooks para la siguiente idea de video.
        
        IDEA: {idea}{nicho_context}
        
        Genera hooks de diferentes tipos:
        1. EMOCIONAL: Conecta con emociones del espectador
        2. RACIONAL: Usa lógica, datos o estadísticas
        3. SORPRESA: Presenta algo inesperado o contraintuitivo
        4. CONTROVERSIAL: Desafía creencias comunes
        5. CURIOSIDAD: Crea una pregunta sin resolver
        
        Para cada hook, analiza su probabilidad de retención basándote en:
        - Claridad y dirección
        - Impacto emocional o intelectual
        - Relevancia para el nicho
        - Uso de técnicas probadas (estadísticas, preguntas, contraste)
        
        Responde en formato JSON con esta estructura:
        {{
            "hooks": [
                {{
                    "text": "Texto del hook",
                    "type": "Emocional|Racional|Sorpresa|Controversial|Curiosidad",
                    "retention_score": 75.5,
                    "description": "Breve explicación de por qué funciona este hook"
                }}
            ]
        }}
        
        Los hooks deben ser:
        - Cortos (1-2 oraciones máximo)
        - Impactantes desde la primera palabra
        - Relevantes para la idea
        - Variados en estilo
        
        IMPORTANTE: Ordena los hooks de mayor a menor retention_score."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un experto en crear hooks virales para videos. Conoces las técnicas más efectivas para capturar atención y generar retención. Siempre respondes en formato JSON válido."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.8,  # Mayor creatividad para hooks variados
                max_tokens=1500
            )
            
            content = response.choices[0].message.content
            
            if not content:
                raise Exception("OpenAI no devolvió contenido")
            
            result = json.loads(content)
            hooks = result.get("hooks", [])
            
            # Ordenar por retention_score (de mayor a menor)
            hooks.sort(key=lambda x: x.get("retention_score", 0), reverse=True)
            
            return hooks
            
        except json.JSONDecodeError as e:
            raise Exception(f"Error al parsear respuesta de OpenAI: {str(e)}")
        except Exception as e:
            raise Exception(f"Error al generar hooks con OpenAI: {str(e)}")

