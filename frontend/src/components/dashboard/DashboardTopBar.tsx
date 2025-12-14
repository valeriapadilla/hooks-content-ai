import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import HistoryIcon from '@mui/icons-material/History'

interface DashboardTopBarProps {
  onNavigate: (section: string) => void
  onLogout: () => void
}

const DashboardTopBar = ({ onNavigate, onLogout }: DashboardTopBarProps) => {
  const navigate = useNavigate()

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.06)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
          onClick={() => navigate('/')}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="HooksContent Logo"
            sx={{
              width: 38,
              height: 38,
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              fontSize: '1.25rem',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Hooks<span style={{ color: '#FFCE45' }}>Content</span>
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<HistoryIcon />}
            onClick={() => onNavigate('historial')}
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              textTransform: 'none',
              display: { xs: 'none', sm: 'flex' },
              '&:hover': {
                color: 'secondary.main',
                bgcolor: 'rgba(255, 206, 69, 0.08)',
              },
            }}
          >
            Mis análisis
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            variant="outlined"
            sx={{
              color: 'text.secondary',
              borderColor: 'rgba(255, 255, 255, 0.15)',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                color: 'text.primary',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Salir
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default DashboardTopBar

