import React, {Component} from 'react';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import jwtDecode from 'jwt-decode';

//Material UI 
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//components
import Navbar from './components/Navbar';
import themeFile from './util/theme'
import AuthRoute from './util/AuthRoute'

//Pages 
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//Redux
import {Provider} from 'react-redux'
import store from './redux/store'

const theme = createMuiTheme(themeFile); //takes in default themes placed in util folder

let authenticated;
const token = localStorage.FBIdToken;
if (token) { //want to decode the token using jwt-decode to see if user needs to login again
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp *1000 < Date.now()){ //if token has expired, user gets redirected to login page
    window.location.href = '/login'
    authenticated = false;
  }
  else{ //user is authenticated and does not need to login in again
    authenticated = true;
  }
}



class App extends Component{
    render(){
      return(
        <MuiThemeProvider theme ={theme} >
        <Provider store ={store}>
            <Router> 
            <Navbar />
              <div className = "container">
            <Switch>
              <Route exact path = "/" component ={home}/> 
              <AuthRoute exact path = "/login" component ={login} authenticated ={authenticated}/>
              <AuthRoute exact path = "/signup" component ={signup} authenticated ={authenticated}/>
            </Switch>
            </div>
            </Router>
          </Provider>
            
          </MuiThemeProvider>
      )
          }
    
  
}

export default App;
