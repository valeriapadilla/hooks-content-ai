import { FormEvent, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Box, Container, Typography, TextField, Button, Link, CircularProgress } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useAuth } from '../hooks/useAuth'

const SignupPage = () => {
  const navigate = useNavigate()
  const { signUp, isLoading, error, isAuth } = useAuth()

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard')
    }
  }, [isAuth, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signUp({ email, password, full_name: name })
      navigate('/dashboard')
    } catch (err) {
      console.error('Error al registrar usuario:', err)
    }
  }

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      background: 'rgba(255,255,255,0.02)',
      transition: 'all 0.2s',
      '&:hover': {
        background: 'rgba(255,255,255,0.04)',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255,255,255,0.2)',
      },
      '&.Mui-focused': {
        background: 'rgba(255,255,255,0.04)',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FFCE45',
        borderWidth: 1,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255,255,255,0.1)',
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.5)',
      '&.Mui-focused': { color: '#FFCE45' },
    },
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        position: 'relative',
        background: 'linear-gradient(180deg, #0a0a0c 0%, #111114 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140%',
          height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(96,165,250,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(255,206,69,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Logo Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #FFCE45 0%, #e6b93d 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255,206,69,0.3)',
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 22, color: '#000' }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              Hooks<span style={{ color: '#FFCE45' }}>Content</span>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Form Card */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 440,
          p: { xs: 4, md: 5 },
          borderRadius: 4,
          position: 'relative',
          background: 'linear-gradient(145deg, rgba(22,22,26,0.95) 0%, rgba(16,16,20,0.98) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.5), transparent)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          },
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(96,165,250,0.2) 0%, rgba(96,165,250,0.1) 100%)',
              border: '1px solid rgba(96,165,250,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 12px 32px rgba(96,165,250,0.2)',
            }}
          >
            <PersonAddIcon sx={{ fontSize: 32, color: '#60A5FA' }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Crear Cuenta
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
            Comienza tu viaje hacia contenido viral
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(244,67,54,0.15) 0%, rgba(244,67,54,0.05) 100%)',
              border: '1px solid rgba(244,67,54,0.3)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography sx={{ color: '#f44336', fontSize: '0.9rem', fontWeight: 500 }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, position: 'relative', zIndex: 1 }}
        >
          <TextField
            name="name"
            label="Nombre completo"
            type="text"
            placeholder="Tu nombre"
            fullWidth
            required
            disabled={isLoading}
            InputLabelProps={{ shrink: true }}
            sx={inputStyle}
          />

          <TextField
            name="email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            fullWidth
            required
            disabled={isLoading}
            InputLabelProps={{ shrink: true }}
            sx={inputStyle}
          />

          <TextField
            name="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            fullWidth
            required
            disabled={isLoading}
            InputLabelProps={{ shrink: true }}
            sx={inputStyle}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 1,
              py: 1.75,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 700,
              bgcolor: '#60A5FA',
              color: '#000',
              boxShadow: '0 12px 32px rgba(96,165,250,0.3)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: '#3B82F6',
                boxShadow: '0 16px 40px rgba(96,165,250,0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                bgcolor: 'rgba(96,165,250,0.3)',
                color: 'rgba(0,0,0,0.5)',
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Crear cuenta'}
          </Button>
        </Box>

        {/* Link */}
        <Typography
          sx={{
            mt: 4,
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.9rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              color: '#60A5FA',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
              '&:hover': {
                color: '#fff',
                textShadow: '0 0 20px rgba(96,165,250,0.5)',
              },
            }}
          >
            Iniciar sesión
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default SignupPage
