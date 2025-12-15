import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SearchIcon from '@mui/icons-material/Search'
import BoltIcon from '@mui/icons-material/Bolt'
import PersonIcon from '@mui/icons-material/Person'
import HistoryIcon from '@mui/icons-material/History'
import LogoutIcon from '@mui/icons-material/Logout'

interface SidebarLinkProps {
  label: string
  icon: 'dashboard' | 'search' | 'bolt' | 'user' | 'history' | 'logout'
  isActive: boolean
  onClick: () => void
}

const iconMap = {
  dashboard: DashboardIcon,
  search: SearchIcon,
  bolt: BoltIcon,
  user: PersonIcon,
  history: HistoryIcon,
  logout: LogoutIcon,
}

const SidebarLink = ({ label, icon, isActive, onClick }: SidebarLinkProps) => {
  const IconComponent = iconMap[icon]
  const isLogout = icon === 'logout'

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        position: 'relative',
        borderRadius: 2,
        px: 1.5,
        py: 1.15,
        bgcolor: isActive ? 'rgba(255, 206, 69, 0.12)' : 'transparent',
        color: isLogout ? 'error.light' : isActive ? '#FFCE45' : 'rgba(255, 255, 255, 0.72)',
        transition: 'all 0.18s ease',
        '&:hover': {
          bgcolor: isLogout ? 'rgba(244, 67, 54, 0.08)' : isActive ? 'rgba(255, 206, 69, 0.18)' : 'rgba(255, 255, 255, 0.05)',
          color: isLogout ? 'error.main' : isActive ? '#FFCE45' : 'rgba(255, 255, 255, 0.95)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 8,
          top: '18%',
          bottom: '18%',
          width: 3,
          borderRadius: 6,
          background: isActive ? '#FFCE45' : 'transparent',
          transition: 'all 0.2s ease',
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 36,
          color: 'inherit',
        }}
      >
        <IconComponent sx={{ fontSize: 20 }} />
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          fontSize: '0.875rem',
          fontWeight: isActive ? 600 : 500,
        }}
      />
    </ListItemButton>
  )
}

export default SidebarLink

