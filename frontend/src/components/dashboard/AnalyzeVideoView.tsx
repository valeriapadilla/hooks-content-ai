import { useState } from 'react'
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
        {error && (
          <div className="mt-4 bg-red-500/10 border border-red-500/50 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Results Section */}
      <VideoAnalysisResults
        transcript={analysisData?.transcript}
        hook={analysisData?.hook}
        scriptBase={analysisData?.scriptBase}
        onSave={handleSave}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
      />
    </div>
  )
}

export default AnalyzeVideoView

