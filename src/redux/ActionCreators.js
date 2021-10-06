import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//nested arrow functions enabled by redux thunk
export const fetchGames = () => dispatch => {

    dispatch(gamesLoading());
    //a call to fetch will return a promise
    return fetch(baseUrl + 'games')
        .then(response => {
            //when promise resolve
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            //when promise reject
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(games => dispatch(addGames(games)))
        .catch(error => dispatch(gamesFailed(error.message)));
};
//not using redux thunk, just returns an action object
export const gamesLoading = () => ({
    type: ActionTypes.GAMES_LOADING
});

export const gamesFailed = errMess => ({
    type: ActionTypes.GAMES_FAILED,
    payload: errMess
});

export const addGames = games => ({
    type: ActionTypes.ADD_GAMES,
    payload: games
});

export const fetchPosts = () => dispatch => {

    dispatch(postsLoading());
    //a call to fetch will return a promise
    return fetch(baseUrl + 'posts')
        .then(response => {
            //when promise resolve
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            //when promise reject
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(posts => dispatch(addPosts(posts)))
        .catch(error => dispatch(postsFailed(error.message)));
};

//not using redux thunk, just returns an action object
export const postsLoading = () => ({
    type: ActionTypes.POSTS_LOADING
});

export const postsFailed = errMess => ({
    type: ActionTypes.POSTS_FAILED,
    payload: errMess
});

export const addPosts = posts => ({
    type: ActionTypes.ADD_POSTS,
    payload: posts
});

//fetching comments
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (postId, rating, author, text) => dispatch => {
    const newComment = {
        postId: postId,
        rating: rating,
        author: author,
        text: text
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        })
};

//fetching promotions
export const fetchPromotions = () => dispatch => {

    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

//fetching techs
export const fetchTechs = () => dispatch => {

    dispatch(techsLoading());

    return fetch(baseUrl + 'techs')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(techs => dispatch(addTechs(techs)))
        .catch(error => dispatch(techsFailed(error.message)));
};

export const techsLoading = () => ({
    type: ActionTypes.TECHS_LOADING
});

export const techsFailed = errMess => ({
    type: ActionTypes.TECHS_FAILED,
    payload: errMess
});

export const addTechs = techs => ({
    type: ActionTypes.ADD_TECHS,
    payload: techs
});

export const postFeedback = (feedback) => () => {
    const newFeedback = {
        firstName: feedback.firstName,
        lastName: feedback.lastName,
        phoneNum: feedback.phoneNum,
        email: feedback.email,
        agree: feedback.agree,
        contactType: feedback.contactType,
        feedback: feedback.feedback
    };
    return fetch(baseUrl + 'feedback', {
            method: "POST",
            body: JSON.stringify(newFeedback),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; }
        )
        .then(response => response.json())
        .then(newFeedback => alert(`Thank you for your feedback!\n${JSON.stringify(newFeedback)}`))
        .catch(error => {
            console.log('post feedback', error.message);
            alert('Your feedback could not be posted\nError: ' + error.message);
        })
};