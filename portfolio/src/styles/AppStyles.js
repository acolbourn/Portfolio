import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#1d1d1d',
  },
  nav: {
    height: '64px',
    [theme.breakpoints.down('xs')]: {
      height: '56px',
    },
  },
  body: {
    flex: 1,
  },
}));

export default useStyles;
