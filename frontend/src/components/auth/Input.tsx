import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium text-text"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-text text-sm font-inherit transition-all duration-300 focus:outline-none focus:border-[#FFCE45] focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(255,206,69,0.1)] placeholder:text-text-secondary",
            error && "border-red-500/50 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-400 mt-1">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

