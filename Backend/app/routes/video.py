from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/video")

class VideoRequest(BaseModel):
    url: str

@router.post("/analyze")
def analyze_video(data: VideoRequest):
    # TODO: descargar el video
    # TODO: extraer audio
    # TODO: usar whisper.cpp
    return {"status": "ok", "url": data.url}
