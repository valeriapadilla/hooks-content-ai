import { Paper, Typography, Box, Chip, IconButton, Tooltip } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import type { VideoAnalysisListItem } from '../../types/api'

interface VideoAnalysisCardProps {
  analysis: VideoAnalysisListItem
}

const VideoAnalysisCard = ({ analysis }: VideoAnalysisCardProps) => {
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
      sx={{
        p: 3,
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'rgba(255, 206, 69, 0.3)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(255, 206, 69, 0.1)',
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
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'rgba(255, 206, 69, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
            onClick={() => window.open(analysis.video_url, '_blank')}
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

