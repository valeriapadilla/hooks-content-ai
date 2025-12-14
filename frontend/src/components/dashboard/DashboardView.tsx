import { Paper, Typography } from '@mui/material'

interface DashboardViewProps {
  message: string
}

const DashboardView = ({ message }: DashboardViewProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: 'center',
        borderRadius: 4,
        background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontSize: '0.9375rem',
        }}
      >
        {message}
      </Typography>
    </Paper>
  )
}

export default DashboardView

