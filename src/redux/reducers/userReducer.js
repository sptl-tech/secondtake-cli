import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types'

const initialState = {
    authenticated: false,
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
                ...action.payload //spread so that we can bind items to thier respective parts
            }
        default:
            return state;
    }
}