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
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 206, 69, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'secondary.main',
                  boxShadow: '0 0 0 3px rgba(255, 206, 69, 0.15)',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'secondary.main',
              },
            }}
          />
          <Button
            type="submit"
            disabled={isLoading || !url.trim()}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={
              isLoading ? (
                <CircularProgress size={18} sx={{ color: '#0A0A0A' }} />
              ) : (
                <SearchIcon />
              )
            }
            sx={{
              px: 4,
              py: 1.75,
              borderRadius: 2,
              whiteSpace: 'nowrap',
              minWidth: { xs: '100%', sm: 140 },
              color: '#0A0A0A',
              fontWeight: 600,
            }}
          >
            {isLoading ? 'Analizando...' : 'Buscar'}
          </Button>
        </Box>
        {error && (
          <Fade in={!!error}>
            <FormHelperText error sx={{ fontSize: '0.8125rem', mx: 1.5 }}>
              {error}
            </FormHelperText>
          </Fade>
        )}
      </Box>
    </Box>
  )
}

export default VideoUrlInput

