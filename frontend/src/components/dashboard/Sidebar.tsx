import { Paper, List } from '@mui/material'
import SidebarLink from './SidebarLink'
import { DASHBOARD_NAV_ITEMS } from '../../constants/dashboard'

interface SidebarProps {
  selected: string
  onChange: (id: string) => void
}

const Sidebar = ({ selected, onChange }: SidebarProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: '100%', md: 260 },
        p: 2,
        borderRadius: 4,
        background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
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
    </Paper>
  )
}

export default Sidebar

