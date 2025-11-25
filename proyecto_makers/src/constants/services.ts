export interface Service {
  category: string
  title: string
  description: string
  tags: string[]
}

export const SERVICES: Service[] = [
  {
    category: 'Análisis',
    title: 'Analiza Videos Virales',
    description:
      'Sube la URL de cualquier video exitoso y descubre qué lo hace viral. Analizamos hooks, estructura, timing y elementos clave que generan engagement.',
    tags: ['Hooks', 'Estructura', 'Timing'],
  },
  {
    category: 'Generación',
    title: 'Genera Hooks con IA',
    description:
      'Crea hooks irresistibles basados en los patrones de contenido viral. Nuestra IA aprende de millones de videos exitosos para darte las mejores ideas.',
    tags: ['IA', 'Hooks', 'Contenido'],
  },
]

