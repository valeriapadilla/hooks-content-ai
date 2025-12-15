import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'

import { videoService } from '../../services/videoService'
import { ApiClientError } from '../../services/apiClient'
import { getUserId } from '../../utils/authStorage'

import VideoUrlInput from './VideoUrlInput'
import VideoAnalysisResults from './VideoAnalysisResults'
import type { VideoAnalysisResponse } from '../../types/api'

const AnalyzeVideoView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [analysisData, setAnalysisData] = useState<{
    transcript?: string
    hook?: {
      general?: string
      used_in_video?: string
      type?: string
    }
    scriptBase?: string
  } | null>(null)

  const handleSearch = async (url: string) => {
    setIsLoading(true)
    setAnalysisData(null)
    setError(null)
    setVideoUrl(url)

    try {
      const response: VideoAnalysisResponse = await videoService.analyzeVideo({ url })

      setAnalysisData({
        transcript: response.transcript,
        hook: {
          general: response.hook?.general,
          used_in_video: response.hook?.used_in_video,
          type: response.hook?.type,
        },
        scriptBase: response.script_base,
      })
    } catch (err) {
      let errorMessage = 'Error al analizar el video'

      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(errorMessage)
      console.error('Error al analizar video:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (title?: string) => {
    if (!analysisData || !videoUrl) return

    const userId = getUserId()
    if (!userId) {
      setError('Debes iniciar sesión para guardar análisis')
      return
    }

    setIsSaving(true)
    setSaveSuccess(false)
    setError(null)

    try {
      await videoService.saveVideoAnalysis({
        user_id: userId,
        video_url: videoUrl,
        transcript: analysisData.transcript,
        hook: analysisData.hook?.general || analysisData.hook?.used_in_video,
        script_base: analysisData.scriptBase,
        video_title: title || undefined,
      })

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      let errorMessage = 'Error al guardar el análisis'

      if (err instanceof ApiClientError) {
        errorMessage = err.detail
      } else if (err instanceof Error) {
        errorMessage = err.message
      }

      setError(errorMessage)
      console.error('Error al guardar:', err)
    } finally {
      setIsSaving(false)
    }
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
            Analizar Video
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.95rem' }}>
            Extrae hooks virales y scripts replicables de cualquier video
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
            background: 'linear-gradient(135deg, rgba(96,165,250,0.15) 0%, rgba(96,165,250,0.05) 100%)',
            border: '1px solid rgba(96,165,250,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <OndemandVideoIcon sx={{ fontSize: 18, color: '#60A5FA' }} />
          <Typography sx={{ color: '#60A5FA', fontWeight: 600, fontSize: '0.85rem' }}>
            IA Analítica
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
            background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <VideoUrlInput onSearch={handleSearch} isLoading={isLoading} />

          {error && (
            <Box
              sx={{
                mt: 2.5,
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, rgba(244,67,54,0.15) 0%, rgba(244,67,54,0.05) 100%)',
                border: '1px solid rgba(244,67,54,0.3)',
              }}
            >
              <Typography sx={{ color: '#f44336', fontSize: '0.9rem', fontWeight: 500 }}>
                {error}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Results Section */}
      <VideoAnalysisResults
        transcript={analysisData?.transcript}
        hook={analysisData?.hook}
        scriptBase={analysisData?.scriptBase}
        onSave={handleSave}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
      />
    </Box>
  )
}

export default AnalyzeVideoView
