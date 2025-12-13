import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import StarryBackground from '../components/StarryBackground'
import AuthForm from '../components/auth/AuthForm'
import Logo from '../components/ui/Logo'
import { useAuth } from '../hooks/useAuth'

const LoginPage = () => {
  const navigate = useNavigate()
  const { signIn, isLoading, error } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signIn({ email, password })
      // Redirigir al dashboard después de login exitoso
      navigate('/dashboard')
    } catch (err) {
      // El error ya está manejado por useAuth
      console.error('Error al iniciar sesión:', err)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-16">
      <StarryBackground />
      
      {/* Header con Logo */}
      <div className="absolute top-8 left-0 right-0 z-[100]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <Logo />
        </div>
      </div>

      {/* Form */}
      <div className="relative z-[1] w-full">
        <AuthForm
          title="Iniciar sesión"
          subtitle="Bienvenido de vuelta"
          fields={[
            {
              name: 'email',
              label: 'Correo electrónico',
              type: 'email',
              placeholder: 'tu@email.com',
              required: true
            },
            {
              name: 'password',
              label: 'Contraseña',
              type: 'password',
              placeholder: '••••••••',
              required: true
            }
          ]}
          submitLabel="Iniciar sesión"
          onSubmit={handleSubmit}
          linkText="¿No tienes una cuenta?"
          linkTo="/signup"
          linkLabel="Crear cuenta"
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}

export default LoginPage

