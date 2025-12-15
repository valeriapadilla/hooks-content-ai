import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import CheckIcon from '@mui/icons-material/Check'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BoltIcon from '@mui/icons-material/Bolt'

import { videoService } from '../../services/videoService'
import { ApiClientError } from '../../services/apiClient'
import { getUserId } from '../../utils/authStorage'
import type { GeneratedHook } from '../../types/api'

const PLATFORMS = [
  { value: '', label: 'Todas las plataformas' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram Reels' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
]

const HOOK_TYPE_CONFIG: Record<string, { color: string; glow: string }> = {
  Emocional: { color: '#F472B6', glow: 'rgba(244,114,182,0.4)' },
  Racional: { color: '#60A5FA', glow: 'rgba(96,165,250,0.4)' },
  Sorpresa: { color: '#FBBF24', glow: 'rgba(251,191,36,0.4)' },
  Controversial: { color: '#F87171', glow: 'rgba(248,113,113,0.4)' },
  Curiosidad: { color: '#A78BFA', glow: 'rgba(167,139,250,0.4)' },
}

const GenerateHooksView = () => {
  const [idea, setIdea] = useState('')
  const [nicho, setNicho] = useState('')
  const [platform, setPlatform] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hooks, setHooks] = useState<GeneratedHook[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [savedIndex, setSavedIndex] = useState<number | null>(null)
  const [savingIndex, setSavingIndex] = useState<number | null>(null)

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Por favor ingresa una idea o descripción')
      return
    }

    setIsLoading(true)
    setError(null)
    setHooks([])

    try {
      const response = await videoService.generateHooks({
        idea: idea.trim(),
        nicho: nicho.trim() || undefined,
        platform: platform || undefined,
      })
      setHooks(response.hooks)
    } catch (err) {
      let errorMessage = 'Error al generar hooks'
      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleSave = async (hook: GeneratedHook, index: number) => {
    const userId = getUserId()
    if (!userId) {
      setError('Debes iniciar sesión para guardar hooks')
      return
    }

    setSavingIndex(index)
    try {
      await videoService.saveViralHook({
        user_id: userId,
        idea_input: idea,
        hook_text: hook.text,
        hook_type: hook.type,
        retention_score: hook.retention_score,
        niche: nicho || undefined,
      })
      setSavedIndex(index)
      setTimeout(() => setSavedIndex(null), 2000)
    } catch (err) {
      let errorMessage = 'Error al guardar el hook'
      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      }
      setError(errorMessage)
    } finally {
      setSavingIndex(null)
    }
  }

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      background: 'rgba(255,255,255,0.02)',
      transition: 'all 0.2s',
      '&:hover': {
        background: 'rgba(255,255,255,0.04)',
      },
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&.Mui-focused fieldset': { borderColor: '#FFCE45', borderWidth: 1 },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.5)',
      '&.Mui-focused': { color: '#FFCE45' },
    },
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Generar Hooks
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.95rem' }}>
            Crea hooks virales con IA y scores de retención estimados
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,206,69,0.15) 0%, rgba(255,206,69,0.05) 100%)',
            border: '1px solid rgba(255,206,69,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 18, color: '#FFCE45' }} />
          <Typography sx={{ color: '#FFCE45', fontWeight: 600, fontSize: '0.85rem' }}>
            IA Generativa
          </Typography>
        </Box>
      </Box>

      {/* Input Section */}
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          position: 'relative',
          background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,206,69,0.5), transparent)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,206,69,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, position: 'relative', zIndex: 1 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Tu idea o guion base"
            placeholder="Ej: Cómo ganar $1000 al mes como freelancer sin experiencia previa..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            sx={inputStyle}
          />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              label="Nicho (opcional)"
              placeholder="Ej: Finanzas, Fitness, Tech..."
              value={nicho}
              onChange={(e) => setNicho(e.target.value)}
              sx={{ flex: 1, minWidth: 180, ...inputStyle }}
            />

            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel sx={{ color: 'rgba(255,255,255,0.5)', '&.Mui-focused': { color: '#FFCE45' } }}>
                Plataforma
              </InputLabel>
              <Select
                value={platform}
                label="Plataforma"
                onChange={(e) => setPlatform(e.target.value)}
                sx={{
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.02)',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  '&.Mui-focused fieldset': { borderColor: '#FFCE45' },
                }}
              >
                {PLATFORMS.map((p) => (
                  <MenuItem key={p.value} value={p.value}>
                    {p.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={isLoading || !idea.trim()}
            sx={{
              py: 1.75,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1rem',
              bgcolor: '#FFCE45',
              color: '#000',
              boxShadow: '0 12px 32px rgba(255,206,69,0.3)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: '#e6b93d',
                boxShadow: '0 16px 40px rgba(255,206,69,0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                bgcolor: 'rgba(255,206,69,0.3)',
                color: 'rgba(0,0,0,0.5)',
              },
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: '#000' }} />
                Generando...
              </>
            ) : (
              <>
                <BoltIcon sx={{ mr: 1 }} />
                Generar Hooks
              </>
            )}
          </Button>
        </Box>

        {error && (
          <Box
            sx={{
              mt: 2.5,
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(244,67,54,0.15) 0%, rgba(244,67,54,0.05) 100%)',
              border: '1px solid rgba(244,67,54,0.3)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography sx={{ color: '#f44336', fontSize: '0.9rem', fontWeight: 500 }}>
              {error}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Results Section */}
      {hooks.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(255,206,69,0.2) 0%, rgba(255,206,69,0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BoltIcon sx={{ fontSize: 20, color: '#FFCE45' }} />
            </Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>
              Hooks Generados
            </Typography>
            <Chip
              label={`${hooks.length} resultados`}
              size="small"
              sx={{
                bgcolor: 'rgba(255,206,69,0.15)',
                color: '#FFCE45',
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          </Box>

          {hooks.map((hook, index) => {
            const typeConfig = HOOK_TYPE_CONFIG[hook.type] || { color: '#888', glow: 'rgba(136,136,136,0.4)' }

            return (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  position: 'relative',
                  background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    border: `1px solid ${typeConfig.color}40`,
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 40px ${typeConfig.glow}`,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${typeConfig.color}60, transparent)`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Chip
                      label={hook.type}
                      size="small"
                      sx={{
                        bgcolor: `${typeConfig.color}25`,
                        color: typeConfig.color,
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        border: `1px solid ${typeConfig.color}40`,
                      }}
                    />
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.85rem' }}>
                      #{index + 1}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title={copiedIndex === index ? '¡Copiado!' : 'Copiar'}>
                      <IconButton
                        size="small"
                        onClick={() => handleCopy(hook.text, index)}
                        sx={{
                          color: copiedIndex === index ? '#34D399' : 'rgba(255,255,255,0.5)',
                          transition: 'all 0.2s',
                          '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                        }}
                      >
                        {copiedIndex === index ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={savedIndex === index ? '¡Guardado!' : 'Guardar'}>
                      <IconButton
                        size="small"
                        onClick={() => handleSave(hook, index)}
                        disabled={savingIndex === index}
                        sx={{
                          color: savedIndex === index ? '#34D399' : 'rgba(255,255,255,0.5)',
                          transition: 'all 0.2s',
                          '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                        }}
                      >
                        {savingIndex === index ? (
                          <CircularProgress size={16} sx={{ color: 'inherit' }} />
                        ) : savedIndex === index ? (
                          <CheckIcon fontSize="small" />
                        ) : (
                          <BookmarkIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Typography
                  sx={{
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  "{hook.text}"
                </Typography>

                {hook.description && (
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', mb: 2 }}>
                    {hook.description}
                  </Typography>
                )}

                {/* Retention Score */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                      Retención estimada
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: hook.retention_score >= 80 ? '#34D399' : hook.retention_score >= 60 ? '#FBBF24' : '#F87171',
                      }}
                    >
                      {hook.retention_score.toFixed(0)}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      background: 'rgba(255,255,255,0.06)',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        height: '100%',
                        width: `${hook.retention_score}%`,
                        borderRadius: 3,
                        background:
                          hook.retention_score >= 80
                            ? 'linear-gradient(90deg, #34D399, #34D39980)'
                            : hook.retention_score >= 60
                              ? 'linear-gradient(90deg, #FBBF24, #FBBF2480)'
                              : 'linear-gradient(90deg, #F87171, #F8717180)',
                        boxShadow:
                          hook.retention_score >= 80
                            ? '0 0 10px rgba(52,211,153,0.4)'
                            : hook.retention_score >= 60
                              ? '0 0 10px rgba(251,191,36,0.4)'
                              : '0 0 10px rgba(248,113,113,0.4)',
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default GenerateHooksView
