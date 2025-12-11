import { motion } from 'framer-motion'

interface HeroTitleProps {
  title: React.ReactNode
  subtitle: string
}

const HeroTitle = ({ title, subtitle }: HeroTitleProps) => {
  // Extract text from ReactNode and split into words
  const getTextFromNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (Array.isArray(node)) {
      return node.map(getTextFromNode).join(' ')
    }
    if (node && typeof node === 'object' && 'props' in node) {
      if (node.props.children) {
        return getTextFromNode(node.props.children)
      }
    }
    return ''
  }

  const titleText = getTextFromNode(title) || 'Encuentra la estructura perfecta para tus reels'
  const words = titleText.split(/\s+/).filter(word => word.length > 0)

  return (
    <>
      <motion.h1
        className="text-[56px] font-bold leading-[1.1] mb-4 tracking-tight text-text"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {words.map((word, index) => (
          <span key={index}>
            <span
              className="inline-block opacity-100 blur-0"
              style={{ willChange: 'transform' }}
            >
              {word}
            </span>
            {index < words.length - 1 && '\u00A0'}
          </span>
        ))}
      </motion.h1>
      <motion.p
        className="text-[clamp(1rem,1.8vw,1.125rem)] text-text-secondary mb-8 font-normal leading-relaxed max-w-[700px] mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {subtitle}
      </motion.p>
    </>
  )
}

export default HeroTitle
