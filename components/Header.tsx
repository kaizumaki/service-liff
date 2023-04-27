import { AppBar, Toolbar, Box } from '@mui/material'
import Image from 'next/image'


const Header = () => {
  return <AppBar sx={{background: "#FFF", alignContent: "center"}}>
    <Toolbar>
      <Box display="flex" justifyContent="center" flexGrow={1}>
        <Image src="/logo.png" alt="もりポ ロゴ" height={72} width={163.5} style={{margin: 4}} />
      </Box>
    </Toolbar>
  </AppBar>
}

export default Header
