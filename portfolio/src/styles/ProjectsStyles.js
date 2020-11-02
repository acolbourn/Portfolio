import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '400',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardGrid: {
    flex: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 400px))',
    gridAutoRows: 'min-content',
    justifyContent: 'center',
    margin: 0,
    gap: '28px',
    padding: '28px',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 350px))',
      gap: '15px',
      padding: '15px',
    },
    '@media (max-width: 761px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 400px))',
      gap: '14px',
      padding: '14px',
    },
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    '& .MuiToggleButton-root': {
      width: '100%',
    },
    '& .MuiToggleButtonGroup-root': {
      width: '100%',
    },
    '& .Mui-selected': {
      backgroundColor: 'rgb(64 134 170 / 25%)',
      '&:hover': {
        backgroundColor: 'rgb(64 134 170 / 45%)',
      },
    },
  },
}));

export default useStyles;
