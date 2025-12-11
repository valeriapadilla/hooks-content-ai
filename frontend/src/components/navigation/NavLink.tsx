import { cn } from '../../utils/cn'

interface NavLinkProps {
  label: string
  sectionId: string
  isActive: boolean
  onClick: (sectionId: string) => void
}

const NavLink = ({ label, sectionId, isActive, onClick }: NavLinkProps) => {
  return (
    <button
      className={cn(
        'bg-transparent border-none text-text text-sm cursor-pointer py-2 px-0 relative transition-colors duration-300 font-normal',
        'hover:text-text hover:opacity-80',
        isActive && 'text-text after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FFCE45] after:rounded-sm'
      )}
      onClick={() => onClick(sectionId)}
    >
      {label}
    </button>
  )
}

export default NavLink
