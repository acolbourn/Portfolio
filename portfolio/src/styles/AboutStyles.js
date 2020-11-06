import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '400',
    display: 'grid',
    gridTemplateRows: 'repeat(2, minmax(min-content, 50%))',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateAreas: `
              'about webSkills'
              'timeline roboticsSkills'
          `,
    [theme.breakpoints.down('md')]: {
      gridTemplateRows: 'repeat(3, minmax(min-content, 33%))',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `
                  'about webSkills'
                  'about roboticsSkills'
                  'timeline timeline'
              `,
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateRows: 'repeat(2, minmax(min-content, 50%))',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `
                  'about'
                  'timeline'
              `,
    },
    gap: '20px',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      gap: '10px',
      padding: '10px',
    },
    '@media (max-height: 750px)': {
      gap: '10px',
      padding: '10px',
    },
  },
  gridItem: {
    backgroundColor: theme.colors.background,
    border: '1px solid',
    borderRadius: '8px',
    borderColor: theme.colors.fadedBlue,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    [theme.breakpoints.down('md')]: {
      padding: '10px',
    },
    '@media (max-height: 750px)': {
      padding: '10px',
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '20px',
    },
  },
  about: {
    gridArea: 'about',
    fontSize: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
    '@media (max-height: 890px)': {
      fontSize: '0.7rem',
    },
  },
  timeline: {
    gridArea: 'timeline',
  },
  webSkills: {
    gridArea: 'webSkills',
  },
  roboticsSkills: {
    gridArea: 'roboticsSkills',
  },
  title: {
    color: theme.colors.primary,
    fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
    fontWeight: '300',
    fontSize: '42px',
    [theme.breakpoints.down('md')]: {
      fontSize: '42px',
      '@media (max-height: 850px)': {
        fontSize: '35px',
      },
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '38px',
      '@media (min-height: 850px)': {
        fontSize: '45px',
      },
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '35px',
    },
    '@media (max-height: 750px)': {
      fontSize: '28px',
    },
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px 16px 0 16px',
    [theme.breakpoints.down('md')]: {
      margin: '8px 16px 0 16px',
    },
    '& .MuiTypography-root': {
      fontFamily: 'AvenirNextCyr, ProximaNova, sans-serif',
      fontWeight: '400',
    },
    '& .MuiTypography-body1': {
      fontSize: '1rem',
      [theme.breakpoints.down('xl')]: {
        fontSize: '1.1rem',
      },
      [theme.breakpoints.down('lg')]: {
        fontSize: '1.02rem',
        '@media (min-height: 850px)': {
          fontSize: '1.05rem',
        },
      },
      [theme.breakpoints.down('md')]: {
        fontSize: '0.95rem',
        '@media (min-height: 850px)': {
          fontSize: '1.05rem',
        },
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.05rem',
        '@media (min-height: 850px)': {
          fontSize: '1.1rem',
        },
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '1rem',
      },
    },
  },
  aboutText: {
    marginTop: '-8px',
    '@media (max-height: 750px)': {
      marginTop: '6px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '6px',
    },
  },
  lastParagraph: {
    marginBottom: '2px',
  },
  skillGroupBox: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateRows: 'repeat(3, minmax(min-content, 33%))',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2px',
    padding: '4px 0',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    '& div:first-child': {
      borderTopLeftRadius: '8px',
    },
    '& div:nth-child(4)': {
      borderTopRightRadius: '8px',
    },
    '& div:nth-child(9)': {
      borderBottomLeftRadius: '8px',
    },
    '& div:last-child': {
      borderBottomRightRadius: '8px',
    },
  },
  skillBox: {
    margin: 0,
    backgroundColor: '#303030',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '35px',
    },
  },
}));

export default useStyles;
