import { motion } from 'framer-motion'
import Input from './Input'
import { Link } from 'react-router-dom'

interface AuthFormProps {
  title: string
  subtitle?: string
  fields: Array<{
    name: string
    label: string
    type: string
    placeholder: string
    required?: boolean
  }>
  submitLabel: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  linkText?: string
  linkTo?: string
  linkLabel?: string
  isLoading?: boolean
  error?: string | null
}

const AuthForm = ({
  title,
  subtitle,
  fields,
  submitLabel,
  onSubmit,
  linkText,
  linkTo,
  linkLabel,
  isLoading = false,
  error = null
}: AuthFormProps) => {
  return (
    <motion.div
      className="w-full max-w-[420px] mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-white/3 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-[10px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-secondary text-sm">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {fields.map((field) => (
            <Input
              key={field.name}
              id={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              placeholder={field.placeholder}
              required={field.required}
              disabled={isLoading}
            />
          ))}

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full justify-center mt-2 px-4 py-2.5 text-sm rounded-lg font-normal border-none bg-[#FFCE45] text-[#0A0A0A] hover:bg-[#E6B83D] transition-colors duration-200 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Cargando...' : submitLabel}
          </button>
        </form>

        {/* Link */}
        {linkText && linkTo && linkLabel && (
          <div className="mt-6 text-center">
            <p className="text-text-secondary text-sm">
              {linkText}{' '}
              <Link
                to={linkTo}
                className="text-[#FFCE45] hover:text-[#E6B83D] font-medium transition-colors"
              >
                {linkLabel}
              </Link>
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default AuthForm

