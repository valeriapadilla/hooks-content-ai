import { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'

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

  const handleSave = async () => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: 'text.primary',
          }}
        >
          Analizar Video
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.9375rem',
          }}
        >
          Ingresa la URL de un video viral para analizar su estructura, hook y obtener un script base replicable
        </Typography>
      </Box>

      {/* Input Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <VideoUrlInput onSearch={handleSearch} isLoading={isLoading} />
        {error && (
          <Box sx={{ mt: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'error.dark',
                border: '1px solid',
                borderColor: 'error.main',
              }}
            >
              <Typography variant="body2" sx={{ color: 'error.light' }}>
                {error}
              </Typography>
            </Paper>
          </Box>
        )}
      </Paper>

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

