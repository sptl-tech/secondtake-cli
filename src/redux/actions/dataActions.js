import { SET_TAKES, LOADING_DATA, LIKE_TAKE, UNLIKE_TAKE, SET_ERRORS} from '../types'
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