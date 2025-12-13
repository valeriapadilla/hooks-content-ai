export interface DashboardNavItem {
  id: string
  label: string
  icon: 'search' | 'bolt' | 'user'
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { id: 'analizar', label: 'Analizar Video', icon: 'search' },
  { id: 'hooks', label: 'Generar Hooks', icon: 'bolt' },
  { id: 'perfil', label: 'Perfil', icon: 'user' },
]

