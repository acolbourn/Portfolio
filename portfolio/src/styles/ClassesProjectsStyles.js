import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    '& .MuiList-root': {
      paddingBottom: 0,
    },
    '& .MuiListItem-root': {
      paddingLeft: 0,
    },
  },
  listItem: {
    '&:hover': {
      color: '#fff',
      '& svg': {
        transition: 'color 0.2s',
        color: '#08fdd8',
      },
      '& .MuiAvatar-root': {
        transition: 'border 0.2s',
        border: '3px solid #08fdd8',
      },
    },
  },
  github: {
    paddingRight: 0,
    '& .fa-github': {
      width: '28px',
    },
    '& .MuiButtonBase-root': {
      paddingRight: '0px',
    },
    '& span': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '&:hover': {
      '& span': {
        transition: 'color 0.2s',
        color: '#08fdd8',
      },
    },
  },
  webIcon: {
    border: '2px solid rgba(255, 255, 255, 0.7)',
  },
  icons: {
    position: 'relative',
  },
  star: {
    position: 'absolute',
    top: '-8px',
    left: '-3px',
    color: 'gold !important',
    zIndex: '10',
  },
}));

export default useStyles;
