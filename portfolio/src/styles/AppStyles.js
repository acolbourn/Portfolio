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
    // display: 'flex',
    flex: 1,
    // Needed for home page canvas to let the size shrink w/out overflow
    // minWidth: 0,
    // minHeight: 0,
  },
}));

export default useStyles;
