import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import ProximaNovaLightWoff2 from '../fonts/ProximaNova-Light.woff2';
import AvenirNextCyrLightWoff2 from '../fonts/AvenirNextCyr-Light.woff2';
import AvenirNextCyrThinWoff2 from '../fonts/AvenirNextCyr-Thin.woff2';

// Setup self-hosted fonts
const proximaNovaLight = {
  fontFamily: 'ProximaNova',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('ProximaNova'),
    local('ProximaNova-Light'),
    url(${ProximaNovaLightWoff2}) format('woff2')
  `,
};

const avenirNextCyrLight = {
  fontFamily: 'AvenirNextCyr',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('AvenirNextCyr'),
    local('AvenirNextCyr-Light'),
    url(${AvenirNextCyrLightWoff2}) format('woff2')
  `,
};

const avenirNextCyrThin = {
  fontFamily: 'AvenirNextCyr',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
    local('AvenirNextCyr'),
    local('AvenirNextCyr-Thin'),
    url(${AvenirNextCyrThinWoff2}) format('woff2')
  `,
};

const colors = {
  background: '#1D1D1D',
  primary: '#29BFF7',
  secondary: '#444',
  fadedBlue: '#4086AA',
};

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
    primary: 'ProximaNova, AvenirNextCyr, sans-serif',
  },
  // Material-UI global overrides
  typography: {
    fontFamily: ['ProximaNova, AvenirNextCyr, sans-serif'],
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [proximaNovaLight, avenirNextCyrLight, avenirNextCyrThin],
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: colors.fadedBlue,
        '&:hover:not($disabled)': {
          backgroundColor: colors.primary,
        },
      },
      textPrimary: {
        color: colors.fadedBlue,
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: colors.fadedBlue,
        },
      },
    },
    MuiInput: {
      underline: {
        '&$focused:after': {
          borderBottomColor: colors.fadedBlue,
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: colors.background,
  },
  nav: {
    height: '64px',
    [theme.breakpoints.down('xs')]: {
      height: '56px',
    },
  },
  body: {
    backgroundColor: colors.background,
    flex: 1,
  },
}));

theme = responsiveFontSizes(theme);

export { useStyles, theme };
