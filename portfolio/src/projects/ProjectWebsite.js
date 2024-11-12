import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import React from 'react';
import useStyles from '../classes/styles/ClassesProjectsStyles';

export default function ProjectWebsite({ webLink, github }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List dense={true}>
        <ListItem button>
          <ListItemLink
            href={webLink}
            target='_blank'
            className={classes.listItem}
            disabled={webLink === '#'}
          >
            <ListItemAvatar>
              <Avatar className={classes.webIcon}>
                <WebAssetIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='View Site' />
          </ListItemLink>
          <ListItemSecondaryAction>
            <ListItemLink
              href={github}
              target='_blank'
              className={classes.github}
            >
              <IconButton edge='end' aria-label='Github'>
                <Icon className='fab fa-github' />
              </IconButton>
            </ListItemLink>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

function ListItemLink(props) {
  return <ListItem button component='a' {...props} />;
}
