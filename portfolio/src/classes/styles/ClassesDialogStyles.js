import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialogContent-root': {
      paddingTop: 0,
    },
    '& .MuiPaper-root': {
      maxWidth: '800px',      
    },
  },
  title: {
    paddingBottom: 3,
    fontSize: '1.29rem',
  },
  grade: {
    marginBottom: '4px',
  },
  classLink: {
    margin: 0,
    '& .MuiTypography-colorPrimary': {
      color: theme.colors.primary
    }
  },
  headerDivider: {
    marginTop: '9px',
    marginBottom: '10px',
  },
  desc: {
    marginTop: '16px',
    marginBottom: 0,
  },
  projectDivider: {
    marginTop: '10px',
  },
  closeButton: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    cursor: 'pointer',
  },
}));

export default useStyles;
