import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupsIcon from '@mui/icons-material/Groups';
import SendIcon from '@mui/icons-material/Send';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Large feature cards data
const largeFeatures = [
  {
    icon: <PsychologyIcon sx={{ fontSize: 24 }} />,
    title: 'Análisis de Hooks con IA',
    description:
      'Aprovecha nuestras herramientas de IA para analizar y mejorar tus hooks. Genera aperturas, captions y hashtags optimizados para tu audiencia.',
    visual: (
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AutoAwesomeIcon sx={{ color: 'primary.main' }} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ flex: 1 }}
        >
          Escribe un prompt para generar tu contenido...
        </Typography>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <SendIcon sx={{ fontSize: 16, color: '#0A0A0A' }} />
          </Box>
      </Box>
    ),
  },
  {
    icon: <DonutLargeIcon sx={{ fontSize: 24 }} />,
    title: 'Analíticas Avanzadas',
    description:
      'Obtén insights con analíticas detalladas. Rastrea engagement, alcance, crecimiento de seguidores y más para optimizar tu rendimiento.',
    visual: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Box sx={{ flex: 1, position: 'relative', height: 80 }}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(180deg, rgba(255, 206, 69, 0.3) 0%, transparent 100%)',
              borderRadius: 1,
            }}
          />
          <TrendingUpIcon
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'primary.main',
              fontSize: 28,
            }}
          />
        </Box>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '6px solid',
            borderColor: 'primary.main',
            borderTopColor: 'rgba(255, 255, 255, 0.1)',
            borderRightColor: 'rgba(255, 255, 255, 0.1)',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              55%
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
              Hombres
            </Typography>
          </Box>
        </Box>
      </Box>
    ),
  },
];

// Small feature cards data
const smallFeatures = [
  {
    icon: <ScheduleIcon sx={{ fontSize: 24 }} />,
    title: 'Iteraciones y Variantes A/B',
    description:
      'Crea múltiples versiones de tus hooks y compara su rendimiento estimado. Automatiza y ahorra tiempo.',
    visual: (
      <Stack spacing={0.5}>
        {['La importancia de...', 'Cómo diseñar...', 'Por qué deberías...'].map((text, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              py: 0.5,
              px: 1,
              borderRadius: 1,
              background: i === 0 ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
              {text}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              22 Jul 2024
            </Typography>
          </Box>
        ))}
      </Stack>
    ),
  },
  {
    icon: <DevicesIcon sx={{ fontSize: 24 }} />,
    title: 'Multi-Plataforma',
    description:
      'Gestiona todo tu contenido desde un solo lugar. Cambia fácilmente entre TikTok, Reels y Shorts.',
    visual: (
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['🎵', '📸', '▶️', '📱', '💬', '🎬'].map((emoji, i) => (
          <Box
            key={i}
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              fontSize: '1.25rem',
            }}
          >
            {emoji}
          </Box>
        ))}
      </Box>
    ),
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 24 }} />,
    title: 'Colaboración en Equipo',
    description:
      'Colabora con tu equipo de forma fluida. Asigna tareas, revisa contenido y gestiona aprobaciones.',
    visual: (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {[
          { status: 'Pendiente', color: '#FFCE45' },
          { status: 'En Progreso', color: '#3B82F6' },
          { status: 'Completado', color: '#22C55E' },
        ].map((item, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              py: 0.5,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: item.color,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {item.status}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Stack direction="row" spacing={-1}>
              {[...Array(3)].map((_, j) => (
                <Avatar
                  key={j}
                  sx={{
                    width: 20,
                    height: 20,
                    fontSize: 10,
                    bgcolor: `hsl(${j * 60 + 200}, 70%, 50%)`,
                  }}
                >
                  {String.fromCharCode(65 + j + i * 3)}
                </Avatar>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    ),
  },
];

const FeaturesSection = () => {
  return (
    <Box
      component="section"
      id="features"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Chip
            label="Características"
            variant="outlined"
            sx={{
              mb: 4,
              px: 3,
              py: 3,
              height: 'auto',
              borderRadius: '50px',
              fontSize: '0.9375rem',
              fontWeight: 500,
              borderColor: 'rgba(255, 206, 69, 0.3)',
              color: '#FFCE45',
              background: 'rgba(255, 206, 69, 0.08)',
            }}
          />
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              px: 2,
              fontWeight: 700,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Desbloquea Funciones Potentes para
            <br />
            Potenciar tu Contenido
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 620,
              mx: 'auto',
              px: 2,
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.65)',
            }}
          >
            Descubre cómo nuestra plataforma puede ayudarte a optimizar
            tus tareas de creación de contenido y aumentar tu presencia online.
          </Typography>
        </Box>

        {/* Large Feature Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            mb: 3,
          }}
        >
          {largeFeatures.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                p: 0.5,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(255, 206, 69, 0.2), 0 0 80px rgba(255, 206, 69, 0.08)',
                  borderColor: 'rgba(255, 206, 69, 0.4)',
                },
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Box sx={{ mb: 4 }}>{feature.visual}</Box>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ 
                    lineHeight: 1.75,
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontSize: '1rem',
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Small Feature Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {smallFeatures.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                p: 0.5,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(255, 206, 69, 0.2), 0 0 80px rgba(255, 206, 69, 0.08)',
                  borderColor: 'rgba(255, 206, 69, 0.4)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    minHeight: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {feature.visual}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    lineHeight: 1.75,
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontSize: '0.9375rem',
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
