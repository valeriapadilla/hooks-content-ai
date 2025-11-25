import Header from '../components/Header'
import HomeSection from '../components/HomeSection'
import ServicesSection from '../components/ServicesSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import StarryBackground from '../components/StarryBackground'
import { useScrollDetection } from '../hooks/useScrollDetection'
import { useScrollToSection } from '../hooks/useScrollToSection'
import { SECTIONS } from '../constants/navigation'

const HomePage = () => {
  const activeSection = useScrollDetection({ sections: SECTIONS })
  const scrollToSection = useScrollToSection()

  return (
    <div className="relative min-h-screen w-full">
      <StarryBackground />
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <main className="relative z-[1]">
        <HomeSection scrollToSection={scrollToSection} />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  )
}

export default HomePage

