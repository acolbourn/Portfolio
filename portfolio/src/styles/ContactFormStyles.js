import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minWidth: '150px',
    maxWidth: '600px',
    maxHeight: '780px',
    padding: '2rem',
    '@media (max-height: 800px)': {
      padding: '0.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      margin: 'auto',
      padding: '5px',
      width: '90%',
      height: '80%',
      '@media (max-height: 800px)': {
        height: '100%',
        width: '100%',
      },
    },
  },
  form: {
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
    '& .MuiFormGroup-root': {
      marginBottom: theme.spacing(5),
      '@media (max-height: 800px)': {
        marginBottom: theme.spacing(3),
      },
    },
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: '0',
    },
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline-flex',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonPosition: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    '@media (max-height: 800px)': {
      marginTop: '0',
    },
  },
}));

export default useStyles;
