# Hooks AI - Frontend

Aplicación web para ayudar a creadores de contenido a construir hooks efectivos y aprender de videos virales mediante análisis inteligente.

## Propósito

Permite a los usuarios analizar videos exitosos para:
- Identificar hooks efectivos y reutilizables
- Generar scripts base personalizables
- Aprender patrones de contenido viral
- Crear hooks propios basados en ideas

## Tecnologías

- **React**: Biblioteca para interfaces de usuario
- **TypeScript**: Tipado estático
- **Material-UI (MUI)**: Componentes de UI
- **React Router DOM**: Navegación
- **Framer Motion**: Animaciones
- **Vite**: Build tool

## Metodologías

El código sigue **SRP (Single Responsibility Principle)** y **DRY (Don't Repeat Yourself)**:

- `components/`: Componentes reutilizables
- `services/`: Comunicación con API
- `hooks/`: Custom hooks (useAuth, etc.)
- `pages/`: Páginas principales
- `utils/`: Utilidades compartidas

## Variables de Entorno

```env
VITE_API_URL=http://localhost:8000
```
