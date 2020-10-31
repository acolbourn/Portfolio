import React, { useState } from 'react';
// import { useTheme } from '@material-ui/core/styles';
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
  // const theme = useTheme();
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
      <CardActionArea className={classes.actionArea} onClick={handleClick}>
        <CardMedia component='img' alt={imgAlt} image={imgSrc} title={imgAlt} />
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
