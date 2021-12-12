import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchGames = () => dispatch => {
    dispatch(gamesLoading());
    return fetch(baseUrl + 'games')
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
        .then(games => dispatch(addGames(games)))
        .catch(error => dispatch(gamesFailed(error.message)));
};

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
    return fetch(baseUrl + 'posts')
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
        .then(posts => dispatch(addPosts(posts)))
        .catch(error => dispatch(postsFailed(error.message)));
};

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

export const postComment = (postId, text) => dispatch => {
    const newComment = {
        postId: postId,
        text: text
    };
    newComment.date = new Date().toISOString();
    console.log('Comment', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearer
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

export const fetchTechs = () => dispatch => {

    dispatch(techsLoading());

    return fetch(baseUrl + 'technos')
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
    return fetch(baseUrl + 'feedbacks', {
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

export const requestLogin = creds => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = response => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = message => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = creds => dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(creds)
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
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveLogin(response));
        } else {
            const error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}