import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '../../utils/cn'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'type'> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'px-8 py-3.5 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 border-none inline-flex items-center gap-2 font-inherit'
  
  const variantClasses = {
    primary: 'bg-primary text-[#0A0A0A] hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(255,206,69,0.3)] font-medium',
    secondary: 'bg-transparent text-text border-2 border-text hover:bg-text hover:text-bg'
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
