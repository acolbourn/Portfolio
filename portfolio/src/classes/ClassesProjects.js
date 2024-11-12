import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import StarIcon from '@material-ui/icons/Star';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import React from 'react';
import useStyles from './styles/ClassesProjectsStyles';

export default function ClassesProjects({ projects }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <List dense={true}>
        {projects.map((project) => {
          const {
            projectTitle,
            projectLink,
            projectDesc,
            projectFeatured,
            projectGit,
          } = project;
          return (
            <ListItem key={projectTitle} button>
              <ListItemLink
                href={projectLink}
                target='_blank'
                className={classes.listItem}
                disabled={projectLink === '#'}
              >
                <div className={classes.icons}>
                  {projectFeatured && <StarIcon className={classes.star} />}
                  <ListItemAvatar>
                    <Avatar className={classes.webIcon}>
                      <WebAssetIcon />
                    </Avatar>
                  </ListItemAvatar>
                </div>
                <ListItemText
                  primary={projectTitle}
                  secondary={isMobile ? null : projectDesc}
                />
              </ListItemLink>
              <ListItemSecondaryAction>
                <ListItemLink
                  href={projectGit}
                  target='_blank'
                  className={classes.github}
                >
                  <IconButton edge='end' aria-label='Github'>
                    <Icon className='fab fa-github' />
                  </IconButton>
                </ListItemLink>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}
