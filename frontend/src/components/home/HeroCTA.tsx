import { motion } from 'framer-motion'

interface HeroCTAProps {
  label: string
  onClick: () => void
}

const HeroCTA = ({ label, onClick }: HeroCTAProps) => {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      <button
        onClick={onClick}
        className="px-[13px] py-[9px] text-sm rounded-lg font-normal text-[#0A0A0A] bg-[#FFCE45] hover:bg-[#E6B83D] transition-colors duration-200 border-none cursor-pointer inline-flex items-center gap-2 font-medium"
      >
        {label}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block"
        >
          <line x1="7" y1="17" x2="17" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="7 7 17 7 17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </motion.div>
  )
}

export default HeroCTA
