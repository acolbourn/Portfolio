import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './styles/ribbon.css';
import useStyles from './styles/ClassesCardStyles';
import ClassesDialog from './ClassesDialog';

export default function ClassesCard({ codingClass }) {
  const { imgSrc, imgAlt, title, keyPoints, school, featured } = codingClass;
  const classes = useStyles(featured);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
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
      {featured && (
        <div className='ribbon ribbon-top-right'>
          <span>Featured</span>
        </div>
      )}
      <ClassesDialog
        codingClass={codingClass}
        open={open}
        openDetail={openDetail}
        closeDetail={closeDetail}
      />
    </Card>
  );
}
