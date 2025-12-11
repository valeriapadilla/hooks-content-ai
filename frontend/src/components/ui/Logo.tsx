import { cn } from '../../utils/cn'

interface LogoProps {
  className?: string
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className={cn('flex items-center gap-3 font-medium text-base text-text no-underline', className)}>
      <div className="relative w-8 h-8">
        {/* Cuadrado grande redondeado */}
        <div className="absolute inset-0 border-2 border-text rounded-lg"></div>
        
        {/* Cuadrado pequeño en la esquina inferior izquierda */}
        <div className="absolute bottom-0 left-0 w-3 h-3 border-2 border-text rounded-sm"></div>
        
        {/* Flecha diagonal desde esquina superior derecha hacia el cuadrado pequeño */}
        <svg
          className="absolute top-0 right-0 w-4 h-4 text-text"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L4 12M4 12H10M4 12V6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="tracking-[0.03em] font-bold">Hooks creators</span>
    </div>
  )
}

export default Logo
