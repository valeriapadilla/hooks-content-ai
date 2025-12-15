import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Chip,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import BoltIcon from '@mui/icons-material/Bolt'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type { ViralHookListItem } from '../../types/api'

interface ViralHookModalProps {
  open: boolean
  onClose: () => void
  hook: ViralHookListItem | null
}

const ViralHookModal = ({ open, onClose, hook }: ViralHookModalProps) => {
  if (!hook) return null

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible'
    
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    } catch {
      return dateString
    }
  }

  const getTypeColor = (type?: string) => {
    const colors: Record<string, string> = {
      'Emocional': '#FF6B6B',
      'Racional': '#4ECDC4',
      'Sorpresa': '#FFE66D',
      'Controversial': '#FF6B9D',
      'Curiosidad': '#95E1D3',
    }
    return type ? colors[type] || '#FFCE45' : '#FFCE45'
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(17,17,19,0.96)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundImage:
            'radial-gradient(800px at 20% 20%, rgba(255, 206, 69, 0.08), transparent 50%), radial-gradient(700px at 80% 0%, rgba(76, 175, 80, 0.06), transparent 45%)',
          borderRadius: 3,
          maxHeight: '90vh',
          boxShadow: '0 18px 45px rgba(0,0,0,0.5)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'rgba(255, 206, 69, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BoltIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Detalles del Hook
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'text.primary', bgcolor: 'rgba(255,255,255,0.05)' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Type and Score */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            {hook.hook_type && (
              <Chip
                label={hook.hook_type}
                sx={{
                  bgcolor: `${getTypeColor(hook.hook_type)}20`,
                  color: getTypeColor(hook.hook_type),
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  height: 28,
                  border: `1px solid ${getTypeColor(hook.hook_type)}40`,
                }}
              />
            )}
            {hook.retention_score && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 2,
                  py: 0.75,
                  borderRadius: 2,
                  bgcolor: 'rgba(76, 175, 80, 0.15)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                }}
              >
                <ShowChartIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#4CAF50',
                    fontWeight: 700,
                  }}
                >
                  {hook.retention_score.toFixed(0)}% Retención Estimada
                </Typography>
              </Box>
            )}
          </Box>

          {/* Hook Text */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 1.5,
                display: 'block',
              }}
            >
              Texto del Hook
            </Typography>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'rgba(255, 206, 69, 0.08)',
                border: '1px solid',
                borderColor: 'rgba(255, 206, 69, 0.2)',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  lineHeight: 1.7,
                  fontWeight: 500,
                  fontSize: '1.05rem',
                }}
              >
                "{hook.hook_text}"
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

          {/* Idea Input */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 1.5,
                display: 'block',
              }}
            >
              Idea Original
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.primary',
                lineHeight: 1.7,
              }}
            >
              {hook.idea_input}
            </Typography>
          </Box>

          {/* Niche */}
          {hook.niche && (
            <>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    mb: 1.5,
                    display: 'block',
                  }}
                >
                  Nicho
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    lineHeight: 1.7,
                  }}
                >
                  {hook.niche}
                </Typography>
              </Box>
            </>
          )}

          {/* Notes */}
          {hook.notes && (
            <>
              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    mb: 1.5,
                    display: 'block',
                  }}
                >
                  Notas
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {hook.notes}
                </Typography>
              </Box>
            </>
          )}

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />

          {/* Created Date */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon
              sx={{
                fontSize: 16,
                color: 'text.secondary',
                opacity: 0.7,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              Creado: {formatDate(hook.created_at)}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default ViralHookModal
