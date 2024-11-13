import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import SchoolIcon from '@material-ui/icons/School';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../home/Logo';
import NavDrawer from './NavDrawer';
import useStyles from './styles/NavbarStyles';

export default function ButtonAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [drawerState, setDrawerState] = useState({
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

  // Google Analytics
  let location = useLocation();
  useEffect(() => {
    ReactGA.initialize('UA-182243752-1');
    ReactGA.pageview(location.pathname);
  }, [location]);

  const navGroup = (
    <div className={classes.navGroup}>
      <NavLink to='/' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Home'>
          <HomeOutlinedIcon className={classes.navLink} />
          <div className={classes.navLinkText}>HOME</div>
        </IconButton>
      </NavLink>
      <NavLink to='/projects' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Projects'>
          <WorkOutlineOutlinedIcon className={classes.navLink} />
          <div className={classes.navLinkText}>PROJECTS</div>
        </IconButton>
      </NavLink>
      <NavLink to='/classes' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Classes'>
          <SchoolIcon className={classes.navLink} />
          <div className={classes.navLinkText}>CLASSES</div>
        </IconButton>
      </NavLink>
      <NavLink to='/about' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='About'>
          <PersonOutlineOutlinedIcon className={classes.navLink} />
          <div className={classes.navLinkText}>ABOUT</div>
        </IconButton>
      </NavLink>
      <NavLink to='/contact' activeClassName={classes.activePage} exact>
        <IconButton className={classes.icon} aria-label='Contact'>
          <EmailOutlinedIcon className={classes.navLink} />
          <div className={classes.navLinkText}>CONTACT</div>
        </IconButton>
      </NavLink>
    </div>
  );

  const socialGroupList = [
    {
      iconClass: 'fab fa-linkedin-in',
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/alex-colbourn',
    },
    {
      iconClass: 'fab fa-github',
      label: 'Github',
      link: 'https://github.com/acolbourn',
    },
    {
      iconClass: 'fab fa-youtube',
      label: 'YouTube',
      link: 'https://www.youtube.com/channel/UCN4scLg9N0ujvaBxCpVB4Ow/videos',
    },
  ];

  const socialGroup = (
    <div className={classes.socialGroup}>
      {socialGroupList.map((link) => (
        <IconButton
          className={classes.icon}
          aria-label={link.label}
          key={link.label}
          href={link.link}
          target='_blank'
          rel='noopener'
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
              <Logo />
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
