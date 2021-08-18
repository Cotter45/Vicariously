// front-end/src/store/users.js
import { csrfFetch } from './csrf';

const GET_PROFILE = '/api/users/profile';
const EDIT_PROFILE = '/api/users/edit';
const DELETE_PROFILE = '/api/users/delete';

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

const initialState = { users: [] }

const userReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case GET_PROFILE:
            newState.users = [ ...newState.users, action.payload]
            return newState;
        default:
            return state;
    }
}

export default userReducer;
