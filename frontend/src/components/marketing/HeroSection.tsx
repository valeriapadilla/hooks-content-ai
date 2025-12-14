import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Paper,
  Card,
  CardContent,
  Stack,
  Avatar,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PsychologyIcon from '@mui/icons-material/Psychology';

const HeroSection = () => {
  const navigate = useNavigate();

  const platforms = [
    { icon: <PlayArrowIcon />, label: 'TikTok', value: '+15.2%', color: '#FF0050' },
    { icon: <PlayArrowIcon />, label: 'Instagram', value: '-2.3%', color: '#E1306C' },
    { icon: <PlayArrowIcon />, label: 'YouTube', value: '+8.7%', color: '#FF0000' },
    { icon: <PlayArrowIcon />, label: 'Shorts', value: '+4.1%', color: '#00D4AA' },
  ];

  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150%',
          height: '60%',
          background: 'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Pill Badge */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Chip
            label="Ya disponible — Experimenta el futuro de la creación de contenido"
            variant="outlined"
            sx={{
              px: 2.5,
              py: 3,
              height: 'auto',
              borderRadius: '50px',
              fontSize: '0.9375rem',
              fontWeight: 500,
              borderColor: 'rgba(255, 206, 69, 0.3)',
              color: '#FFCE45',
              background: 'rgba(255, 206, 69, 0.08)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '& .MuiChip-label': {
                px: 1,
              },
              '&:hover': {
                borderColor: 'rgba(255, 206, 69, 0.5)',
                background: 'rgba(255, 206, 69, 0.12)',
                transform: 'scale(1.02)',
              },
            }}
          />
        </Box>

        {/* Main Headline */}
        <Typography
          variant="h1"
          align="center"
          sx={{
            mb: 4,
            px: 2,
            fontWeight: 800,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 40px rgba(255, 255, 255, 0.1)',
          }}
        >
          Rápido, Inteligente,{' '}
          <Box 
            component="span" 
            sx={{ 
              color: '#FFCE45',
            }}
          >
            Potenciado por IA
          </Box>
          <br />
          Asistente para Creadores
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          align="center"
          sx={{
            maxWidth: 680,
            mx: 'auto',
            mb: 6,
            px: 2,
            fontSize: { xs: '1.0625rem', md: '1.1875rem' },
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 400,
          }}
        >
          Optimiza tu estrategia de contenido con herramientas automatizadas e
          insights inteligentes para impulsar tu presencia online sin esfuerzo.
        </Typography>

        {/* CTA Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 10 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.0625rem',
              fontWeight: 600,
              borderRadius: 2.5,
              bgcolor: '#FFCE45',
              color: '#0A0A0A',
              boxShadow: '0 10px 40px rgba(255, 206, 69, 0.4), 0 0 80px rgba(255, 206, 69, 0.15)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: '#E6B83D',
                boxShadow: '0 14px 48px rgba(255, 206, 69, 0.5), 0 0 100px rgba(255, 206, 69, 0.2)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Comenzar gratis
          </Button>
        </Box>

        {/* Dashboard Preview */}
        <Paper
          elevation={0}
          sx={{
            maxWidth: 1100,
            mx: 'auto',
            borderRadius: 5,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.95) 0%, rgba(8, 8, 8, 0.98) 100%)',
            backdropFilter: 'blur(30px)',
            p: 0,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 120px rgba(255, 206, 69, 0.08)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 28px 80px rgba(0, 0, 0, 0.7), 0 0 140px rgba(255, 206, 69, 0.12)',
            },
          }}
        >
          {/* Dashboard Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FF5F57' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#FEBC2E' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#28C840' }} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              HooksContent — Dashboard
            </Typography>
          </Box>

          {/* Dashboard Content */}
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {/* Sidebar Preview */}
              <Box sx={{ width: { xs: '100%', md: '25%' } }}>
                <Box
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 2,
                    p: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    HooksContent.
                  </Typography>
                  {['Dashboard', 'Analizar Video', 'Mis Videos', 'Predicciones', 'Configuración'].map(
                    (item, index) => (
                      <Box
                        key={item}
                        sx={{
                          py: 1,
                          px: 1.5,
                          borderRadius: 1,
                          mb: 0.5,
                          background: index === 0 ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                          color: index === 0 ? 'primary.main' : 'text.secondary',
                          fontSize: '0.875rem',
                        }}
                      >
                        {item}
                      </Box>
                    )
                  )}
                </Box>
              </Box>

              {/* Main Content */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Resumen General
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                      gap: 2,
                    }}
                  >
                    {platforms.map((platform) => (
                      <Card
                        key={platform.label}
                        sx={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ color: platform.color }}>{platform.icon}</Box>
                            <Typography variant="body2">{platform.label}</Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: platform.value.startsWith('+') ? '#22C55E' : '#EF4444',
                              fontWeight: 600,
                            }}
                          >
                            {platform.value}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>

                {/* Bottom Section */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>
                          Predicciones de Rendimiento
                        </Typography>
                        <Stack spacing={1.5}>
                          {[
                            { icon: <VisibilityOutlinedIcon />, label: 'Vistas estimadas', value: '~125K' },
                            { icon: <ThumbUpAltOutlinedIcon />, label: 'Likes estimados', value: '~8.2K' },
                            { icon: <TrendingUpIcon />, label: 'Retención', value: '68%' },
                          ].map((stat) => (
                            <Box
                              key={stat.label}
                              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ color: 'primary.main' }}>{stat.icon}</Box>
                                <Typography variant="body2" color="text.secondary">
                                  {stat.label}
                                </Typography>
                              </Box>
                              <Typography variant="body2" fontWeight={600}>
                                {stat.value}
                              </Typography>
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle2" sx={{ mb: 2 }}>
                          Análisis de Hook
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <PsychologyIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              Hook Score: 8.5/10
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              "Gran apertura, considera añadir más urgencia"
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: 1,
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                          }}
                        >
                          <Typography variant="caption" color="primary.light">
                            💡 Sugerencia: "¿Sabías que el 90% de los creadores cometen este error?"
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;
