import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#20d8da',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#CCCCCC',
      light: '#EEEEEE',
      contrastText: '#000000'
    },
    background: {
      default: '#CCCCCC'
    },

  }
});

export default theme;