// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Rating, Box } from '@mui/material'
import Link from 'next/link'

type content = {
  id: string
  name: string
  rate: number
  image: string
  projectTitle: string
  requirement: number
  description: string
  tax: number
  deadline: number
}

const CardAppleWatch = ({ props }: { props: content }) => {
  const { id, name, rate, image, projectTitle, requirement, description, deadline, tax } = props

  return (
    <Card>
      <CardMedia sx={{ height: '9.375rem' }} image={image} />
      <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='h3' sx={{ mb: 2 }}>
          {projectTitle} | $ {requirement}
        </Typography>

        <Typography variant='h5' sx={{ mb: 2 }}>
          Plazo: {deadline} meses | Tasa anual: {tax}%
        </Typography>

        <Typography sx={{ mb: 5, color: 'text.secondary' }}>{description}</Typography>

        <Box sx={{ mb: 4.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ color: 'text.secondary' }}> {name}</Typography>
          <Rating readOnly value={rate} name='read-only' sx={{ ml: 2 }} />
        </Box>
      </CardContent>
      <Link href={`/project/${id}`}>
        <Button variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          Invertir
        </Button>
      </Link>
    </Card>
  )
}

export default CardAppleWatch
