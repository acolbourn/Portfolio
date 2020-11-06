import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '10px',
    '& div:nth-child(2)': {
      height: '48px',
      right: 'calc(50% - 120px)',
      top: 'calc(100% - 62px)',
      '& button': {
        top: 0,
      },
      '& .MuiButtonBase-root': {
        opacity: '1 !important',
        filter: 'none !important',
        backgroundColor: '#585858',
        '&:hover': {
          backgroundColor: '#707070',
        },
      },
    },
    '& div:nth-child(3)': {
      height: '48px',
      left: 'calc(50% - 120px)',
      top: 'calc(100% - 62px)',
      '& button': {
        top: 0,
      },
      '& .MuiButtonBase-root': {
        opacity: '1 !important',
        filter: 'none !important',
        backgroundColor: '#585858',
        '&:hover': {
          backgroundColor: '#707070',
        },
      },
    },
    '& div:nth-child(4)': {
      padding: '20px',
    },
    "& [class*='Carousel-active']": {
      color: '#dc3545',
    },
  },
  carouselPaper: {
    width: '100% !important',
    textAlign: 'center',
  },
  singleVidPaper: {
    width: '100% !important',
    textAlign: 'center',
    marginBottom: '16px',
  },
  playerContainer: {
    position: 'relative',
    paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,
  },
  youtube: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  vidDescription: {
    padding: '0.75rem',
  },
}));

export default useStyles;
