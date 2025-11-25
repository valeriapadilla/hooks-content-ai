import { motion } from 'framer-motion'

interface FeatureTagProps {
  badge: string
  text: string
}

const FeatureTag = ({ badge, text }: FeatureTagProps) => {
  return (
    <motion.div
      className="inline-flex items-center mb-6 rounded-[20px] overflow-hidden border border-[#222222] bg-[rgba(13,13,13,0.8)]"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <span className="bg-[#FFCE45] text-[#0A0A0A] px-3 py-1.5 rounded-xl text-xs font-medium">
        {badge}
      </span>
      <span className="bg-transparent text-text px-3 py-1.5 text-xs">
        {text}
      </span>
    </motion.div>
  )
}

export default FeatureTag
