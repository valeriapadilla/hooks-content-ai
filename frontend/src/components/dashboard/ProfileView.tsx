import { Box, Typography, Button, Divider } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAuth } from '../../hooks/useAuth'
import { getAuth } from '../../utils/authStorage'

const ProfileView = () => {
  const { user } = useAuth()
  const auth = getAuth()

  const fullName = auth?.user?.email?.split('@')[0] || 'Usuario'

  const InfoCard = ({
    icon: Icon,
    iconColor,
    label,
    value,
    action,
  }: {
    icon: React.ElementType
    iconColor: string
    label: string
    value: string
    action?: React.ReactNode
  }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2.5,
        borderRadius: 3,
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.2s',
        '&:hover': {
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${iconColor}30`,
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2.5,
          background: `linear-gradient(135deg, ${iconColor}25 0%, ${iconColor}10 100%)`,
          border: `1px solid ${iconColor}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 8px 20px ${iconColor}20`,
        }}
      >
        <Icon sx={{ fontSize: 20, color: iconColor }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            mb: 0.25,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            color: 'white',
            fontWeight: 500,
            fontSize: '0.95rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </Typography>
      </Box>
      {action}
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 0.5,
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Mi Perfil
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.95rem' }}>
            Gestiona tu información personal y ajustes de seguridad
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(167,139,250,0.15) 0%, rgba(167,139,250,0.05) 100%)',
            border: '1px solid rgba(167,139,250,0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <SettingsIcon sx={{ fontSize: 18, color: '#A78BFA' }} />
          <Typography sx={{ color: '#A78BFA', fontWeight: 600, fontSize: '0.85rem' }}>
            Configuración
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Personal Info */}
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
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
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(255,206,69,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(255,206,69,0.2) 0%, rgba(255,206,69,0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PersonIcon sx={{ fontSize: 20, color: '#FFCE45' }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>
                Información Personal
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <InfoCard icon={PersonIcon} iconColor="#FFCE45" label="Nombre" value={fullName} />
              <InfoCard icon={EmailIcon} iconColor="#60A5FA" label="Correo Electrónico" value={user?.email || 'No disponible'} />
            </Box>
          </Box>
        </Box>

        {/* Security */}
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(22,22,26,0.9) 0%, rgba(16,16,20,0.95) 100%)',
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
              background: 'linear-gradient(90deg, transparent, rgba(167,139,250,0.5), transparent)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.2) 0%, rgba(167,139,250,0.1) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SecurityIcon sx={{ fontSize: 20, color: '#A78BFA' }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>
                Seguridad
              </Typography>
            </Box>

            <InfoCard
              icon={LockIcon}
              iconColor="#A78BFA"
              label="Contraseña"
              value="••••••••••••"
              action={
                <Button
                  variant="outlined"
                  disabled
                  size="small"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.8rem',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2,
                    '&:disabled': {
                      borderColor: 'rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.3)',
                    },
                  }}
                >
                  Cambiar
                </Button>
              }
            />

            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.06)' }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', mb: 1 }}>
                Más opciones de seguridad próximamente
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
                2FA, sesiones activas, y más
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileView
