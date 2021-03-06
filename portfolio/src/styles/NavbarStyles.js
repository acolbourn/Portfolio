import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#181818',
    color: theme.colors.secondary,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  icon: {
    margin: '0 4px',
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
    color: theme.colors.secondary,
    transition: 'color 0.2s',
    '& svg': {
      opacity: '1',
      transition: 'opacity 0.2s',
    },
    '& div': {
      opacity: '0',
      transition: 'opacity 0.2s',
    },
    '&:hover': {
      textDecoration: 'none',
      color: theme.colors.primary,
      '& svg': {
        opacity: '0',
      },
      '& div': {
        opacity: '1',
      },
    },
  },
  navGroup: {
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
      marginLeft: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      left: '50%',
      marginLeft: '-155px',
    },
    '@media (max-width: 650px)': {
      left: '45%',
    },
  },
  navLink: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: '23px',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '30px',
    },
  },
  navLinkText: {
    fontFamily: 'ProximaNova, AvenirNextCyr, sans-serif',
    fontWeight: '400',
    fontSize: '13px',
    width: '62px',
    position: 'absolute',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px',
      top: '15.5px',
    },
  },
  socialGroup: {
    marginLeft: 'auto',
  },
  socialLink: {
    fontSize: '18px',
    width: '100%',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 75,
  },
  paper: {
    backgroundColor: '#181818',
  },
  logo: {
    marginLeft: '-10px',
    width: '45px',
  },
  activePage: {
    '& .MuiSvgIcon-root': {
      color: theme.colors.primary,
    },
  },
}));

export default useStyles;
