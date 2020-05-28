import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles/ribbon.css';

const useStyles = makeStyles({
  root: (props) => ({
    width: 345,
    height: 308,
    border: props.featured ? '1px solid #08fdd8' : 'none',
    position: 'relative',
  }),
  media: {
    height: 140,
  },
});

export default function ClassesCard(props) {
  const { imgSrc, imgAlt, title, keyPoints, school, featured } = props;
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imgSrc} title={imgAlt} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography gutterBottom variant='subtitle2'>
            {school}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='span'>
            <ul>
              {keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions> */}
      {featured && (
        <div className='ribbon ribbon-top-right'>
          <span>Featured</span>
        </div>
      )}
    </Card>
  );
}
