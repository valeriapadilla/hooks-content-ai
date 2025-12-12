-- ============================================
-- Esquema de Base de Datos para Hooks AI
-- Supabase PostgreSQL
-- ============================================

-- ============================================
-- 1. EXTENSIONES
-- ============================================
-- Habilitar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. TABLA: NICHE (NICHOS/CATEGORÍAS)
-- ============================================
-- Para categorizar hooks virales por nicho
CREATE TABLE IF NOT EXISTS niches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50), -- Para iconos en el frontend
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar nichos comunes
INSERT INTO niches (name, description, icon) VALUES
    ('Fitness', 'Ejercicio, entrenamiento, nutrición', '💪'),
    ('Tecnología', 'Apps, gadgets, programación', '💻'),
    ('Negocios', 'Emprendimiento, marketing, finanzas', '💼'),
    ('Cocina', 'Recetas, restaurantes, foodie', '🍳'),
    ('Belleza', 'Maquillaje, skincare, moda', '💄'),
    ('Educación', 'Aprendizaje, cursos, tips', '📚'),
    ('Entretenimiento', 'Humor, memes, entretenimiento', '🎬'),
    ('Viajes', 'Destinos, tips de viaje', '✈️'),
    ('Lifestyle', 'Estilo de vida, productividad', '🌟'),
    ('Otro', 'Otros nichos', '📌')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 3. TABLA: VIDEO_ANALYSES
-- ============================================
-- Para guardar análisis de videos (Feature 1)
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
    is_saved BOOLEAN DEFAULT false, -- Si el usuario guardó este análisis
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar búsquedas
CREATE INDEX IF NOT EXISTS idx_video_analyses_user_id ON video_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_video_analyses_created_at ON video_analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_analyses_saved ON video_analyses(user_id, is_saved) WHERE is_saved = true;

-- ============================================
-- 4. TABLA: VIRAL_HOOKS
-- ============================================
-- Para guardar hooks virales encontrados por nicho (Feature 2)
CREATE TABLE IF NOT EXISTS viral_hooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    niche_id UUID REFERENCES niches(id) ON DELETE SET NULL,
    hook_text TEXT NOT NULL, -- El hook viral encontrado
    source_url TEXT, -- URL del video donde se encontró
    source_platform VARCHAR(50), -- Plataforma de origen
    engagement_score INTEGER, -- Puntuación de engagement (views, likes, etc.)
    metadata JSONB, -- Datos adicionales (views, likes, shares, etc.)
    notes TEXT, -- Notas del usuario sobre este hook
    is_saved BOOLEAN DEFAULT false, -- Si el usuario guardó este hook
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_viral_hooks_user_id ON viral_hooks(user_id);
CREATE INDEX IF NOT EXISTS idx_viral_hooks_niche_id ON viral_hooks(niche_id);
CREATE INDEX IF NOT EXISTS idx_viral_hooks_created_at ON viral_hooks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_viral_hooks_saved ON viral_hooks(user_id, is_saved) WHERE is_saved = true;

-- ============================================
-- 5. TABLA: USER_PROFILES (OPCIONAL)
-- ============================================
-- Para datos adicionales del usuario (opcional, Supabase ya tiene auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE,
    full_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    preferred_niches UUID[], -- Array de nichos favoritos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================
-- Habilitar RLS en todas las tablas
ALTER TABLE video_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_hooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE niches ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. POLÍTICAS RLS: VIDEO_ANALYSES
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
-- 8. POLÍTICAS RLS: VIRAL_HOOKS
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
-- 9. POLÍTICAS RLS: USER_PROFILES
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
-- 10. POLÍTICAS RLS: NICHE
-- ============================================
-- Todos pueden ver los nichos (público)
CREATE POLICY "Anyone can view niches"
    ON niches FOR SELECT
    USING (true);

-- Solo admins pueden modificar nichos (opcional)
-- CREATE POLICY "Only admins can modify niches"
--     ON niches FOR ALL
--     USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- 11. FUNCIONES ÚTILES
-- ============================================
-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

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
-- 12. VISTAS ÚTILES
-- ============================================
-- Vista para análisis guardados del usuario
CREATE OR REPLACE VIEW user_saved_analyses AS
SELECT 
    va.*,
    u.email as user_email
FROM video_analyses va
JOIN auth.users u ON va.user_id = u.id
WHERE va.is_saved = true;

-- Vista para hooks guardados del usuario
CREATE OR REPLACE VIEW user_saved_hooks AS
SELECT 
    vh.*,
    n.name as niche_name,
    n.icon as niche_icon,
    u.email as user_email
FROM viral_hooks vh
LEFT JOIN niches n ON vh.niche_id = n.id
JOIN auth.users u ON vh.user_id = u.id
WHERE vh.is_saved = true;

-- ============================================
-- FIN DEL ESQUEMA
-- ============================================

