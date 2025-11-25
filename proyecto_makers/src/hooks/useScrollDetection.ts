import { useState, useEffect } from 'react'

interface UseScrollDetectionOptions {
  sections: string[]
  offset?: number
}

export const useScrollDetection = ({
  sections,
  offset = 200,
}: UseScrollDetectionOptions) => {
  const [activeSection, setActiveSection] = useState(sections[0] || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, offset])

  return activeSection
}

