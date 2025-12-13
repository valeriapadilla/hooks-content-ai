-- ============================================
-- Esquema de Base de Datos para Hooks AI
-- Supabase PostgreSQL - Versión Simplificada
-- ============================================

-- ============================================
-- 1. EXTENSIONES
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. TABLA: USER_PROFILES
-- ============================================
-- Perfiles de usuario (datos adicionales)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE,
    full_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. TABLA: VIDEO_ANALYSES
-- ============================================
-- Análisis de videos guardados (Feature 1)
CREATE TABLE IF NOT EXISTS video_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    transcript TEXT, -- Transcripción completa del video
    hook TEXT, -- Hook identificado del video
    script_base TEXT, -- Script base para repetir el video
    video_title VARCHAR(500), -- Título del video si está disponible
    video_duration INTEGER, -- Duración en segundos
    platform VARCHAR(50), -- 'instagram', 'youtube', 'tiktok', etc.
    metadata JSONB, -- Datos adicionales (views, likes, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar búsquedas
CREATE INDEX IF NOT EXISTS idx_video_analyses_user_id ON video_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_video_analyses_created_at ON video_analyses(created_at DESC);

-- ============================================
-- 4. TABLA: VIRAL_HOOKS
-- ============================================
-- Hooks generados guardados (Feature 2: Generador de hooks)
CREATE TABLE IF NOT EXISTS viral_hooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    idea_input TEXT NOT NULL, -- Descripción corta de la idea o guion base (input del usuario)
    hook_text TEXT NOT NULL, -- El hook generado
    hook_type VARCHAR(50), -- Tipo de hook: 'emocional', 'racional', 'sorpresa', 'controversial', 'curiosidad', etc.
    retention_score DECIMAL(5,2), -- Probabilidad de retención (0-100 o 0-1, según prefieras)
    niche VARCHAR(100), -- Nicho para el cual se generó el hook (ej: 'Fitness', 'Tecnología')
    metadata JSONB, -- Datos adicionales (versiones alternativas, análisis, etc.)
    notes TEXT, -- Notas del usuario sobre este hook
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_viral_hooks_user_id ON viral_hooks(user_id);
CREATE INDEX IF NOT EXISTS idx_viral_hooks_created_at ON viral_hooks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_viral_hooks_niche ON viral_hooks(niche);
CREATE INDEX IF NOT EXISTS idx_viral_hooks_type ON viral_hooks(hook_type);
CREATE INDEX IF NOT EXISTS idx_viral_hooks_retention_score ON viral_hooks(retention_score DESC);

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================
-- Habilitar RLS en todas las tablas
ALTER TABLE video_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_hooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. POLÍTICAS RLS: VIDEO_ANALYSES
-- ============================================
-- Los usuarios solo pueden ver sus propios análisis
CREATE POLICY "Users can view their own video analyses"
    ON video_analyses FOR SELECT
    USING (auth.uid() = user_id);

-- Los usuarios pueden insertar sus propios análisis
CREATE POLICY "Users can insert their own video analyses"
    ON video_analyses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden actualizar sus propios análisis
CREATE POLICY "Users can update their own video analyses"
    ON video_analyses FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden eliminar sus propios análisis
CREATE POLICY "Users can delete their own video analyses"
    ON video_analyses FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 7. POLÍTICAS RLS: VIRAL_HOOKS
-- ============================================
-- Los usuarios solo pueden ver sus propios hooks
CREATE POLICY "Users can view their own viral hooks"
    ON viral_hooks FOR SELECT
    USING (auth.uid() = user_id);

-- Los usuarios pueden insertar sus propios hooks
CREATE POLICY "Users can insert their own viral hooks"
    ON viral_hooks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden actualizar sus propios hooks
CREATE POLICY "Users can update their own viral hooks"
    ON viral_hooks FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Los usuarios pueden eliminar sus propios hooks
CREATE POLICY "Users can delete their own viral hooks"
    ON viral_hooks FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- 8. POLÍTICAS RLS: USER_PROFILES
-- ============================================
-- Los usuarios pueden ver todos los perfiles (público)
CREATE POLICY "Users can view all profiles"
    ON user_profiles FOR SELECT
    USING (true);

-- Los usuarios solo pueden insertar su propio perfil
CREATE POLICY "Users can insert their own profile"
    ON user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Los usuarios solo pueden actualizar su propio perfil
CREATE POLICY "Users can update their own profile"
    ON user_profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ============================================
-- 9. FUNCIONES ÚTILES
-- ============================================
-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Función para crear perfil automáticamente cuando se crea un usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente al crear usuario
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Triggers para actualizar updated_at
CREATE TRIGGER update_video_analyses_updated_at
    BEFORE UPDATE ON video_analyses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_viral_hooks_updated_at
    BEFORE UPDATE ON viral_hooks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FIN DEL ESQUEMA
-- ============================================
