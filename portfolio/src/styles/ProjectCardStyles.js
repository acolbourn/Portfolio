import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: (featured) => ({
    border: featured ? '1px solid #08fdd8' : 'none',
    width: '100%',
    height: '500px',
    '@media (max-width: 1280px)': {
      height: '450px',
    },
    '@media (max-width: 1150px)': {
      height: '475px',
    },
    '@media (max-width: 960px)': {
      height: '400px',
    },
    '@media (max-width: 750px)': {
      height: '450px',
    },
    '@media (max-width: 600px)': {
      height: '360px',
    },
    '@media (max-width: 420px)': {
      height: '400px',
    },
    '@media (max-width: 360px)': {
      height: '420px',
    },
    display: 'flex',
  }),
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiCardContent-root': {
      flex: 1,
    },
  },
}));

export default useStyles;
