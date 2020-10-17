import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.background,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTab-textColorPrimary': {
      color: theme.colors.primary
    },  
    '& .MuiTab-wrapper': {
      fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
      fontWeight: 500,
      fontSize: '0.95rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.76rem'
      },
    }  
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
  customIndicator: {
    backgroundColor: theme.colors.primary
  },  
}));

export default useStyles;
