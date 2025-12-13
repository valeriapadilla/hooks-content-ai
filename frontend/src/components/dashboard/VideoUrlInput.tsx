import { useState } from 'react'
import { motion } from 'framer-motion'

interface VideoUrlInputProps {
  onSearch: (url: string) => void
  isLoading?: boolean
}

const VideoUrlInput = ({ onSearch, isLoading = false }: VideoUrlInputProps) => {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const validateUrl = (urlString: string): boolean => {
    if (!urlString.trim()) {
      setError('Por favor ingresa una URL')
      return false
    }

    try {
      const url = new URL(urlString)
      // Validar que sea una URL válida (YouTube, TikTok, Instagram, etc.)
      const validDomains = ['youtube.com', 'youtu.be', 'tiktok.com', 'instagram.com', 'reels']
      const hostname = url.hostname.toLowerCase()
      
      const isValid = validDomains.some(domain => hostname.includes(domain))
      
      if (!isValid) {
        setError('Por favor ingresa una URL válida de YouTube, TikTok o Instagram')
        return false
      }

      setError('')
      return true
    } catch {
      setError('Por favor ingresa una URL válida')
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateUrl(url)) {
      onSearch(url)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    if (error) setError('')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="video-url" className="text-sm font-medium text-text">
          URL del Video
        </label>
        <div className="flex gap-3">
          <input
            id="video-url"
            type="url"
            value={url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={isLoading}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-text text-sm font-inherit transition-all duration-300 focus:outline-none focus:border-[#FFCE45] focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(255,206,69,0.1)] placeholder:text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="px-6 py-3 text-sm rounded-lg font-medium text-[#0A0A0A] bg-[#FFCE45] hover:bg-[#E6B83D] transition-colors duration-200 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FFCE45] flex items-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Analizando...
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="m21 21-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Buscar
              </>
            )}
          </button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-red-400 mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.form>
  )
}

export default VideoUrlInput

