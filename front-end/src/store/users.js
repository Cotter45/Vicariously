// front-end/src/store/users.js
import { csrfFetch } from './csrf';

const GET_PROFILE = '/api/users/profile';
const EDIT_PROFILE = '/api/users/edit';
const DELETE_PROFILE = '/api/users/delete';
const REVIEW_USER = '/api/users/review';

const reviewMe = (review) => {
    return {
        type: REVIEW_USER,
        payload: review.userReview
    }
}

const deleteMe = () => {
    return {
        type: DELETE_PROFILE,
        payload: null
    }
}

const edit = (edits) => {
    return {
        type: EDIT_PROFILE,
        payload: edits
    }
}

const profile = ({user}) => {
    return {
        type: GET_PROFILE,
        payload: user
    }
}

export const reviewUser = (userId, review) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/users/${userId}/review`, {
        method: 'POST',
        body: JSON.stringify(review)
    })
    const response = await fetch.json();
    dispatch(reviewMe(response));
    return response;
}

export const deleteProfile = (userId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/users/${userId}`, {
        method: 'DELETE'
    })
    const response = await fetch.json();
    dispatch(deleteMe(userId));
    return response;
}

export const editProfile = (edits, userId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(edits)
    });
    const response = await fetch.json();
    dispatch(edit(response));
    return response;
}

export const getProfile = (userId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/users/${userId}`);
    const response = await fetch.json();
    dispatch(profile(response));
    return response;
}

const initialState = { users: [], myReviews: {} }

const userReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case GET_PROFILE:
            newState.users = [ ...newState.users, action.payload]
            return newState;
        case REVIEW_USER:
            const id = action.payload.id;
            newState.myReviews[id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default userReducer;
