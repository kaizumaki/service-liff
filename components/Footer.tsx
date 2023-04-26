import {Box, Fab, Paper, Typography} from '@mui/material'
import QrCode2Icon from '@mui/icons-material/QrCode2';

interface Props {
  isSelected: boolean
  totalPoint: number
  onClick: () => void
}


const Footer = (props: Props) => {
  const {isSelected, totalPoint, onClick} = props
  return <Paper
    sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 192))",
      justifyContent: "right",
      display: "flex",
    }} elevation={0}>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100%"
        textAlign="right"
      >
        <Box flexGrow={1}></Box>
        <Typography
          variant='body1'
          color={isSelected? "white": "gray"}
        >QR コードを表示する</Typography>
        <Typography
          variant='h5' color="white"
          mb={1}
        >{totalPoint} もりポ</Typography>
      </Box>
    <Fab size="large" disabled={!isSelected} onClick={onClick} sx={{ backgroundColor: "white", mt: 1, ml: 1, mr: 2, mb: 2 }}>
      <QrCode2Icon />
    </Fab>
  </Paper>
}

export default Footer