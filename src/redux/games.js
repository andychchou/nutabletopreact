import * as ActionTypes from './ActionTypes';

export const Games = (state = {
        isLoading: true,
        errMess: null,
        games: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_GAMES:
            return {...state, isLoading: false, errMess: null, games: action.payload};
        case ActionTypes.GAMES_LOADING:
            return {...state, isLoading: true, errMess: null, games: []};
        case ActionTypes.GAMES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};