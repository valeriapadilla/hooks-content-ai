import { Box, Paper, Typography, Chip, Fade } from '@mui/material'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ArticleIcon from '@mui/icons-material/Article'

interface VideoAnalysisResultsProps {
  transcript?: string
  hook?: {
    general?: string
    used_in_video?: string
    type?: string
  }
  scriptBase?: string
}

const VideoAnalysisResults = ({
  transcript,
  hook,
  scriptBase,
}: VideoAnalysisResultsProps) => {
  // Si no hay datos, mostrar estado vacío
  if (!transcript && !hook && !scriptBase) {
    return (
      <Fade in timeout={500}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
              }}
            >
              📹
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9375rem' }}>
              Ingresa una URL de video y haz clic en "Buscar" para ver el análisis aquí
            </Typography>
          </Box>
        </Paper>
      </Fade>
    )
  }

  return (
    <Fade in timeout={500}>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Transcript Section */}
          {transcript && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <DescriptionIcon sx={{ color: 'secondary.main', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Transcripción
                </Typography>
              </Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.75,
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.9375rem',
                  }}
                >
                  {transcript}
                </Typography>
              </Paper>
            </Box>
          )}

          {/* Hook Section */}
          {hook && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <LocalOfferIcon sx={{ color: 'secondary.main', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Hook Identificado
                </Typography>
              </Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                {hook.general && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      Hook General (Reutilizable)
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(255, 206, 69, 0.1)',
                        border: '1px solid',
                        borderColor: 'rgba(255, 206, 69, 0.25)',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 500,
                          fontSize: '0.9375rem',
                        }}
                      >
                        {hook.general}
                      </Typography>
                    </Paper>
                  </Box>
                )}
                {hook.used_in_video && (
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        mb: 1,
                        display: 'block',
                      }}
                    >
                      Hook Usado en el Video
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.9375rem',
                      }}
                    >
                      {hook.used_in_video}
                    </Typography>
                  </Box>
                )}
                {hook.type && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      pt: 2,
                      borderTop: '1px solid',
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Tipo:
                    </Typography>
                    <Chip
                      label={hook.type}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 206, 69, 0.2)',
                        color: 'secondary.main',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                )}
              </Paper>
            </Box>
          )}

          {/* Script Base Section */}
          {scriptBase && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <ArticleIcon sx={{ color: 'secondary.main', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Script Base Replicable
                </Typography>
              </Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid',
                  borderColor: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.75,
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.9375rem',
                  }}
                >
                  {scriptBase}
                </Typography>
              </Paper>
            </Box>
          )}
        </Box>
      </Paper>
    </Fade>
  )
}

export default VideoAnalysisResults

