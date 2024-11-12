import { makeStyles } from '@material-ui/core/styles';
import './HomeFallbackFont.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Syncopate, sans-serif',
    textAlign: 'center',
  },
  name: {
    color: theme.colors.primary,
    fontSize: '3.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.2rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7rem',
    },
  },
  titles: {
    color: theme.colors.primary,
    fontSize: '1.25rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem',
    },
  },
  logo: {
    width: '50%',
    maxWidth: '500px',
    paddingTop: '3.5rem',
  },
}));

export default useStyles;
