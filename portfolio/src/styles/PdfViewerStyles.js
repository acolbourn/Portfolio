import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfContainer: {
    height: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.25);',
    backgroundColor: 'white',
    color: 'black',
  },
  buttons: {
    padding: '1.5rem',
    paddingBottom: '0.5rem',
  },
  downloadLink: {
    paddingBottom: '0.5rem',
    fontSize: '1rem',
  },
}));

export default useStyles;
