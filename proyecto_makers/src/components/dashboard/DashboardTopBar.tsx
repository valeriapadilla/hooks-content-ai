import Logo from '../ui/Logo'

interface DashboardTopBarProps {
  onNavigate: (section: string) => void
  onLogout: () => void
}

const DashboardTopBar = ({ onNavigate, onLogout }: DashboardTopBarProps) => {
  return (
    <header className="flex items-center justify-between pl-6 pr-8 py-4">
      <Logo />
      <div className="flex items-center gap-6 text-sm">
        <button
          className="text-text font-medium hover:text-[#FFCE45] transition-colors"
          onClick={() => onNavigate('historial')}
        >
          Mis análisis
        </button>
        <button 
          className="text-text-secondary hover:text-text transition-colors"
          onClick={onLogout}
        >
          Salir
        </button>
      </div>
    </header>
  )
}

export default DashboardTopBar

