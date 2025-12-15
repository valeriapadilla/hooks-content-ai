import { Box, IconButton, Tooltip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SearchIcon from '@mui/icons-material/Search'
import BoltIcon from '@mui/icons-material/Bolt'
import HistoryIcon from '@mui/icons-material/History'
import PersonIcon from '@mui/icons-material/Person'

interface BottomNavigationProps {
  activeView: string
  onChange: (view: string) => void
}

const BottomNavigation = ({ activeView, onChange }: BottomNavigationProps) => {
  const navItems = [
    { id: 'overview', icon: DashboardIcon, label: 'General' },
    { id: 'analizar', icon: SearchIcon, label: 'Analizar' },
    { id: 'hooks', icon: BoltIcon, label: 'Hooks' },
    { id: 'historial', icon: HistoryIcon, label: 'Historial' },
    { id: 'perfil', icon: PersonIcon, label: 'Perfil' },
  ]

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 76,
        bgcolor: 'rgba(12,12,14,0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(16px)',
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-around',
        px: 1.5,
        zIndex: 1100,
        boxShadow: '0 -12px 30px rgba(0,0,0,0.35)',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeView === item.id

        return (
          <Tooltip key={item.id} title={item.label}>
            <IconButton
              onClick={() => onChange(item.id)}
              sx={{
                width: 52,
                height: 52,
                color: isActive ? '#FFCE45' : 'rgba(255, 255, 255, 0.55)',
                bgcolor: isActive ? 'rgba(255, 206, 69, 0.14)' : 'transparent',
                borderRadius: 18,
                '&:hover': {
                  bgcolor: isActive ? 'rgba(255, 206, 69, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#FFCE45' : 'rgba(255, 255, 255, 0.9)',
                },
                transition: 'all 0.18s ease',
              }}
            >
              <Icon sx={{ fontSize: 24 }} />
            </IconButton>
          </Tooltip>
        )
      })}
    </Box>
  )
}

export default BottomNavigation
