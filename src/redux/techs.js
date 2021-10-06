import * as ActionTypes from './ActionTypes';

export const Techs = (state = { isLoading: true, errMess: null, techs: [] }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TECHS:
            return {...state, isLoading: false, errMess: null, techs: action.payload};
        case ActionTypes.TECHS_LOADING:
            return {...state, isLoading: true, errMess: null, techs: []};
        case ActionTypes.TECHS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};