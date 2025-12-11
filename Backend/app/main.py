from fastapi import FastAPI
from app.routes import video

app = FastAPI(
    title="Hooks AI Backend",
    description="API para análisis de videos con transcripción",
    version="1.0.0"
)

# Registrar routers
app.include_router(video.router)


@app.get("/")
def root():
    """Endpoint raíz de la API."""
    return {
        "message": "Hooks AI Backend API",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    """Endpoint de verificación de salud."""
    return {"status": "healthy"}
