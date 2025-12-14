import { motion } from 'framer-motion'
import { useContactForm } from '../../hooks/useContactForm'

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void
}

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const { formData, handleChange, handleSubmit } = useContactForm()

  const onFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e, onSubmit)
  }

  return (
    <motion.div
      className="bg-white/3 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-[10px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <form className="flex flex-col gap-5" onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-text">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text text-sm font-inherit transition-all duration-300 focus:outline-none focus:border-[#FFCE45] focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(255,206,69,0.1)] placeholder:text-text-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-text">Correo</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text text-sm font-inherit transition-all duration-300 focus:outline-none focus:border-[#FFCE45] focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(255,206,69,0.1)] placeholder:text-text-secondary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-medium text-text">
            Nota <span className="text-text-secondary font-normal">(opcional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Cuéntanos sobre tu proyecto..."
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text text-sm font-inherit transition-all duration-300 focus:outline-none focus:border-[#FFCE45] focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(255,206,69,0.1)] placeholder:text-text-secondary resize-y min-h-[100px]"
          />
        </div>

        <button 
          type="submit" 
          className="w-full justify-center mt-2 px-4 py-2.5 text-sm rounded-md font-normal border-none bg-[#FFCE45] text-[#0A0A0A] hover:bg-[#E6B83D] transition-colors duration-200 font-medium shadow-[rgba(0,0,0,0.15)_0px_0.706592px_0.706592px_-0.625px,rgba(0,0,0,0.145)_0px_1.80656px_1.80656px_-1.25px,rgba(0,0,0,0.137)_0px_3.62176px_3.62176px_-1.875px,rgba(0,0,0,0.125)_0px_6.8656px_6.8656px_-2.5px,rgba(0,0,0,0.106)_0px_13.6468px_13.6468px_-3.125px,rgba(0,0,0,0.05)_0px_30px_30px_-3.75px] cursor-pointer"
        >
          Enviar
        </button>
      </form>
    </motion.div>
  )
}

export default ContactForm
