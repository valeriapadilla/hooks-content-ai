import { useState } from 'react'
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

  const handleSearch = async (url: string) => {
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text mb-2">
          Analizar Video
        </h2>
        <p className="text-text-secondary text-sm">
          Ingresa la URL de un video viral para analizar su estructura, hook y obtener un script base replicable
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-bg-secondary/80 border border-white/5 rounded-2xl p-6 md:p-8">
        <VideoUrlInput onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Results Section */}
      <VideoAnalysisResults
        transcript={analysisData?.transcript}
        hook={analysisData?.hook}
        scriptBase={analysisData?.scriptBase}
      />
    </div>
  )
}

export default AnalyzeVideoView

