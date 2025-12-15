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
    
    def generate_hooks(self, idea: str, nicho: Optional[str] = None, platform: Optional[str] = None) -> list[Dict[str, Any]]:
        """
        Genera múltiples versiones de hooks basadas en una idea.
        
        Args:
            idea: Descripción de la idea o guion base
            nicho: Nicho o categoría del contenido (opcional)
            platform: Plataforma destino (tiktok, instagram, twitter, linkedin, facebook)
            
        Returns:
            Lista de hooks generados con sus scores de retención
            
        Raises:
            Exception: Si hay error al llamar a OpenAI o parsear la respuesta
        """
        if not idea or not idea.strip():
            raise ValueError("La idea no puede estar vacía")
        
        # Contexto de plataforma
        platform_context = self._get_platform_context(platform)
        nicho_context = f"\nNicho o categoría: {nicho}" if nicho else ""
        
        prompt = f"""Eres un Viral Hook Creator experto en generar titulares y hooks que capturan atención para redes sociales.

TEMA/IDEA: {idea}{nicho_context}{platform_context}

Analiza el tema considerando:
- Intereses y puntos de dolor de la audiencia objetivo
- Tendencias actuales relacionadas con el tema
- Ángulos únicos o perspectivas que no han sido sobreusadas

Genera 5 hooks virales de diferentes tipos:
1. EMOCIONAL: Conecta con emociones profundas del espectador
2. RACIONAL: Usa lógica, datos o estadísticas convincentes
3. SORPRESA: Presenta algo inesperado o contraintuitivo
4. CONTROVERSIAL: Desafía creencias comunes (sin ser ofensivo)
5. CURIOSIDAD: Crea una pregunta o vacío de información irresistible

Para cada hook, aplica estas técnicas:
- Usa palabras poderosas que evoquen emoción o curiosidad
- Crea sentido de urgencia o FOMO (miedo a perderse algo)
- Haz preguntas provocadoras o declaraciones audaces
- Usa números o estadísticas para credibilidad
- Promete valor o solución a un problema
- Mantenlo conciso y fácil de entender

Para cada hook, evalúa su probabilidad de retención (0-100) basándote en:
- Claridad y dirección del mensaje
- Impacto emocional o intelectual
- Relevancia para el nicho/audiencia
- Uso efectivo de técnicas probadas

Responde en formato JSON:
{{
    "hooks": [
        {{
            "text": "Texto del hook",
            "type": "Emocional|Racional|Sorpresa|Controversial|Curiosidad",
            "retention_score": 75.5,
            "description": "Explicación de por qué funciona este hook"
        }}
    ]
}}

IMPORTANTE: 
- Hooks cortos (1-2 oraciones máximo)
- Impactantes desde la primera palabra
- Ordena de mayor a menor retention_score"""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "Eres un Viral Hook Creator experto en generar titulares y hooks que capturan atención inmediatamente. Conoces las técnicas más efectivas para cada plataforma social. Siempre respondes en formato JSON válido."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.8,
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
    
    def _get_platform_context(self, platform: Optional[str]) -> str:
        """Retorna contexto específico de la plataforma para el prompt."""
        if not platform:
            return ""
        
        platform_guidelines = {
            "tiktok": "\nPLATAFORMA: TikTok\n- Hooks cortos y punchy que crean curiosidad en los primeros 3 segundos\n- Usa lenguaje casual y tendencias actuales\n- Enfócate en el valor inmediato o entretenimiento",
            "instagram": "\nPLATAFORMA: Instagram Reels\n- Hooks visuales y punchy para los primeros 3 segundos\n- Balance entre entretenimiento y valor\n- Considera el formato vertical y scroll rápido",
            "twitter": "\nPLATAFORMA: Twitter/X\n- Hooks concisos y punzantes (considera límite de caracteres)\n- Usa ingenio y relevancia a tendencias\n- Considera hashtags relevantes",
            "linkedin": "\nPLATAFORMA: LinkedIn\n- Tono profesional con enfoque en insights de industria\n- Enfócate en desarrollo profesional o lecciones de negocio\n- Crea hooks que inviten a la reflexión",
            "facebook": "\nPLATAFORMA: Facebook\n- Hooks emocionalmente engaging que fomenten compartir\n- Enfócate en historias y conexión humana\n- Considera audiencia más amplia en edad",
        }
        
        return platform_guidelines.get(platform.lower(), "")

