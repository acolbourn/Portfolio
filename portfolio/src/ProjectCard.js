import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // width: '345px',
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
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiCardContent-root': {
      flex: 1,
    },
  },
}));

export default function ProjectCard({ imgSrc, imgAlt, title, description }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  let imgHeight = '300';
  if (useMediaQuery(theme.breakpoints.down('md'))) {
    imgHeight = '225';
  }
  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    imgHeight = '180';
  }
  console.log(theme.breakpoints.down('xssm'));

  console.log(imgHeight);

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          component='img'
          alt={imgAlt}
          height={imgHeight}
          image={imgSrc}
          title={imgAlt}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
