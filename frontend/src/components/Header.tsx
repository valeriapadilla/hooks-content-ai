import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Logo from './ui/Logo'
import Navigation from './navigation/Navigation'
import { NAVIGATION_ITEMS } from '../constants/navigation'

interface HeaderProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const Header = ({ activeSection, onNavigate }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleNavigate = (section: string) => {
    setIsMobileMenuOpen(false)
    // Pequeño delay para que el menú se cierre antes de hacer scroll
    setTimeout(() => {
      onNavigate(section)
    }, 150)
  }

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-[100] bg-black/30 backdrop-blur-[10px] border-b border-white/5"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4 md:gap-12">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Navigation
            activeSection={activeSection}
            onNavigate={onNavigate}
            items={NAVIGATION_ITEMS}
          />
          <button
            onClick={() => {
              // TODO: Implementar lógica de login
              console.log('Login clicked')
            }}
            className="px-[13px] py-[9px] text-sm rounded-lg font-normal text-[#0A0A0A] bg-[#FFCE45] hover:bg-[#E6B83D] transition-colors duration-200 border-none cursor-pointer font-medium"
          >
            Iniciar sesión
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          <motion.span
            className="w-6 h-0.5 bg-white rounded transition-all"
            animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white rounded transition-all"
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-white rounded transition-all"
            animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="md:hidden fixed top-[73px] left-0 w-full bg-black/95 backdrop-blur-[10px] border-b border-white/5 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col px-4 py-6 gap-3">
                {NAVIGATION_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    type="button"
                    className={`text-left px-4 py-3 rounded-lg text-sm font-normal transition-colors ${
                      activeSection === item.id
                        ? 'text-white bg-white/10'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    // TODO: Implementar lógica de login
                    console.log('Login clicked')
                  }}
                  type="button"
                  className="w-full px-[13px] py-[9px] text-sm rounded-lg font-normal text-white bg-[#814AC8] hover:bg-[#6d3db0] transition-colors duration-200 border-none cursor-pointer mt-2"
                >
                  Iniciar sesión
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
