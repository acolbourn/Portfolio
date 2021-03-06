import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 3000,
    position: 'absolute',
    width: '100%',
    '& .MuiPaper-root': {
      overflow: 'hidden',
      position: 'absolute',
      top: '8px',
      right: '8px',
      width: '110px',
      backgroundColor: 'rgba(29, 29, 29, 0.75)',      
      opacity: 1,
      border: '1px solid',
      borderColor: theme.colors.secondary,
      '& .MuiSvgIcon-root': {
        color: theme.colors.primary,
        width: '20px',
      },
      '& .MuiTypography-root': {
        fontFamily: theme.fonts.primary,
        color: theme.colors.primary,        
      },
      '& .MuiFormControlLabel-label': {
        fontSize: '15px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '14px',
        },
        [theme.breakpoints.down('xs')]: {
          fontSize: '12px',
        },
      },
      '& .MuiAccordionSummary-expandIcon': {
        padding: '0px 10px',
      },
      '& .MuiAccordionSummary-root': {
        minHeight: '0px',
        padding: '0px 8px',
      },
      '& .MuiAccordionSummary-content': {
        margin: '6px 0',
      },
      '& .MuiAccordionDetails-root': {
        paddingBottom: '0',
      },
    },
  },
  heading: {
    fontSize: '16px',    
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '13px',
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: '6px',
  },
  '& .MuiAccordionSummary-root': {
    minHeight: '36px',
  },
  normal: {
    borderColor: theme.colors.secondary,
    color: theme.colors.primary,
  },
  warning: {
    animationName: '$blinkWarning',
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  '@keyframes blinkWarning': {
    '0%': {
      borderColor: theme.colors.secondary,
      color: theme.colors.secondary,
    },
    '50%': {
      borderColor: theme.colors.primary,
      color: theme.colors.primary,
    },
    '100%': {
      borderColor: theme.colors.secondary,
      color: theme.colors.secondary,
    },
  },
  alert: {
    animationName: '$blinkAlert',
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
  '@keyframes blinkAlert': {
    '50%': {
      borderColor: 'red',
      color: 'red',
    },
  },
}));

export default useStyles;
