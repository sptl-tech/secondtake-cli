import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const AuthRoute = ({component : Component, authenticated, ...rest}) => ( //if user is authenticated, then they are redirected to home page; else signup/login page
    <Route 
    {...rest}
    render={(props) => authenticated === true ? <Redirect to ='/' /> : <Component {...props}/>} /> 
)
export default AuthRoute