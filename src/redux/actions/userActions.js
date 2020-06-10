import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) =>(dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
            .then(res =>{
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS}); //in case there are any errors on form prior to redirecting to home page
                history.push('/');
            })
            .catch(err => {
                dispatch({
                  type: SET_ERRORS,
                  payload: err.response.data
                });
              });
            
}
export const signupUser = (newUserData, history) =>(dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/signup', newUserData)
            .then(res =>{
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS}); //in case there are any errors on form prior to redirecting to home page
                history.push('/');
            })
            .catch(err => {
                dispatch({
                  type: SET_ERRORS,
                  payload: err.response.data
                });
              });

          
}

export const logoutUser = () => (dispatch) =>{ //gives user ability to log out which will remove the token and set as unathenticated
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
}
export const getUserData =() => (dispatch) =>{
        dispatch({type: LOADING_USER});
        axios.get('/user') //retrieves user data
            .then(res =>{
                dispatch ({
                    type: SET_USER,
                    payload: res.data //payload is data we send to reducer
                })
            })
            .catch(err => console.log(err));
    }

const setAuthorizationHeader = (token) =>{
    const FBIdToken = `Bearer ${token}`; //FB auth token for when user logs in
    localStorage.setItem('FBIdToken', FBIdToken) //store token in local storage
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}
