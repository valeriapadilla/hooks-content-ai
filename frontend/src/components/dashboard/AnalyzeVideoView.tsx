import { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import VideoUrlInput from './VideoUrlInput'
import VideoAnalysisResults from './VideoAnalysisResults'

const AnalyzeVideoView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [analysisData, setAnalysisData] = useState<{
    transcript?: string
    hook?: {
      general?: string
      used_in_video?: string
      type?: string
    }
    scriptBase?: string
  } | null>(null)

  const handleSearch = async (_url: string) => {
    setIsLoading(true)
    setAnalysisData(null)

    // TODO: Implementar llamada al backend
    // Por ahora solo simulamos una respuesta
    try {
      // Simulación de delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // TODO: Reemplazar con llamada real al backend
      // const response = await fetch('/api/video/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url })
      // })
      // const data = await response.json()
      // setAnalysisData(data)

      // Datos de ejemplo (eliminar cuando se implemente el backend)
      setAnalysisData({
        transcript: 'Este es un ejemplo de transcripción del video...',
        hook: {
          general: 'Deja de hacer lo mismo siempre, ya aprendí a...',
          used_in_video: 'Deja de desayunar lo mismo siempre, ya aprendí a preparar estas tostadas francesas de tiramisú',
          type: 'curiosidad'
        },
        scriptBase: 'Deja de hacer lo mismo siempre, ya aprendí a preparar ____. Comienza con ____ y añade ____. Finaliza con ____.'
      })
    } catch (error) {
      console.error('Error al analizar video:', error)
      // TODO: Mostrar mensaje de error al usuario
    } finally {
      setIsLoading(false)
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
      </Paper>

      {/* Results Section */}
      <VideoAnalysisResults
        transcript={analysisData?.transcript}
        hook={analysisData?.hook}
        scriptBase={analysisData?.scriptBase}
      />
    </Box>
  )
}

export default AnalyzeVideoView

