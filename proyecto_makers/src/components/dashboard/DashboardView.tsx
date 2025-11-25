interface DashboardViewProps {
  message: string
}

const DashboardView = ({ message }: DashboardViewProps) => {
  return (
    <div className="bg-bg-secondary/80 border border-white/5 rounded-2xl p-8 text-center">
      <p className="text-text-secondary text-sm">{message}</p>
    </div>
  )
}

export default DashboardView

