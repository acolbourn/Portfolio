import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // Calcs create a fixed size so canvas is forced to shrink when window is resized
    height: 'calc(100vh - 64px)',
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100vh - 56px)',
    },
    width: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  threeViewport: {
    flex: '1 1 auto',
    // Force canvas to not exceed page size and allow its size to go to 0
    minWidth: '0',
    minHeight: '0',
    overflow: 'hidden',
    touchAction: 'none',
  },
}));

export default useStyles;
