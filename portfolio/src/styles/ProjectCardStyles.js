import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: (featured) => ({
    border: featured ? '1px solid' : 'none',
    borderColor: theme.colors.primary,
    width: '100%',
    height: '100%',
    // height: '500px',
    // '@media (max-width: 1280px)': {
    //   height: '450px',
    // },
    // '@media (max-width: 1150px)': {
    //   height: '475px',
    // },
    // '@media (max-width: 960px)': {
    //   height: '400px',
    // },
    // '@media (max-width: 750px)': {
    //   height: '450px',
    // },
    // '@media (max-width: 600px)': {
    //   height: '360px',
    // },
    // '@media (max-width: 420px)': {
    //   height: '400px',
    // },
    // '@media (max-width: 360px)': {
    //   height: '420px',
    // },
    display: 'flex',
  }),
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiCardContent-root': {
      flex: 1,
    },
  },
  // Ribbon Styles
  ribbon: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    position: 'absolute',
    pointerEvents: 'none',
    top: '-10px',
    right: '-10px',
    '&::before, &::after': {
      position: 'absolute',
      zIndex: '-1',
      content: '',
      display: 'block',
      border: '5px solid #08fdd8',
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
    },
    '&::before': {
      top: 0,
      left: 0,
    },
    '&::after': {
      bottom: 0,
      right: 0,
    },
    '& span': {
      position: 'absolute',
      display: 'block',
      width: 225,
      padding: '15px 0',
      backgroundColor: theme.colors.fadedBlue,
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
      color: '#ffffff',
      fontFamily: 'ProximaNova, AvenirNextCyr, sans-serif',
      fontWeight: '400',
      fontSize: '17px',
      textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      textTransform: 'uppercase',
      textAlign: 'center',
      left: '-25px',
      top: 30,
      transform: 'rotate(45deg)',
    },
  },
}));

export default useStyles;
