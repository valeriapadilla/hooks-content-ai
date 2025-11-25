import { useState } from 'react'
import SidebarLink from './SidebarLink'
import { DASHBOARD_NAV_ITEMS } from '../../constants/dashboard'

interface SidebarProps {
  selected: string
  onChange: (id: string) => void
}

const Sidebar = ({ selected, onChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`bg-bg-secondary/80 border border-white/5 rounded-2xl p-4 flex flex-col gap-4 transition-all duration-300 ${
        isCollapsed ? 'w-[72px]' : 'w-full md:w-[240px]'
      }`}
    >
      <button
        className="self-end text-xs text-text-secondary border border-white/10 rounded-full px-3 py-1 hover:text-text transition-colors md:hidden"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Expandir' : 'Colapsar'}
      </button>

      <div className="flex flex-col gap-1">
        {DASHBOARD_NAV_ITEMS.map((item) => (
          <SidebarLink
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={selected === item.id}
            onClick={() => onChange(item.id)}
          />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar

