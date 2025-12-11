import { useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent, onSubmit?: (data: FormData) => void) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    setFormData({ name: '', email: '', message: '' })
  }

  const reset = () => {
    setFormData({ name: '', email: '', message: '' })
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    reset,
  }
}

