FROM python:3.11-slim

# Instalar dependencias del sistema (ffmpeg para extraer audio)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Establecer directorio de trabajo
WORKDIR /app

# Copiar requirements e instalar dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY app/ ./app/

# Exponer el puerto (Railway usa la variable PORT)
EXPOSE 8000

# Comando para iniciar la aplicación
# Railway inyecta la variable PORT automáticamente
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}


