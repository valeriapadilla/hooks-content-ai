import { Paper, Typography, Box, Chip } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import type { ViralHookListItem } from '../../types/api'

interface ViralHookCardProps {
  hook: ViralHookListItem
  onClick?: () => void
}

const ViralHookCard = ({ hook, onClick }: ViralHookCardProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no disponible'
    
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
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
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: 3,
        background:
          'linear-gradient(150deg, rgba(17,17,21,0.96) 0%, rgba(12,12,16,0.92) 60%, rgba(17,17,21,0.96) 100%), radial-gradient(120% 120% at 15% 0%, rgba(255,206,69,0.09), transparent 45%), radial-gradient(120% 120% at 85% 0%, rgba(103,80,164,0.07), transparent 45%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 22px 55px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,206,69,0.04)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(115deg, rgba(255,206,69,0.1), rgba(76,175,80,0.06))',
          opacity: 0,
          transition: 'opacity 0.25s',
        },
        '&:hover': {
          borderColor: 'rgba(255, 206, 69, 0.45)',
          transform: 'translateY(-4px)',
          boxShadow: '0 26px 65px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,206,69,0.08)',
          '&::before': {
            opacity: 1,
          },
        },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, rgba(255,206,69,0.22), rgba(33,150,243,0.18))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
            }}
          >
            <BoltIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                mb: 0.5,
                display: 'block',
              }}
            >
              Hook
            </Typography>
            {hook.hook_type && (
              <Chip
                label={hook.hook_type}
                size="small"
                sx={{
                  bgcolor: `${getTypeColor(hook.hook_type)}20`,
                  color: getTypeColor(hook.hook_type),
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 20,
                  border: `1px solid ${getTypeColor(hook.hook_type)}40`,
                }}
              />
            )}
          </Box>
        </Box>
        {hook.retention_score && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: 'rgba(76, 175, 80, 0.15)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
            }}
          >
            <ShowChartIcon sx={{ fontSize: 14, color: '#4CAF50' }} />
            <Typography
              variant="caption"
              sx={{
                color: '#4CAF50',
                fontWeight: 700,
                fontSize: '0.75rem',
              }}
            >
              {hook.retention_score.toFixed(0)}%
            </Typography>
          </Box>
        )}
      </Box>

      {/* Hook Text */}
      <Box
        sx={{
          p: 2.5,
          borderRadius: 2,
          bgcolor: 'rgba(255, 206, 69, 0.08)',
          border: '1px solid',
          borderColor: 'rgba(255, 206, 69, 0.2)',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            lineHeight: 1.6,
            fontWeight: 500,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          "{hook.hook_text}"
        </Typography>
      </Box>

      {/* Idea Input */}
      {hook.idea_input && (
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 0.5,
              display: 'block',
            }}
          >
            Idea Original
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.5,
              fontSize: '0.875rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {hook.idea_input}
          </Typography>
        </Box>
      )}

      {/* Niche */}
      {hook.niche && (
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 0.5,
              display: 'block',
            }}
          >
            Nicho
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            {hook.niche}
          </Typography>
        </Box>
      )}

      {/* Footer with Date */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
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
            fontSize: '0.8125rem',
          }}
        >
          {formatDate(hook.created_at)}
        </Typography>
      </Box>
    </Paper>
  )
}

export default ViralHookCard
