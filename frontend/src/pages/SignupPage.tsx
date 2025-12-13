import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import StarryBackground from '../components/StarryBackground'
import AuthForm from '../components/auth/AuthForm'
import Logo from '../components/ui/Logo'
import { useAuth } from '../hooks/useAuth'

const SignupPage = () => {
  const navigate = useNavigate()
  const { signUp, isLoading, error } = useAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signUp({ email, password, full_name: name })
      // Redirigir al dashboard después de registro exitoso
      navigate('/dashboard')
    } catch (err) {
      // El error ya está manejado por useAuth
      console.error('Error al registrar usuario:', err)
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
          title="Crear cuenta"
          subtitle="Comienza tu viaje hacia videos virales"
          fields={[
            {
              name: 'name',
              label: 'Nombre completo',
              type: 'text',
              placeholder: 'Tu nombre',
              required: true
            },
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
          submitLabel="Crear cuenta"
          onSubmit={handleSubmit}
          linkText="¿Ya tienes una cuenta?"
          linkTo="/login"
          linkLabel="Iniciar sesión"
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  )
}

export default SignupPage

