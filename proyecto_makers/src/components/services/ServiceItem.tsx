import { motion } from 'framer-motion'
import { Service } from '../../constants/services'

interface ServiceItemProps {
  service: Service
  index: number
}

const ServiceItem = ({ service, index }: ServiceItemProps) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Contenido de texto */}
      <motion.div
        className={`flex flex-col ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
      >
        {/* Badge/Categoría */}
        <motion.span
          className="inline-block w-fit px-3 py-1.5 rounded-lg bg-black text-white text-xs font-medium mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        >
          {service.category}
        </motion.span>

        {/* Título */}
        <motion.h3
          className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        >
          {service.title}
        </motion.h3>

        {/* Descripción */}
        <motion.p
          className="text-[clamp(0.875rem,1.25vw,1rem)] text-text-secondary leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
        >
          {service.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
        >
          {service.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              className="px-3 py-1.5 rounded-lg bg-black text-white text-sm font-normal border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.2 + 0.7 + tagIndex * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Placeholder para video */}
      <motion.div
        className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
      >
        <div className="w-full aspect-video rounded-xl bg-[#1a1a1a] border border-white/10 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full bg-[#2a2a2a] flex items-center justify-center">
            <motion.div
              className="text-text-secondary text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
            >
              Video demostrativo
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ServiceItem

