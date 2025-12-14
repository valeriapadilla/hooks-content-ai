# Hooks AI - Backend

API backend para ayudar a creadores de contenido a construir hooks efectivos y aprender de videos virales mediante análisis inteligente.

## Propósito

Permite a los usuarios analizar videos exitosos para:
- Identificar hooks efectivos y reutilizables
- Generar scripts base personalizables
- Aprender patrones de contenido viral
- Crear hooks propios basados en ideas

## Tecnologías

- **FastAPI**: Framework web para Python
- **Deepgram**: Transcripción de audio a texto
- **OpenAI (ChatGPT)**: Análisis de contenido y generación de hooks
- **Supabase**: Base de datos y autenticación
- **yt-dlp**: Descarga de videos
- **ffmpeg**: Extracción de audio

## Metodologías

El código sigue **SRP (Single Responsibility Principle)** y **DRY (Don't Repeat Yourself)**:

- `routes/`: Endpoints de la API
- `services/`: Lógica de negocio (cada servicio una responsabilidad)
- `models/`: Validación de datos con Pydantic
- `prompts/`: Prompts para ChatGPT separados

## Variables de Entorno

```env
SUPABASE_URL=
SUPABASE_KEY=
OPENAI_API_KEY=
DEEPGRAM_API_KEY=
FRONTEND_URL=
```

