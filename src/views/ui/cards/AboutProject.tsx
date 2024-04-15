import { Box, Card, CardContent, Grid, Typography } from '@mui/material'

export default function AboutProject({ data }) {
  const { projectTitle, description, requirement, deadline, tax } = data

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                {projectTitle}
              </Typography>
              {description}
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Financiación Requerida:
              </Typography>
              <Typography variant='h1' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                $ {requirement}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Plazo:
              </Typography>
              <Typography variant='h1' sx={{ mb: 4, color: 'text.disabled' }}>
                {deadline} meses
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                Tasa de interés:
              </Typography>
              <Typography variant='h1' sx={{ mb: 4, color: 'text.disabled' }}>
                {tax} %
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
