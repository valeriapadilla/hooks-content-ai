import { Paper, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type { VideoAnalysisListItem } from '../../types/api'

interface VideoAnalysisCardProps {
  analysis: VideoAnalysisListItem
  onClick?: () => void
}

const VideoAnalysisCard = ({ analysis, onClick }: VideoAnalysisCardProps) => {
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

  const getPlatformLabel = (platform?: string | null) => {
    if (!platform) return 'Video'
    
    const platforms: Record<string, string> = {
      youtube: 'YouTube',
      instagram: 'Instagram',
      tiktok: 'TikTok',
      facebook: 'Facebook',
    }
    
    return platforms[platform.toLowerCase()] || platform
  }

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: 3,
        background:
          'linear-gradient(145deg, rgba(18,18,22,0.95) 0%, rgba(12,12,16,0.92) 60%, rgba(18,18,22,0.95) 100%), radial-gradient(120% 120% at 20% 0%, rgba(255,206,69,0.08), transparent 45%), radial-gradient(120% 120% at 80% 0%, rgba(33,150,243,0.06), transparent 45%)',
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
          background: 'linear-gradient(120deg, rgba(255,206,69,0.08), rgba(33,150,243,0.05))',
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
            <VideoLibraryIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {analysis.video_title || 'Video sin título'}
            </Typography>
            <Chip
              label={getPlatformLabel(analysis.platform)}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 206, 69, 0.15)',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 20,
              }}
            />
          </Box>
        </Box>
        <Tooltip title="Abrir video">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              window.open(analysis.video_url, '_blank')
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'rgba(255, 206, 69, 0.1)',
              },
            }}
          >
            <OpenInNewIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {analysis.hook && (
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'rgba(255, 206, 69, 0.08)',
            border: '1px solid',
            borderColor: 'rgba(255, 206, 69, 0.2)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              mb: 1,
              display: 'block',
            }}
          >
            Hook
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.primary',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {analysis.hook}
          </Typography>
        </Box>
      )}

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
          {formatDate(analysis.created_at)}
        </Typography>
      </Box>
    </Paper>
  )
}

export default VideoAnalysisCard

