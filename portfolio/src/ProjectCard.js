import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ProjectDialog from './ProjectDialog';
import useStyles from './styles/ProjectCardStyles';

export default function ProjectCard({ project }) {
  const { imgSrc, imgAlt, title, description, featured } = project;
  const classes = useStyles(featured);
  const theme = useTheme();
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

  let imgHeight = '300';
  if (useMediaQuery(theme.breakpoints.down('md'))) {
    imgHeight = '225';
  }
  if (useMediaQuery(theme.breakpoints.down('sm'))) {
    imgHeight = '180';
  }

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea} onClick={handleClick}>
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
        {featured && (
          <div className={classes.ribbon}>
            <span>Featured</span>
          </div>
        )}
      </CardActionArea>
      <ProjectDialog
        project={project}
        open={open}
        openDetail={openDetail}
        closeDetail={closeDetail}
      />
    </Card>
  );
}
