import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../utils/authStorage'

interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * Componente para proteger rutas que requieren autenticación.
 * Redirige al login si el usuario no está autenticado.
 */
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

