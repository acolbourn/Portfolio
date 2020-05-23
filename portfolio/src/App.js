import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import Navbar from './Navbar';
import Home from './Home';
import CodingClasses from './CodingClasses';
import Contact from './Contact';
import useStyles from './styles/AppStyles';
import './styles/App.css';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
theme = responsiveFontSizes(theme);

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <div className={classes.nav}>
            <Navbar />
          </div>

          <div className={classes.body}>
            <Switch>
              <Route path='/contact'>
                <Contact />
              </Route>
              <Route path='/coding-classes'>
                <CodingClasses />
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
