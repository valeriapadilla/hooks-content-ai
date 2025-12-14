import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

const steps = [
  {
    icon: <CloudUploadOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Sube tu Video',
    description:
      'Conecta fácilmente tus videos a HooksContent con solo unos clics. Soportamos TikTok, Instagram Reels y YouTube Shorts.',
  },
  {
    icon: <AutoGraphOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Simula y Predice',
    description:
      'Usa nuestro simulador de algoritmo y asistente IA para estimar el rendimiento. Obtén predicciones de vistas, likes y retención.',
  },
  {
    icon: <LightbulbOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Mejora tu Hook',
    description:
      'Recibe análisis detallado de tu hook y sugerencias de mejora. Ajusta tu estrategia basándote en datos en tiempo real.',
  },
];

const HowItWorksSection = () => {
  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{
        py: { xs: 10, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Chip
            label="Cómo funciona"
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
            Gestiona tu Contenido
            <br />
            en Tres Simples Pasos
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 580,
              mx: 'auto',
              px: 2,
              fontSize: '1.125rem',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.65)',
            }}
          >
            Descubre lo fácil que es subir, simular
            <br />
            y analizar con HooksContent.
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {steps.map((step, index) => (
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
                  '& .icon-box': {
                    background: '#FFCE45',
                    color: '#0A0A0A',
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Icon */}
                <Box
                  className="icon-box"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  color: '#FFCE45',
                  border: '1.5px solid rgba(255, 206, 69, 0.3)',
                  background: 'rgba(255, 206, 69, 0.12)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {step.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  {step.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{ 
                    lineHeight: 1.75,
                    color: 'rgba(255, 255, 255, 0.65)',
                    fontSize: '0.9375rem',
                  }}
                >
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
