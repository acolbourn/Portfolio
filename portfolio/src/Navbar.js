import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
// import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import SchoolIcon from '@material-ui/icons/School';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavDrawer from './NavDrawer';
import useStyles from './styles/NavbarStyles';

export default function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [drawerState, setDrawerState] = React.useState({
    open: false,
  });

  const toggleDrawer = (openToggle) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerState({ open: openToggle });
  };

  const navGroup = (
    <div className={classes.navGroup}>
      <NavLink to='/' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Home'>
          <HomeOutlinedIcon className={classes.navLink} />
          <div className={classes.navLinkText}>HOME</div>
        </IconButton>
      </NavLink>
      <IconButton className={classes.icon} aria-label='About'>
        <PersonOutlineOutlinedIcon className={classes.navLink} />
        <div className={classes.navLinkText}>ABOUT</div>
      </IconButton>
      <NavLink to='/projects' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Projects'>
          <WorkOutlineOutlinedIcon className={classes.navLink} />
          <div className={classes.navLinkText}>PROJECTS</div>
        </IconButton>
      </NavLink>
      {/* <IconButton className={classes.icon} aria-label='Code'>
        <CodeOutlinedIcon className={classes.navLink} />
        <div className={classes.navLinkText}>CODE</div>
      </IconButton> */}
      <NavLink to='/contact' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Contact'>
          <EmailOutlinedIcon className={classes.navLink} />
          <div className={classes.navLinkText}>CONTACT</div>
        </IconButton>
      </NavLink>
      <NavLink to='/classes' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Classes'>
          <SchoolIcon className={classes.navLink} />
          <div className={classes.navLinkText}>CLASSES</div>
        </IconButton>
      </NavLink>
    </div>
  );

  const socialGroupList = [
    { iconClass: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { iconClass: 'fab fa-github', label: 'Github' },
    { iconClass: 'fab fa-youtube', label: 'YouTube' },
  ];

  const socialGroup = (
    <div className={classes.socialGroup}>
      {socialGroupList.map((link) => (
        <IconButton
          className={classes.icon}
          aria-label={link.label}
          key={link.label}
        >
          <Icon className={`${link.iconClass} ${classes.socialLink}`} />
        </IconButton>
      ))}
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position='sticky'>
        <Toolbar>
          {isMobile ? (
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div className={classes.logo}>
              <h1>AC</h1>
            </div>
          )}

          {navGroup}

          {!isMobile && socialGroup}
        </Toolbar>
      </AppBar>
      <NavDrawer
        drawerState={drawerState}
        toggleDrawer={toggleDrawer}
        socialGroupList={socialGroupList}
        classes={classes}
      />
    </div>
  );
}
