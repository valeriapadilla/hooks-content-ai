interface DashboardEmptyStateProps {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

const DashboardEmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
}: DashboardEmptyStateProps) => {
  return (
    <div className="bg-bg-secondary/80 border border-white/5 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#FFCE45] text-2xl">
        ⚡️
      </div>
      <h2 className="text-2xl font-semibold text-text">{title}</h2>
      <p className="text-text-secondary text-sm max-w-md">{description}</p>
      <button
        className="mt-2 px-4 py-2 text-sm rounded-lg font-medium text-[#0A0A0A] bg-[#FFCE45] hover:bg-[#E6B83D] transition-colors"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </div>
  )
}

export default DashboardEmptyState

