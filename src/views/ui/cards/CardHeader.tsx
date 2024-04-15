// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

// import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// import Icon from 'src/@core/components/icon'
import { Rating } from '@mui/material'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 108,
  height: 108,
  borderRadius: theme.shape.borderRadius,
  border: `4px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

export default function CardHeader({ data }) {
  const { image, name, rate } = data

  return (
    <Card sx={{ mb: 10 }}>
      <CardMedia
        component='img'
        alt='profile-header'
        image={image}
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture
          src={'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
          alt='profile-picture'
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 2.5 }}>
              {name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Rating readOnly value={rate} name='read-only' sx={{ ml: 2 }} />
            </Box>
          </Box>
          {/* <Button variant='contained' sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='tabler:check' fontSize='1.125rem' />
            Connected
          </Button> */}
        </Box>
      </CardContent>
    </Card>
  )
}
