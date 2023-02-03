// ** MUI Import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { styled, useTheme } from '@mui/material/styles'

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(1)
  },
  marginLeft: 0,
}))

const FallbackSpinner = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Img height='38' alt='Seucontail' src='/images/logo.png' />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
