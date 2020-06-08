import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) =>(dispatch) =>{
    dispatch({type: LOADING_UI});
    axios.post('/login', userData)
            .then(res =>{
                const FBIdToken = `Bearer ${res.data.token}`; //FB auth token for when user logs in
                localStorage.setItem('FBIdToken', FBIdToken) //store token in local storage
                axios.defaults.headers.common['Authorization'] = FBIdToken;
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS}); //in case there are any errors on form prior to redirecting to home page
                this.props.history.push('/');
            })
            .catch ((err) =>{
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}

export const getUserData =() => (dispatch) =>{
        axios.get('/user') //retrieves user data
            .then(res =>{
                dispatch ({
                    type: SET_USER,
                    payload: res.data //payload is data we send to reducer
                })
            })
            .catch(err => console.log(err));
    }
