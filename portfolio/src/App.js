import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import About from './about/About';
import Classes from './classes/Classes';
import Contact from './contact/Contact';
import BackToTop from './home/BackToTop';
import Home from './home/Home';
import Navbar from './navbar/Navbar';
import Projects from './projects/Projects';
import './styles/App.css';
import { theme, useStyles } from './styles/AppStyles';

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

export default App;
