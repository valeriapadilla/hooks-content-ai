export interface DashboardNavItem {
  id: string
  label: string
  icon: 'dashboard' | 'search' | 'bolt' | 'user' | 'history' | 'logout'
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { id: 'overview', label: 'Vista General', icon: 'dashboard' },
  { id: 'analizar', label: 'Analizar Video', icon: 'search' },
  { id: 'hooks', label: 'Generar Hooks', icon: 'bolt' },
  { id: 'perfil', label: 'Perfil', icon: 'user' },
]

