import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import WebAssetIcon from '@material-ui/icons/WebAsset';

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
      '& svg': {
        transition: 'color 0.2s',
        color: '#08fdd8',
      },
    },
  },
  github: {
    '&:hover': {
      '& span': {
        transition: 'color 0.2s',
        color: '#08fdd8',
      },
    },
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
            >
              <ListItemAvatar>
                <Avatar>
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
