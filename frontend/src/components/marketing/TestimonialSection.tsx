import {
  Box,
  Container,
  Typography,
  Rating,
  Avatar,
  Stack,
} from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 12, md: 16 },
        background: 'linear-gradient(180deg, transparent 0%, rgba(255, 206, 69, 0.04) 50%, transparent 100%)',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            px: 2,
          }}
        >
          {/* Quote Icon */}
          <FormatQuoteIcon
            sx={{
              fontSize: 72,
              color: 'primary.main',
              opacity: 0.25,
              mb: 3,
            }}
          />

          {/* Quote Text */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 500,
              mb: 5,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.95)',
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}
          >
            "HooksContent ha transformado completamente cómo creo contenido. 
            Las predicciones de rendimiento me ayudan a entender qué funcionará 
            antes de publicar. ¡Es como tener un analista de datos personal!"
          </Typography>

          {/* Rating */}
          <Rating
            value={5}
            readOnly
            size="large"
            sx={{
              mb: 4,
              '& .MuiRating-iconFilled': {
                color: '#FFCE45',
                fontSize: '2rem',
              },
              '& .MuiRating-iconEmpty': {
                color: 'rgba(255, 206, 69, 0.2)',
              },
            }}
          />

          {/* Author */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2.5}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                fontSize: '1.375rem',
                fontWeight: 700,
                border: '2px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              MC
            </Avatar>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                María Castillo
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Creadora de contenido • 500K seguidores
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialSection;

