import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    // boxShadow: '0px 5px 20px rgba(34, 35, 58, 0.2)',
    // transition: '0.3s',
    // '&:hover': {
    //   transform: 'translateY(2px)',
    //   boxShadow: '0 2px 10px 0 rgba(0,0,0,0.12)',
    // },
  },
});

export default function ProjectCard({ imgSrc, imgAlt, title, description }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={imgAlt}
          height='140'
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
      <CardActions>
        <Button size='small' color='primary'>
          Live Website
        </Button>
        <Button size='small' color='primary'>
          Explore
        </Button>
      </CardActions>
    </Card>
  );
}
