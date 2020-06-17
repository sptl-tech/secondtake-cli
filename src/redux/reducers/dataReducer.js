import {SET_TAKES, LIKE_TAKE, UNLIKE_TAKE, LOADING_DATA, DELETE_TAKE} from '../types'

const initialState = { //initial state of no takes, no take data, and not loading
    takes: [],
    take: {},
    loading: false
};

export default function (state = initialState, action){
    switch(action.type){
        case LOADING_DATA: //case when loading data
            return{
                ...state,
                loading: true
        }
        case SET_TAKES: //spreads state to add the array of takes
            return{
                ...state,
                takes: action.payload,
                loading: false
            }
        case LIKE_TAKE: 
        case UNLIKE_TAKE:
            let index = state.takes.findIndex(
                (take) => take.takeId === action.payload.takeId
              );
              state.takes[index] = action.payload;
              if (state.take.takeId === action.payload.takeId) {
                state.take = action.payload;
              }
              return {
                ...state
              };
        case DELETE_TAKE: //finds index of take wanting to be deleted and removes it 
        index = state.takes.findIndex(
            (take) => take.takeId === action.payload
          );
          state.takes.splice(index, 1);
          return {
            ...state
          };

        default:
            return state;
        }
}