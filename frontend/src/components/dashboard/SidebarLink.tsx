import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import BoltIcon from '@mui/icons-material/Bolt'
import PersonIcon from '@mui/icons-material/Person'

interface SidebarLinkProps {
  label: string
  icon: 'search' | 'bolt' | 'user'
  isActive: boolean
  onClick: () => void
}

const iconMap = {
  search: SearchIcon,
  bolt: BoltIcon,
  user: PersonIcon,
}

const SidebarLink = ({ label, icon, isActive, onClick }: SidebarLinkProps) => {
  const IconComponent = iconMap[icon]

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: 2,
        px: 2,
        py: 1.5,
        mb: 0.5,
        bgcolor: isActive ? 'rgba(255, 206, 69, 0.12)' : 'transparent',
        color: isActive ? 'secondary.main' : 'text.secondary',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: isActive ? 'rgba(255, 206, 69, 0.18)' : 'rgba(255, 255, 255, 0.05)',
          color: isActive ? 'secondary.main' : 'text.primary',
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 40,
          color: isActive ? 'secondary.main' : 'text.secondary',
        }}
      >
        <IconComponent sx={{ fontSize: 20 }} />
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          fontSize: '0.9375rem',
          fontWeight: isActive ? 600 : 500,
        }}
      />
    </ListItemButton>
  )
}

export default SidebarLink

