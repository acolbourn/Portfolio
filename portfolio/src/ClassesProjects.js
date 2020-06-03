import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    '& .MuiList-root': {
      paddingBottom: 0,
    },
    '& .MuiListItem-root': {
      paddingLeft: 0,
    },
  },
  listItem: {
    '&:hover': {
      color: '#fff',
      '& svg': {
        transition: 'color 0.2s',
        color: '#08fdd8',
      },
      '& .MuiAvatar-root': {
        transition: 'border 0.2s',
        border: '3px solid #08fdd8',
      },
    },
  },
  github: {
    paddingRight: 0,
    '& .fa-github': {
      width: '28px',
    },
    '&:hover': {
      '& span': {
        transition: 'color 0.2s',
        color: '#08fdd8',
      },
    },
  },
  webIcon: {
    border: '3px solid white',
  },
  star: {
    position: 'absolute',
    top: '-1px',
    left: '-3px',
    color: 'gold !important',
    zIndex: '10',
  },
}));

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}

export default function ClassesProjects({ projects }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <List dense={true}>
        {projects.map((project) => (
          <ListItem key={project.projectTitle} button>
            <ListItemLink
              href={project.projectLink}
              target='_blank'
              className={classes.listItem}
              disabled={project.projectLink === '#'}
            >
              {project.projectFeatured && <StarIcon className={classes.star} />}
              <ListItemAvatar>
                <Avatar className={classes.webIcon}>
                  <WebAssetIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={project.projectTitle}
                secondary={isMobile ? null : project.projectDesc}
              />
            </ListItemLink>
            <ListItemSecondaryAction>
              <ListItemLink
                href={project.projectGit}
                target='_blank'
                className={classes.github}
              >
                <IconButton edge='end' aria-label='Github'>
                  <Icon className='fab fa-github' />
                </IconButton>
              </ListItemLink>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* <List component='nav' aria-label='main mailbox folders'>
        {projects.map((project, idx) => (
          <ListItem key={idx} button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={project.projectTitle} />
          </ListItem>
        ))}      
      </List> */}
    </div>
  );
}
