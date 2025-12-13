import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import StarryBackground from '../components/StarryBackground'
import AuthForm from '../components/auth/AuthForm'
import Logo from '../components/ui/Logo'

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // TODO: Implementar lógica de login con Supabase
    console.log('Login:', { email, password })

    // Simulación de login
    setTimeout(() => {
      setIsLoading(false)
      // TODO: Redirigir al dashboard después de login exitoso
      // navigate('/dashboard')
    }, 1000)
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
        />
      </div>
    </div>
  )
}

export default LoginPage

