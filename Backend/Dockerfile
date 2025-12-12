# Dockerfile para Hooks AI Backend
FROM python:3.11-slim

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    ffmpeg \
    build-essential \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR /app

# Copiar requirements primero (para cache de Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código de la aplicación
COPY app/ ./app/

# Copiar whisper.cpp y compilar
COPY whisper.cpp/ ./whisper.cpp/
WORKDIR /app/whisper.cpp
RUN mkdir -p build && \
    cd build && \
    cmake .. && \
    make -j$(nproc)

# Descargar modelo de Whisper
WORKDIR /app/whisper.cpp/models
RUN bash download-ggml-model.sh base || echo "Modelo ya descargado o error en descarga"

# Volver al directorio de trabajo
WORKDIR /app

# Crear directorio para descargas
RUN mkdir -p downloads

# Variables de entorno por defecto
ENV WHISPER_CLI_PATH=/app/whisper.cpp/build/bin/whisper-cli
ENV WHISPER_MODEL_PATH=/app/whisper.cpp/models/ggml-base.bin
ENV WHISPER_LANGUAGE=es
ENV DOWNLOAD_DIR=/app/downloads
ENV PORT=8000

# Exponer puerto
EXPOSE 8000

# Comando para iniciar el servidor
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]

