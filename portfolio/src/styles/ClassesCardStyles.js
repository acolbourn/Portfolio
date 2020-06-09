import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: (featured) => ({
    border: featured ? '1px solid #08fdd8' : 'none',
    position: 'relative',
    height: 308,
    width: 330,
    '@media (max-width: 340px)': {
      width: 300,
    },
  }),
  media: {
    height: 140,
  },
  bulletPoints: {
    listStylePosition: 'inside',
    paddingLeft: 0,
  },
});

export default useStyles;
