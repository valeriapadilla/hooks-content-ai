import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Sidebar from '../components/dashboard/Sidebar'
import BottomNavigation from '../components/dashboard/BottomNavigation'
import OverviewView from '../components/dashboard/OverviewView'
import AnalyzeVideoView from '../components/dashboard/AnalyzeVideoView'
import GenerateHooksView from '../components/dashboard/GenerateHooksView'
import MyAnalysesView from '../components/dashboard/MyAnalysesView'
import ProfileView from '../components/dashboard/ProfileView'
import { useAuth } from '../hooks/useAuth'

const SIDEBAR_WIDTH = 260

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'overview' | 'analizar' | 'hooks' | 'perfil' | 'historial'>('overview')
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: '#070708',
        display: 'flex',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px at 10% 10%, rgba(255, 206, 69, 0.08), transparent 50%), radial-gradient(900px at 90% 20%, rgba(103, 80, 164, 0.12), transparent 45%), radial-gradient(900px at 50% 100%, rgba(33, 150, 243, 0.08), transparent 45%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Sidebar fijo */}
      <Box
        component="aside"
        sx={{
          width: { xs: 0, md: SIDEBAR_WIDTH },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            height: '100vh',
            zIndex: 1200,
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            background: 'linear-gradient(180deg, rgba(17,17,19,0.92) 0%, rgba(12,12,14,0.94) 100%)',
          }}
        >
          <Sidebar
            selected={activeView}
            onChange={(id) => setActiveView(id as typeof activeView)}
            onLogout={handleLogout}
          />
        </Box>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: { xs: 2.5, sm: 3.5, md: 4 },
            pb: { xs: 12, md: 5 },
            maxWidth: { xs: '100%', lg: 1280 },
            width: '100%',
            mx: 'auto',
            gap: 2,
          }}
        >
          {activeView === 'overview' ? (
            <OverviewView />
          ) : activeView === 'historial' ? (
            <MyAnalysesView />
          ) : activeView === 'analizar' ? (
            <AnalyzeVideoView />
          ) : activeView === 'hooks' ? (
            <GenerateHooksView />
          ) : activeView === 'perfil' ? (
            <ProfileView />
          ) : null}
        </Box>
      </Box>

      {/* Bottom Navigation (Mobile) */}
      <BottomNavigation activeView={activeView} onChange={(view) => setActiveView(view as typeof activeView)} />
    </Box>
  )
}

export default Dashboard

