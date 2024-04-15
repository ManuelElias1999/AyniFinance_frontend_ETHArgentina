import { Grid } from '@mui/material'
import projects from 'src/@fake-db/projects'
import AboutProject from 'src/views/ui/cards/AboutProject'
import CardHeader from 'src/views/ui/cards/CardHeader'
import FormInvestment from 'src/views/ui/cards/FormInvestment'

function ProjectPage({ content }) {
  return (
    <>
      <CardHeader data={content} />
      <Grid container spacing={6}>
        <Grid item lg={4} md={5} xs={12}>
          {<AboutProject data={content} />}
        </Grid>
        <Grid item lg={8} md={7} xs={12}>
          <FormInvestment />
        </Grid>
      </Grid>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  const content = projects.filter(project => project.id == id)

  return {
    props: { content: content[0] }
  }
}

export default ProjectPage
