import { SET_TAKES, LOADING_DATA, LIKE_TAKE, UNLIKE_TAKE, SET_ERRORS, DELETE_TAKE, CLEAR_ERRORS, POST_TAKE, LOADING_UI, STOP_LOADING_UI, SET_TAKE, SUBMIT_COMMENT, DELETE_COMMENT} from '../types'
import axios from 'axios'

//retreiving all takes
export const getTakes = () => dispatch =>{
    dispatch({type: LOADING_DATA});
    axios.get('/takes')
        .then(res =>{
            dispatch({
                type: SET_TAKES,
                payload: res.data
            }) 
        })
        .catch(err =>{
            dispatch({
                type: SET_TAKES,
                payload: []
            })
        })
    }

//action of retreiving single take to show when expanded
export const getTake = (takeId) => dispatch =>{
    dispatch({type: LOADING_UI})
    axios.get(`/take/${takeId}`)
        .then (res => {
            dispatch({
                type: SET_TAKE,
                payload: res.data
            });
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err));
}

//post a take
export const postTake = (newTake) => (dispatch) =>{ //takes new take and uses axios post request to post it as a new take
    dispatch({type: LOADING_UI});
    axios.post('/take', newTake)
        .then((res) => {
            dispatch({
                type: POST_TAKE,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err =>{
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//like a take
export const likeTake = (takeId) => dispatch =>{
    axios.get(`/take/${takeId}/like`)
        .then(res =>{
            dispatch({
                type: LIKE_TAKE,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

//unlike a take
export const unlikeTake = (takeId) => dispatch =>{
    axios.get(`/take/${takeId}/unlike`)
        .then(res =>{
            dispatch({
                type: UNLIKE_TAKE,
                payload: res.data,
            })
        })
        .catch(err => console.log(err));
}

//submitting a comment 
export const submitComment = (takeId, commentData) => (dispatch) =>{
    axios.post(`/take/${takeId}/comment`, commentData)
        .then(res=> {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

//delete take
export const deleteTake = (takeId) => dispatch =>{
    axios.delete(`/take/${takeId}`)
        .then(() =>{
            dispatch({type: DELETE_TAKE, payload: takeId})
        })
        .catch(err => console.log(err))
}

export const getUserData = (userHandle) => dispatch =>{ //for retreiving user's details for the user page
    dispatch({type: LOADING_DATA})
    axios.get(`/user/${userHandle}`)
        .then(res=>{
            dispatch({
                type: SET_TAKES,
                payload: res.data.takes
            });
        })
        .catch(() =>{
            dispatch({
                type: SET_TAKES,
                payload: null
            })
        })
}

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}