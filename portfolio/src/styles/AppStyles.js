import { makeStyles, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const colors = {
  background: '#1D1D1D',
  // primary: '#91C3DC', // light blue from retirement site
  // primary: '#4086AA', // dark blue from retirement site
  primary: '#29BFF7', 
  // primary: '#08fdd8', // green from jj site
  // primary: "#FD1056", // red from jj site
  secondary: '#444',
  fadedBlue: '#4086AA',
}

let theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  colors: {
    background: colors.background,    
    primary: colors.primary,     
    secondary: colors.secondary,
    fadedBlue: colors.fadedBlue,
  },
  fonts: {
    primary: 'Montserrat, sans-serif',
  },
  // Material-UI global overrides
  overrides: {
    MuiButton: {            
      containedPrimary: {        
        backgroundColor: colors.fadedBlue,
        '&:hover:not($disabled)': {
          backgroundColor: colors.primary
        }
      },      
      textPrimary: {        
        color: colors.fadedBlue,
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: colors.fadedBlue
        }
      }
    },
    MuiInput: {
      underline: {        
        '&$focused:after': {
          borderBottomColor: colors.fadedBlue
        }                          
      }
    },    
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#1D1D1D',
  },
  nav: {
    height: '64px',
    [theme.breakpoints.down('xs')]: {
      height: '56px',
    },
  },
  body: {
    backgroundColor: '#1D1D1D',
    flex: 1,
  },
}));

theme = responsiveFontSizes(theme);

export {useStyles, theme};
