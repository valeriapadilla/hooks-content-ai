import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import DashboardTopBar from '../components/dashboard/DashboardTopBar'
import DashboardView from '../components/dashboard/DashboardView'
import AnalyzeVideoView from '../components/dashboard/AnalyzeVideoView'
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
    <div className="relative min-h-screen bg-bg text-text">
      <StarryBackground />
      <div className="relative z-[1] min-h-screen flex flex-col">
        <DashboardTopBar onNavigate={handleNavigate} onLogout={handleLogout} />
        <div className="flex flex-1 flex-col md:flex-row gap-6 p-4 md:p-8">
          <Sidebar 
            selected={activeView === 'historial' ? 'analizar' : activeView} 
            onChange={(id) => {
              setActiveView(id as typeof activeView)
            }} 
          />
          <main className="flex-1">
            {activeView === 'historial' ? (
              <DashboardView message="Pronto podrás ver aquí tu historial de análisis más recientes." />
            ) : activeView === 'analizar' ? (
              <AnalyzeVideoView />
            ) : activeView === 'hooks' ? (
              <DashboardView message="Pronto podrás ver aquí tus hooks generados más recientes." />
            ) : (
              <DashboardView message="Pronto podrás actualizar tu información y preferencias aquí." />
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

