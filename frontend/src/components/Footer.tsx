import Logo from './ui/Logo'

interface FooterProps {
  onNavigate: (section: string) => void
}

const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-black/80 border-t border-white/10 py-12 px-8 mt-16 relative z-[2]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-[2fr_1fr] gap-12 mb-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-text-secondary text-sm max-w-[300px]">
              Aprende a crear contenido viral con el poder de la IA
            </p>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-base font-semibold mb-2 text-text">Navegación</h4>
              <button
                className="text-text-secondary text-sm transition-colors duration-300 hover:text-text text-left p-0 bg-transparent border-none cursor-pointer"
                onClick={() => onNavigate('home')}
              >
                Home
              </button>
              <button
                className="text-text-secondary text-sm transition-colors duration-300 hover:text-text text-left p-0 bg-transparent border-none cursor-pointer"
                onClick={() => onNavigate('servicios')}
              >
                Servicios
              </button>
              <button
                className="text-text-secondary text-sm transition-colors duration-300 hover:text-text text-left p-0 bg-transparent border-none cursor-pointer"
                onClick={() => onNavigate('contacto')}
              >
                Contacto
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-base font-semibold mb-2 text-text">Redes Sociales</h4>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary text-sm transition-colors duration-300 hover:text-text"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary text-sm transition-colors duration-300 hover:text-text"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary text-sm transition-colors duration-300 hover:text-text"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-text-secondary text-sm">
          <p>© {new Date().getFullYear()} Hooks Content. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
