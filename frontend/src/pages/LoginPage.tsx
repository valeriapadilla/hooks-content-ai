import { FormEvent, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Box, Container, Typography, TextField, Button, Link, CircularProgress } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import BoltIcon from '@mui/icons-material/Bolt'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn, isLoading, isAuth } = useAuth()

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard')
    }
  }, [isAuth, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signIn({ email, password })
      navigate('/dashboard')
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
    }
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
          background: 'radial-gradient(ellipse at center, rgba(255,206,69,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 60%)',
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
            background: 'linear-gradient(90deg, transparent, rgba(255,206,69,0.5), transparent)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,206,69,0.08) 0%, transparent 70%)',
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
              background: 'linear-gradient(135deg, rgba(255,206,69,0.2) 0%, rgba(255,206,69,0.1) 100%)',
              border: '1px solid rgba(255,206,69,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 12px 32px rgba(255,206,69,0.2)',
            }}
          >
            <BoltIcon sx={{ fontSize: 32, color: '#FFCE45' }} />
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
            Bienvenido
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
            Inicia sesión para continuar
          </Typography>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, position: 'relative', zIndex: 1 }}
        >
          <TextField
            name="email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@email.com"
            fullWidth
            required
            disabled={isLoading}
            InputLabelProps={{ shrink: true }}
            sx={{
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
            }}
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
            sx={{
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
            }}
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
              bgcolor: '#FFCE45',
              color: '#000',
              boxShadow: '0 12px 32px rgba(255,206,69,0.3)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: '#e6b93d',
                boxShadow: '0 16px 40px rgba(255,206,69,0.4)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                bgcolor: 'rgba(255,206,69,0.3)',
                color: 'rgba(0,0,0,0.5)',
              },
            }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Iniciar sesión'}
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
          ¿No tienes una cuenta?{' '}
          <Link
            component={RouterLink}
            to="/signup"
            sx={{
              color: '#FFCE45',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
              '&:hover': {
                color: '#fff',
                textShadow: '0 0 20px rgba(255,206,69,0.5)',
              },
            }}
          >
            Crear cuenta
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default LoginPage
