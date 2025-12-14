import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import FeatureTag from './home/FeatureTag'
import HeroTitle from './home/HeroTitle'
import HeroCTA from './home/HeroCTA'

const HomeSection = () => {
  const navigate = useNavigate()
  
  return (
    <section id="home" className="flex items-center justify-center min-h-screen pt-24 pb-16 px-8 text-center">
      <div className="container">
        <motion.div
          className="max-w-[900px] mx-auto w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FeatureTag badge="New" text="Encuentra los hooks más virales" />
          <HeroTitle
            title={
              <>
                Encuentra la estructura perfecta
                <br />
                para tus reels
              </>
            }
            subtitle="Hacer videos virales nunca fue tan fácil"
          />
          <HeroCTA
            label="Empezar ahora"
            onClick={() => navigate('/signup')}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default HomeSection
