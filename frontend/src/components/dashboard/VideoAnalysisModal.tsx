import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Paper,
  Typography,
  Chip,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ArticleIcon from '@mui/icons-material/Article'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import type { VideoAnalysisListItem } from '../../types/api'

interface VideoAnalysisModalProps {
  open: boolean
  onClose: () => void
  analysis: VideoAnalysisListItem | null
}

const VideoAnalysisModal = ({ open, onClose, analysis }: VideoAnalysisModalProps) => {
  if (!analysis) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
          borderBottom: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
            {analysis.video_title || 'Análisis de Video'}
          </Typography>
          {analysis.platform && (
            <Chip
              label={analysis.platform}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 206, 69, 0.15)',
                color: 'primary.main',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => window.open(analysis.video_url, '_blank')}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.main',
                bgcolor: 'rgba(255, 206, 69, 0.1)',
              },
            }}
          >
            <OpenInNewIcon />
          </IconButton>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 3, md: 4 }, pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Transcript Section */}
          {analysis.transcript && (
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
                  {analysis.transcript}
                </Typography>
              </Paper>
            </Box>
          )}

          {/* Hook Section */}
          {analysis.hook && (
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
                }}
              >
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
                      lineHeight: 1.6,
                    }}
                  >
                    {analysis.hook}
                  </Typography>
                </Paper>
              </Paper>
            </Box>
          )}

          {/* Script Base Section */}
          {analysis.script_base && (
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
                  {analysis.script_base}
                </Typography>
              </Paper>
            </Box>
          )}

          {/* Empty State */}
          {!analysis.transcript && !analysis.hook && !analysis.script_base && (
            <Box
              sx={{
                textAlign: 'center',
                py: 6,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.9375rem',
                }}
              >
                No hay detalles disponibles para este análisis
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default VideoAnalysisModal

