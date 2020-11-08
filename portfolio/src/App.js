import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Analytics from 'react-router-ga';
import Navbar from './Navbar';
import BackToTop from './BackToTop';
import Home from './Home';
import Classes from './Classes';
import Contact from './Contact';
import Projects from './Projects';
import About from './About';
import { useStyles, theme } from './styles/AppStyles';
import './styles/App.css';

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <div className={classes.nav}>
            <Navbar />
            <BackToTop />
          </div>

          <div className={classes.body}>
            <Analytics id='G-N7QT01SYPQ'>
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
            </Analytics>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
