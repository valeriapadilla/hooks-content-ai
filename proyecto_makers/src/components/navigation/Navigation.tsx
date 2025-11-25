import NavLink from './NavLink'

interface NavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
  items: ReadonlyArray<{ readonly id: string; readonly label: string }>
}

const Navigation = ({ activeSection, onNavigate, items }: NavigationProps) => {
  return (
    <nav className="flex gap-10 items-center">
      {items.map((item) => (
        <NavLink
          key={item.id}
          label={item.label}
          sectionId={item.id}
          isActive={activeSection === item.id}
          onClick={onNavigate}
        />
      ))}
    </nav>
  )
}

export default Navigation
