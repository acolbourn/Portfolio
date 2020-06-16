import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  swipeContainer: {
    width: '100%',
    height: '100%',
    '& .react-swipeable-view-container': {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

export default useStyles;
