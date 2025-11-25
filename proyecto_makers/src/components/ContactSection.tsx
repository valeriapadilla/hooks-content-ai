import { motion } from 'framer-motion'
import ContactForm from './contact/ContactForm'

const ContactSection = () => {
  const handleSubmit = (data: { name: string; email: string; message: string }) => {
    // TODO: Implement form submission
    console.log('Form submitted:', data)
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.')
  }

  return (
    <section id="contacto" className="min-h-screen flex items-center justify-center py-32 px-12 md:px-16 lg:px-24 relative">
      <div className="max-w-[600px] mx-auto w-full">
        <motion.div
          className="text-center mb-12"
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
            Contacto
          </motion.div>

          {/* Título */}
          <motion.h2
            className="text-[56px] font-bold leading-[1.1] mb-4 tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comienza Ahora
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            className="text-[clamp(1rem,1.8vw,1.125rem)] text-text-secondary mb-8 font-normal leading-relaxed max-w-[500px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Únete a los creadores que ya están creando contenido viral con IA
          </motion.p>
        </motion.div>

        <ContactForm onSubmit={handleSubmit} />
      </div>
    </section>
  )
}

export default ContactSection
