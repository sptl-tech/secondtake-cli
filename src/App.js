import React, {Component} from 'react';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
//Material UI 
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//components
import Navbar from './components/Navbar';

//Pages 
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8a65',
      light: '#ffb93',
      dark: '#c75b39',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  },
  typography:{
    useNextVariants: true
  }
});

class App extends Component{
    render(){
      return(
        <MuiThemeProvider theme ={theme} >
            <div className="App">
            <Router> 
            <Navbar />
              <div className = "container">
            <Switch>
              <Route exact path = "/" component ={home}/> 
              <Route exact path = "/login" component ={login}/>
              <Route exact path = "/signup" component ={signup}/>
            </Switch>
            </div>
            </Router>
      
          </div>
          </MuiThemeProvider>
      )
          }
    
  
}

export default App;
