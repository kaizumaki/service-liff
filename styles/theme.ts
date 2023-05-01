import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#176043',
      contrastText: '#fff',
    },
    action: {
      disabled: "rgba(255, 255, 255, 0.4)",
      disabledBackground: "rgba(0, 0, 0, 0.4)",
    }
  },
});

export default theme;
