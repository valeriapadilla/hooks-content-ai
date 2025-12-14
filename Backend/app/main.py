from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import video, auth

app = FastAPI(
    title="Hooks AI Backend",
    description="API para análisis de videos con transcripción",
    version="1.0.0"
)

# Configurar CORS
# Permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # React dev server (por si acaso)
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

# Registrar routers
app.include_router(auth.router)
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
