import { motion } from 'framer-motion'
import ServiceItem from './services/ServiceItem'
import { SERVICES } from '../constants/services'

const ServicesSection = () => {
  return (
    <section id="servicios" className="min-h-screen flex items-center justify-center py-32 px-12 md:px-16 lg:px-24 relative">
      <div className="container max-w-[1200px] w-full">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-block px-5 py-2 mb-6 rounded-full border border-white/20 bg-white/5 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Nuestros Servicios
          </motion.div>
        </motion.div>

        <div className="space-y-0">
          {SERVICES.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
