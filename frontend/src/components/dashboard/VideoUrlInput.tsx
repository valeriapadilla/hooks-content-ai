import { useState } from 'react'
import { Box, TextField, Button, CircularProgress, FormHelperText, Fade } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          id="video-url"
          type="url"
          value={url}
          onChange={handleChange}
          placeholder="https://www.youtube.com/watch?v=..."
          disabled={isLoading}
          error={!!error}
          fullWidth
          variant="outlined"
          label="URL del Video"
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'rgba(255, 255, 255, 0.02)',
              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
              '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
              '&.Mui-focused fieldset': { borderColor: '#FFCE45' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#FFCE45' },
          }}
        />
        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          variant="contained"
          startIcon={isLoading ? <CircularProgress size={16} sx={{ color: 'inherit' }} /> : <SearchIcon />}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            minWidth: { xs: '100%', sm: 130 },
            bgcolor: '#FFCE45',
            color: '#000',
            fontWeight: 600,
            '&:hover': { bgcolor: '#e6b93d' },
            '&:disabled': { bgcolor: 'rgba(255, 206, 69, 0.3)', color: 'rgba(0,0,0,0.5)' },
          }}
        >
          {isLoading ? 'Analizando...' : 'Analizar'}
        </Button>
      </Box>
      {error && (
        <Fade in={!!error}>
          <FormHelperText error sx={{ fontSize: '0.8rem', ml: 0.5 }}>
            {error}
          </FormHelperText>
        </Fade>
      )}
    </Box>
  )
}

export default VideoUrlInput

