import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardTopBar from '../components/dashboard/DashboardTopBar'
import DashboardView from '../components/dashboard/DashboardView'
import AnalyzeVideoView from '../components/dashboard/AnalyzeVideoView'
import MyAnalysesView from '../components/dashboard/MyAnalysesView'
import ProfileView from '../components/dashboard/ProfileView'
import StarryBackground from '../components/StarryBackground'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'analizar' | 'hooks' | 'perfil' | 'historial'>('analizar')
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  const handleNavigate = (view: string) => {
    setActiveView(view as typeof activeView)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <DashboardTopBar onNavigate={handleNavigate} onLogout={handleLogout} />
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
          }}
        >
          <Sidebar 
            selected={activeView === 'historial' ? 'analizar' : activeView} 
            onChange={(id) => {
              setActiveView(id as typeof activeView)
            }} 
          />
          <Box
            component="main"
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {activeView === 'historial' ? (
              <MyAnalysesView />
            ) : activeView === 'analizar' ? (
              <AnalyzeVideoView />
            ) : activeView === 'hooks' ? (
              <DashboardView message="Pronto podrás ver aquí tus hooks generados más recientes." />
            ) : activeView === 'perfil' ? (
              <ProfileView />
            ) : (
              <DashboardView message="Pronto podrás actualizar tu información y preferencias aquí." />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Dashboard

