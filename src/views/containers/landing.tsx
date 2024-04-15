import { Grid } from '@mui/material'
import Box from '@mui/material/Box'
import CardAppleWatch from '../ui/cards/CardAppleWatch'
import projects from 'src/@fake-db/projects'

const LandingGrid = () => {
  return (
    <Box className='content-center'>
      <Grid container spacing={6}>
        {projects.map((project, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <CardAppleWatch props={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default LandingGrid
