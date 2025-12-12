#!/bin/bash

# Script de setup para Hooks AI Backend
# Este script ayuda a configurar el entorno local

set -e

echo "🚀 Configurando Hooks AI Backend..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar Python
echo "📦 Verificando Python..."
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 no está instalado${NC}"
    echo "   Instala Python 3.8 o superior"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo -e "${GREEN}✅ Python ${PYTHON_VERSION} encontrado${NC}"

# Verificar ffmpeg
echo ""
echo "🎬 Verificando ffmpeg..."
if ! command -v ffmpeg &> /dev/null; then
    echo -e "${YELLOW}⚠️  ffmpeg no está instalado${NC}"
    echo "   Instalando ffmpeg..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install ffmpeg
        else
            echo -e "${RED}❌ Homebrew no está instalado${NC}"
            echo "   Instala Homebrew o ffmpeg manualmente"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y ffmpeg
    else
        echo -e "${RED}❌ Sistema operativo no soportado${NC}"
        echo "   Instala ffmpeg manualmente desde https://ffmpeg.org"
        exit 1
    fi
else
    echo -e "${GREEN}✅ ffmpeg encontrado${NC}"
fi

# Crear entorno virtual
echo ""
echo "🐍 Creando entorno virtual..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✅ Entorno virtual creado${NC}"
else
    echo -e "${YELLOW}⚠️  Entorno virtual ya existe${NC}"
fi

# Activar entorno virtual
echo ""
echo "📥 Activando entorno virtual..."
source venv/bin/activate

# Actualizar pip
echo ""
echo "⬆️  Actualizando pip..."
pip install --upgrade pip > /dev/null 2>&1

# Instalar dependencias
echo ""
echo "📚 Instalando dependencias Python..."
pip install -r requirements.txt
echo -e "${GREEN}✅ Dependencias instaladas${NC}"

# Verificar whisper.cpp
echo ""
echo "🎤 Verificando whisper.cpp..."
if [ ! -d "whisper.cpp" ]; then
    echo -e "${YELLOW}⚠️  whisper.cpp no encontrado${NC}"
    echo "   Necesitas clonar whisper.cpp o tenerlo en el directorio"
    echo "   git clone https://github.com/ggerganov/whisper.cpp.git"
else
    echo -e "${GREEN}✅ whisper.cpp encontrado${NC}"
    
    # Verificar si está compilado
    if [ ! -f "whisper.cpp/build/bin/whisper-cli" ]; then
        echo ""
        echo "🔨 Compilando whisper.cpp..."
        cd whisper.cpp
        mkdir -p build
        cd build
        cmake ..
        make -j$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)
        cd ../..
        echo -e "${GREEN}✅ whisper.cpp compilado${NC}"
    else
        echo -e "${GREEN}✅ whisper.cpp ya está compilado${NC}"
    fi
    
    # Verificar modelo
    if [ ! -f "whisper.cpp/models/ggml-base.bin" ]; then
        echo ""
        echo "📥 Descargando modelo de Whisper (esto puede tardar)..."
        cd whisper.cpp/models
        bash download-ggml-model.sh base
        cd ../..
        echo -e "${GREEN}✅ Modelo descargado${NC}"
    else
        echo -e "${GREEN}✅ Modelo encontrado${NC}"
    fi
fi

# Crear directorio de descargas
echo ""
echo "📁 Creando directorio de descargas..."
mkdir -p downloads
echo -e "${GREEN}✅ Directorio creado${NC}"

# Crear .env si no existe
echo ""
if [ ! -f ".env" ]; then
    echo "📝 Creando archivo .env..."
    cat > .env << EOF
# Configuración del Servidor
PORT=8000
HOST=0.0.0.0

# Configuración de Whisper
WHISPER_CLI_PATH=./whisper.cpp/build/bin/whisper-cli
WHISPER_MODEL_PATH=./whisper.cpp/models/ggml-base.bin
WHISPER_LANGUAGE=es

# Directorio de Descargas
DOWNLOAD_DIR=downloads
EOF
    echo -e "${GREEN}✅ Archivo .env creado${NC}"
else
    echo -e "${YELLOW}⚠️  Archivo .env ya existe${NC}"
fi

echo ""
echo -e "${GREEN}🎉 ¡Setup completado!${NC}"
echo ""
echo "Para iniciar el servidor:"
echo "  1. Activa el entorno virtual: source venv/bin/activate"
echo "  2. Inicia el servidor: uvicorn app.main:app --reload --port 8000"
echo ""
echo "O usa Docker:"
echo "  docker-compose up --build"
echo ""

