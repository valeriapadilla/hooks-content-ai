import { Box, Typography, List, Divider } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import HistoryIcon from '@mui/icons-material/History'
import SidebarLink from './SidebarLink'
import { DASHBOARD_NAV_ITEMS } from '../../constants/dashboard'

interface SidebarProps {
  selected: string
  onChange: (id: string) => void
  onLogout: () => void
}

const Sidebar = ({ selected, onChange, onLogout }: SidebarProps) => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#111113',
        borderRight: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, pb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: 'rgba(255, 206, 69, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ width: 28, height: 28, objectFit: 'contain' }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '-0.01em',
            }}
          >
            Hooks<span style={{ color: '#FFCE45' }}>Content</span>
          </Typography>
        </Box>
      </Box>

      {/* Navegación principal */}
      <Box sx={{ flex: 1, px: 2, py: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.4)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.7rem',
            px: 1.5,
            mb: 1.5,
            display: 'block',
          }}
        >
          Menu Principal
        </Typography>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, p: 0 }}>
          {DASHBOARD_NAV_ITEMS.map((item) => (
            <SidebarLink
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={selected === item.id}
              onClick={() => onChange(item.id)}
            />
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.06)', my: 3 }} />

        <Box>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.7rem',
              px: 1.5,
              mb: 1.5,
              display: 'block',
            }}
          >
            Contenido
          </Typography>
          <List sx={{ p: 0 }}>
            <SidebarLink
              label="Mis Análisis"
              icon="history"
              isActive={selected === 'historial'}
              onClick={() => onChange('historial')}
            />
          </List>
        </Box>
      </Box>

      {/* Logout */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'rgba(255, 255, 255, 0.06)' }}>
        <SidebarLink
          label="Cerrar Sesión"
          icon="logout"
          isActive={false}
          onClick={onLogout}
        />
      </Box>
    </Box>
  )
}

export default Sidebar

