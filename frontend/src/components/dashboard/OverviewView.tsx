import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import BoltIcon from '@mui/icons-material/Bolt'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { videoService } from '../../services/videoService'
import { getUserId } from '../../utils/authStorage'
import type { VideoAnalysisListItem, ViralHookListItem } from '../../types/api'

const OverviewView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [videoAnalyses, setVideoAnalyses] = useState<VideoAnalysisListItem[]>([])
  const [viralHooks, setViralHooks] = useState<ViralHookListItem[]>([])
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalHooks: 0,
    avgRetention: 0,
    thisWeekHooks: 0,
  })

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    const userId = getUserId()
    if (!userId) return

    setIsLoading(true)
    try {
      const [videosRes, hooksRes] = await Promise.all([
        videoService.getVideoAnalyses(userId, 10),
        videoService.getViralHooks(userId, 10),
      ])

      setVideoAnalyses(videosRes.data)
      setViralHooks(hooksRes.data)

      const avgRetention =
        hooksRes.data.length > 0
          ? hooksRes.data.reduce((sum, h) => sum + (h.retention_score || 0), 0) / hooksRes.data.length
          : 0

      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      const thisWeekHooks = hooksRes.data.filter((h) => new Date(h.created_at) > oneWeekAgo).length

      setStats({
        totalVideos: videosRes.total,
        totalHooks: hooksRes.total,
        avgRetention,
        thisWeekHooks,
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('es-ES', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    } catch {
      return dateString
    }
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 400,
        }}
      >
        <CircularProgress sx={{ color: '#FFCE45' }} />
      </Box>
    )
  }

  const statCards = [
    {
      label: 'Videos Analizados',
      value: stats.totalVideos,
      subtitle: 'Videos guardados',
      icon: VideoLibraryIcon,
      color: '#60A5FA',
      glow: 'rgba(96, 165, 250, 0.4)',
    },
    {
      label: 'Hooks Creados',
      value: stats.totalHooks,
      subtitle: 'Hooks guardados',
      icon: BoltIcon,
      color: '#FFCE45',
      glow: 'rgba(255, 206, 69, 0.4)',
    },
    {
      label: 'Esta Semana',
      value: stats.thisWeekHooks,
      subtitle: 'Hooks nuevos',
      icon: CalendarTodayIcon,
      color: '#34D399',
      glow: 'rgba(52, 211, 153, 0.4)',
    },
    {
      label: 'Retención Promedio',
      value: `${stats.avgRetention.toFixed(0)}%`,
      subtitle: 'Score promedio',
      icon: TrendingUpIcon,
      color: '#A78BFA',
      glow: 'rgba(167, 139, 250, 0.4)',
    },
  ]

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
            Vista General
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.95rem' }}>
            Monitorea tu actividad y rendimiento en tiempo real
          </Typography>
        </Box>

        {/* Live badge */}
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
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#FFCE45',
              boxShadow: '0 0 10px #FFCE45',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 },
              },
            }}
          />
          <Typography sx={{ color: '#FFCE45', fontWeight: 600, fontSize: '0.85rem' }}>
            Actividad en vivo
          </Typography>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          gap: 2.5,
        }}
      >
        {statCards.map((stat, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                border: `1px solid ${stat.color}40`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 60px ${stat.glow}`,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '150px',
                height: '150px',
                background: `radial-gradient(circle, ${stat.glow} 0%, transparent 70%)`,
                opacity: 0.15,
                pointerEvents: 'none',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${stat.color}25 0%, ${stat.color}10 100%)`,
                  border: `1px solid ${stat.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 20px ${stat.glow}`,
                }}
              >
                <stat.icon sx={{ fontSize: 24, color: stat.color }} />
              </Box>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {stat.label}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1,
                mb: 0.5,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {stat.value}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', position: 'relative', zIndex: 1 }}>
              {stat.subtitle}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Activity Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1.4fr 1fr' },
          gap: 3,
        }}
      >
        {/* Recent Hooks */}
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
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
              Hooks Recientes
            </Typography>
          </Box>

          {viralHooks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(255,206,69,0.1) 0%, rgba(255,206,69,0.05) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 36, color: 'rgba(255,206,69,0.4)' }} />
              </Box>
              <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', mb: 0.5 }}>
                No hay hooks guardados
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>
                Genera tu primer hook viral
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {viralHooks.slice(0, 5).map((hook) => (
                <Box
                  key={hook.id}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,206,69,0.3)',
                      transform: 'translateX(4px)',
                      '&::before': {
                        opacity: 1,
                      },
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      background: 'linear-gradient(180deg, #FFCE45, #60A5FA)',
                      opacity: 0,
                      transition: 'opacity 0.25s',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '0.95rem',
                          lineHeight: 1.5,
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        "{hook.hook_text}"
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography
                          sx={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: '0.8rem',
                            px: 1.5,
                            py: 0.25,
                            borderRadius: 2,
                            background: 'rgba(255,255,255,0.05)',
                          }}
                        >
                          {hook.hook_type || 'Hook'}
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
                          {formatDate(hook.created_at)}
                        </Typography>
                      </Box>
                    </Box>
                    {hook.retention_score !== undefined && (
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.75,
                          borderRadius: 2,
                          background:
                            hook.retention_score >= 75
                              ? 'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(52,211,153,0.1) 100%)'
                              : 'linear-gradient(135deg, rgba(255,206,69,0.2) 0%, rgba(255,206,69,0.1) 100%)',
                          border: `1px solid ${hook.retention_score >= 75 ? 'rgba(52,211,153,0.3)' : 'rgba(255,206,69,0.3)'}`,
                        }}
                      >
                        <Typography
                          sx={{
                            color: hook.retention_score >= 75 ? '#34D399' : '#FFCE45',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                          }}
                        >
                          {hook.retention_score.toFixed(0)}%
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Right column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Recent Videos */}
          <Box
            sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              flex: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(96,165,250,0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VideoLibraryIcon sx={{ fontSize: 20, color: '#60A5FA' }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>
                Videos Recientes
              </Typography>
            </Box>

            {videoAnalyses.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <VideoLibraryIcon sx={{ fontSize: 48, color: 'rgba(96,165,250,0.3)', mb: 1 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                  No hay videos analizados
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {videoAnalyses.slice(0, 3).map((video) => (
                  <Box
                    key={video.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.2s',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(96,165,250,0.3)',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {video.video_title || 'Video sin título'}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
                      {formatDate(video.created_at)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Progress */}
          {stats.totalHooks > 0 && (
            <Box
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'white', mb: 3 }}>
                Tu Progreso
              </Typography>

              {[
                { label: 'Emocionales', count: viralHooks.filter((h) => h.hook_type === 'Emocional').length, color: '#FFCE45' },
                { label: 'Racionales', count: viralHooks.filter((h) => h.hook_type === 'Racional').length, color: '#60A5FA' },
                { label: 'Otros', count: viralHooks.filter((h) => !['Emocional', 'Racional'].includes(h.hook_type || '')).length, color: '#A78BFA' },
              ].map((item, idx) => (
                <Box key={idx} sx={{ mb: idx < 2 ? 2 : 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ color: item.color, fontWeight: 700, fontSize: '0.85rem' }}>
                      {item.count}
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
                        width: `${(item.count / stats.totalHooks) * 100}%`,
                        borderRadius: 3,
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                        boxShadow: `0 0 10px ${item.color}40`,
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default OverviewView
