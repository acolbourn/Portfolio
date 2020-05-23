import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default function NavDrawer({
  drawerState,
  toggleDrawer,
  socialGroupList,
  classes,
}) {
  const navDrawerList = (
    <div
      className={classes.drawer}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {socialGroupList.map((link) => (
          <ListItem button key={link.label}>
            <IconButton className={classes.icon} aria-label={link.label}>
              <Icon className={`${link.iconClass} ${classes.socialLink}`} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={'left'}
          open={drawerState.open}
          onClose={toggleDrawer(false)}
          classes={{ paper: classes.paper }}
        >
          {navDrawerList}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
