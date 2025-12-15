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
import ViralHookCard from './ViralHookCard'
import ViralHookModal from './ViralHookModal'
import type { VideoAnalysisListItem, ViralHookListItem } from '../../types/api'

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
  const [viralHooks, setViralHooks] = useState<ViralHookListItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnalysis, setSelectedAnalysis] = useState<VideoAnalysisListItem | null>(null)
  const [selectedHook, setSelectedHook] = useState<ViralHookListItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [hookModalOpen, setHookModalOpen] = useState(false)

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

  const loadViralHooks = async () => {
    const userId = getUserId()
    if (!userId) {
      setError('Debes iniciar sesión para ver tus hooks')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await videoService.getViralHooks(userId)
      setViralHooks(response.data)
    } catch (err) {
      let errorMessage = 'Error al cargar los hooks'
      
      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      console.error('Error al cargar hooks:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 0) {
      loadVideoAnalyses()
    } else if (activeTab === 1) {
      loadViralHooks()
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

  const handleHookClick = (hook: ViralHookListItem) => {
    setSelectedHook(hook)
    setHookModalOpen(true)
  }

  const handleCloseHookModal = () => {
    setHookModalOpen(false)
    setSelectedHook(null)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, mb: 0.25, color: 'white', letterSpacing: '-0.01em' }}
          >
            Mis Análisis
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.95rem' }}>
            Historial de videos y hooks guardados para tu cuenta.
          </Typography>
        </Box>
        <Box
          sx={{
            alignSelf: { xs: 'flex-start', sm: 'center' },
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            color: 'rgba(255,255,255,0.75)',
            fontWeight: 600,
            fontSize: '0.85rem',
          }}
        >
          Datos en tiempo real
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          bgcolor: 'rgba(17,17,19,0.94)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            px: { xs: 0.5, sm: 1 },
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.6)',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.92rem',
              minHeight: 54,
              letterSpacing: '0.01em',
              '&.Mui-selected': { color: '#FFCE45', fontWeight: 700 },
            },
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(90deg, rgba(255,206,69,1) 0%, rgba(255,206,69,0.65) 100%)',
              height: 3,
              borderRadius: 2,
            },
          }}
        >
          <Tab icon={<VideoLibraryIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Videos" />
          <Tab icon={<BoltIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Hooks" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          <TabPanel value={activeTab} index={0}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress size={32} sx={{ color: '#FFCE45' }} />
              </Box>
            ) : error ? (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: '#f44336', fontSize: '0.875rem' }}>
                  {error}
                </Typography>
              </Box>
            ) : videoAnalyses.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <VideoLibraryIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.2)', mb: 2 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', mb: 0.5 }}>
                  No tienes videos analizados
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                  Analiza y guarda videos para verlos aquí
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
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
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress size={32} sx={{ color: '#FFCE45' }} />
              </Box>
            ) : error ? (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: '#f44336', fontSize: '0.875rem' }}>
                  {error}
                </Typography>
              </Box>
            ) : viralHooks.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <BoltIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.2)', mb: 2 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', mb: 0.5 }}>
                  No tienes hooks guardados
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                  Genera y guarda hooks para verlos aquí
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                }}
              >
                {viralHooks.map((hook) => (
                  <ViralHookCard 
                    key={hook.id} 
                    hook={hook}
                    onClick={() => handleHookClick(hook)}
                  />
                ))}
              </Box>
            )}
          </TabPanel>
        </Box>
      </Paper>

      <VideoAnalysisModal
        open={modalOpen}
        onClose={handleCloseModal}
        analysis={selectedAnalysis}
      />
      
      <ViralHookModal
        open={hookModalOpen}
        onClose={handleCloseHookModal}
        hook={selectedHook}
      />
    </Box>
  )
}

export default MyAnalysesView

