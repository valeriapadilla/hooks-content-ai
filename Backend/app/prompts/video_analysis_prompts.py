"""
Prompts para análisis de videos virales con ChatGPT.
"""


def get_video_analysis_prompt(transcript: str) -> str:
    """
    Genera el prompt completo para analizar un video viral.
    
    Args:
        transcript: Transcripción completa del video
        
    Returns:
        Prompt formateado para ChatGPT
    """
    return f"""Eres un experto en análisis de contenido viral. 
Analiza el siguiente transcript y proporciona SOLO 3 elementos en formato JSON.

TRANSCRIPT DEL VIDEO:
{transcript}

INSTRUCCIONES (SOLO ESTO):

1. HOOK:
   - Identifica el hook más potente del video
   - Proporciona DOS versiones:
     * "general": Versión general y reutilizable (ej: "Deja de desayunar lo mismo siempre, ya aprendí a preparar ____")
     * "used_in_video": Cómo se usa específicamente en este video (ej: "Deja de desayunar lo mismo siempre, ya aprendí a preparar estas tostadas francesas de tiramisú")
   - Tipo de hook (emocional, sorpresa, curiosidad, reto, contradicción, etc.)

2. SCRIPT BASE:
   - Crea un SCRIPT BASE con espacios en blanco (____) que el usuario pueda personalizar
   - NO uses la estructura literal, sino un template genérico reutilizable
   - Ejemplo: "Deja de desayunar lo mismo siempre, ya aprendí a preparar ____. Son muy fáciles de preparar y representan la opción perfecta para el desayuno. Comienza con ____: pon ____ en un bol..."
   - El script debe ser completo pero con espacios personalizables

RESPONDE EN FORMATO JSON CON ESTA ESTRUCTURA SIMPLE:
{{
    "hook": {{
        "general": "Hook general y reutilizable con ____ donde se puede personalizar",
        "used_in_video": "Cómo se usa específicamente en este video",
        "type": "tipo de hook (emocional, sorpresa, curiosidad, reto, contradicción, etc.)"
    }},
    "script_base": "Script completo con espacios en blanco (____) para personalizar. Debe ser la estructura general replicable, no literal del video."
}}

IMPORTANTE:
- Responde SOLO con el JSON, sin texto adicional
- Sé CONCISO y DIRECTO
- El script_base debe ser completo pero con espacios en blanco (____) para personalizar
- NO incluyas información extra, solo lo solicitado
"""

