import React, {Component} from 'react';
import{BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import jwtDecode from 'jwt-decode';

//Material UI 
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//components
import Navbar from './components/layout/Navbar';
import themeFile from './util/theme'
import AuthRoute from './util/AuthRoute'

//Pages 
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

//Redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
import axios from 'axios';

const theme = createMuiTheme(themeFile); //takes in default themes placed in util folder

const token = localStorage.FBIdToken;
if (token) { //want to decode the token using jwt-decode to see if user needs to login again
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp *1000 < Date.now()){ //if token has expired, user gets redirected to login page
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
  else{ //user is authenticated and does not need to login in again
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
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
              <AuthRoute exact path = "/login" component ={login} />
              <AuthRoute exact path = "/signup" component ={signup} />
            </Switch>
            </div>
            </Router>
          </Provider>
            
          </MuiThemeProvider>
      )
          }
    
  
}

export default App;
