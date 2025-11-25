from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import os
import uuid
import yt_dlp

app = FastAPI()

class VideoRequest(BaseModel):
    url: str

# ---------- DESCARGAR VIDEO ----------
def download_instagram_video(url: str):
    video_id = str(uuid.uuid4())
    output_path = f"downloads/{video_id}.mp4"

    ydl_opts = {
        "outtmpl": output_path,
        "quiet": True,
        "no_warnings": True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        return output_path
    except Exception as e:
        raise Exception(f"Error descargando video: {str(e)}")

# ---------- SPEECH TO TEXT (WHISPER) ----------
def transcribe_video(file_path: str):
    audio_path = file_path.replace(".mp4", ".wav")

    # Extraer audio con ffmpeg
    subprocess.run(
        ["ffmpeg", "-i", file_path, "-vn", "-ac", "1", "-ar", "16000", audio_path],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

    # Ejecutar whisper-cli
    result = subprocess.run(
        [
            "./whisper.cpp/build/bin/whisper-cli",  
            "-m", "./whisper.cpp/models/ggml-base.bin",
            "-f", audio_path,
            "--language", "es", 
            "-otxt"                    
        ],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        raise Exception("Error en whisper-cli: " + result.stderr)

    transcript = result.stdout.strip()

    if not transcript:
        raise Exception("No se pudo generar transcripción")

    return transcript


# ---------- ENDPOINT ----------
@app.post("/analyze")
def analyze_video(data: VideoRequest):
    try:
        video_path = download_instagram_video(data.url)
        transcript = transcribe_video(video_path)

        return {
            "status": "success",
            "transcript": transcript
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

