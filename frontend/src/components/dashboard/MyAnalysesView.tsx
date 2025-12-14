import { useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import BoltIcon from '@mui/icons-material/Bolt'
import { videoService } from '../../services/videoService'
import { ApiClientError } from '../../services/apiClient'
import { getUserId } from '../../utils/authStorage'
import VideoAnalysisCard from './VideoAnalysisCard'
import VideoAnalysisModal from './VideoAnalysisModal'
import type { VideoAnalysisListItem } from '../../types/api'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

const MyAnalysesView = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [videoAnalyses, setVideoAnalyses] = useState<VideoAnalysisListItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnalysis, setSelectedAnalysis] = useState<VideoAnalysisListItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const loadVideoAnalyses = async () => {
    const userId = getUserId()
    if (!userId) {
      setError('Debes iniciar sesión para ver tus análisis')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await videoService.getVideoAnalyses(userId)
      setVideoAnalyses(response.data)
    } catch (err) {
      let errorMessage = 'Error al cargar los análisis'
      
      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      console.error('Error al cargar análisis:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 0) {
      loadVideoAnalyses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleCardClick = (analysis: VideoAnalysisListItem) => {
    setSelectedAnalysis(analysis)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedAnalysis(null)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
          }}
        >
          Mis Análisis
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.9375rem',
          }}
        >
          Revisa tu historial de videos analizados y hooks generados
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            '& .MuiTab-root': {
              color: 'text.secondary',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.9375rem',
              minHeight: 64,
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <Tab
            icon={<VideoLibraryIcon sx={{ fontSize: 20 }} />}
            iconPosition="start"
            label="Videos Analizados"
          />
          <Tab
            icon={<BoltIcon sx={{ fontSize: 20 }} />}
            iconPosition="start"
            label="Hooks Generados"
          />
        </Tabs>

        <Box sx={{ p: { xs: 3, md: 4 } }}>
          <TabPanel value={activeTab} index={0}>
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 8,
                }}
              >
                <CircularProgress size={40} />
              </Box>
            ) : error ? (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 0, 0, 0.25)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {error}
                </Typography>
              </Paper>
            ) : videoAnalyses.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                }}
              >
                <VideoLibraryIcon
                  sx={{
                    fontSize: 64,
                    color: 'text.secondary',
                    opacity: 0.5,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 1,
                  }}
                >
                  No tienes videos analizados aún
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    opacity: 0.7,
                  }}
                >
                  Analiza y guarda videos para verlos aquí
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {videoAnalyses.map((analysis) => (
                  <VideoAnalysisCard
                    key={analysis.id}
                    analysis={analysis}
                    onClick={() => handleCardClick(analysis)}
                  />
                ))}
              </Box>
            )}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
              }}
            >
              <BoltIcon
                sx={{
                  fontSize: 64,
                  color: 'text.secondary',
                  opacity: 0.5,
                  mb: 2,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 1,
                }}
              >
                No tienes hooks generados aún
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  opacity: 0.7,
                }}
              >
                Genera hooks para verlos aquí
              </Typography>
            </Box>
          </TabPanel>
        </Box>
      </Paper>

      <VideoAnalysisModal
        open={modalOpen}
        onClose={handleCloseModal}
        analysis={selectedAnalysis}
      />
    </Box>
  )
}

export default MyAnalysesView

