import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ReactGA from 'react-ga';
import Navbar from './Navbar';
import BackToTop from './BackToTop';
import Home from './Home';
import Classes from './Classes';
import Contact from './Contact';
import Projects from './Projects';
import About from './About';
import { useStyles, theme } from './styles/AppStyles';
import './styles/App.css';

// Google Analytics
ReactGA.initialize('G-N7QT01SYPQ');

function App() {
  const classes = useStyles();

  // Google Analytics - update when page changes
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <div className={classes.nav}>
            <Navbar />
            <BackToTop />
          </div>

          <div className={classes.body}>
            <Switch>
              <Route path='/contact'>
                <Contact />
              </Route>
              <Route path='/classes'>
                <Classes />
              </Route>
              <Route path='/projects'>
                <Projects />
              </Route>
              <Route path='/about'>
                <About />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default withRouter(App);
