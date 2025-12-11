import { motion } from 'framer-motion'
import './HeroSection.css'

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <div className="hero-section">
      <div className="hero-container">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="badge-new">New</span>
          <span className="badge-text">Encuentra los hooks más virales</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Encuentra la estructura perfecta
          <br />
          para tus reels
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Hacer videos virales nunca fue tan fácil
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            className="btn-primary"
            onClick={() => scrollToSection('contacto')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Empezar ahora
          </motion.button>
          <motion.button
            className="btn-secondary"
            onClick={() => scrollToSection('servicios')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver servicios
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection

