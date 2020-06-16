import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogContent-root': {
      paddingTop: 0,
    },
    '& .MuiPaper-root': {
      maxWidth: '800px',
      width: '90%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  },
  title: {
    paddingBottom: 8,
  },
  dividerContainer: {
    flex: 'none',
  },
  headerDivider: {
    marginTop: '9px',
    marginBottom: '10px',
  },
  desc: {
    marginTop: '16px',
    marginBottom: 0,
  },
  closeButton: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    cursor: 'pointer',
  },
}));

export default useStyles;
