import { FormEvent, useEffect } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn, isLoading, error, isAuth } = useAuth()

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
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '150%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
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
            }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 20, color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={700}>
              Hooks<span style={{ color: '#3B82F6' }}>Content</span>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Form Card */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 4, md: 5 },
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Iniciar sesión
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bienvenido de vuelta
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                background: 'rgba(255, 255, 255, 0.03)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
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
                background: 'rgba(255, 255, 255, 0.03)',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)',
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
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Iniciar sesión'
            )}
          </Button>
        </Box>

        {/* Link */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, textAlign: 'center' }}
        >
          ¿No tienes una cuenta?{' '}
          <Link
            component={RouterLink}
            to="/signup"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              '&:hover': { color: 'primary.light' },
            }}
          >
            Crear cuenta
          </Link>
        </Typography>
      </Paper>
    </Box>
  )
}

export default LoginPage
