import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_TAKE, UNLIKE_TAKE, MARK_NOTIFICATIONS_READ} from '../types'

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
}

export default function (state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED: //used when user logs in
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED: //used when user logs out
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload //spread so that we can bind items to thier respective parts
            }
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case LIKE_TAKE: //when a take is liked, we get userhandle of who liked that take and increment the likes array 
            return{
                ...state,
                likes:  [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        takeId: action.payload.takeId
                    }
                ]
            }
        case UNLIKE_TAKE: //need to remove it from array
            return{
                ...state,
                likes: state.likes.filter((like) => like.takeId !== action.payload.takeId)
            }
        case MARK_NOTIFICATIONS_READ: //when notifications are marked as read, need to loop through and change read property from false to true
            state.notifications.forEach(not => not.read = true);
            return{
                ...state
            }
        default:
            return state;
    }
}