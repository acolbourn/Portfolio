import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles/ribbon.css';
import ClassesDetail from './ClassesDetail';

const useStyles = makeStyles({
  root: (codingClass) => ({
    border: codingClass.featured ? '1px solid #08fdd8' : 'none',
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

export default function ClassesCard({ codingClass }) {
  const {
    imgSrc,
    imgAlt,
    title,
    keyPoints,
    school,
    featured,
    id,
  } = codingClass;
  const classes = useStyles(codingClass);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log(id);
    openDetail();
  };

  const openDetail = () => {
    setOpen(true);
  };

  const closeDetail = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.media} image={imgSrc} title={imgAlt} />
        <CardContent>
          <Typography gutterBottom variant='h6' component='h2'>
            {title}
          </Typography>
          <Typography gutterBottom variant='subtitle1'>
            {school}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='span'>
            <ul className={classes.bulletPoints}>
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
      <ClassesDetail
        codingClass={codingClass}
        open={open}
        openDetail={openDetail}
        closeDetail={closeDetail}
      />
    </Card>
  );
}
