import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Games } from './games';
import { Posts } from './posts';
import { Comments } from './comments';
import { Techs } from './techs';
import { Promotions } from './promotions';
import { InitialFeedback } from './forms';
import { Auth } from './auth';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            games: Games,
            posts: Posts,
            comments: Comments,
            techs: Techs,
            promotions: Promotions,
            auth: Auth,
            ...createForms({
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );
    
    return store;
}