// front-end/src/store/messages.js
import { csrfFetch } from './csrf';
import { store } from '../index';

const GET_MESSAGES = '/api/user/messages'

const storeMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

export const getMessages = (user) => async (dispatch) => {
    const session = store.getState().session;
    // const user = session.user;

    const response = await csrfFetch(`/api/users/${user.id}/messages`, {
        method: 'GET'
    });

    const messages = await response.json();
    dispatch(storeMessages(messages))
    return messages;
}


const initialState = { messages: null }

const messageReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case GET_MESSAGES:
            newState.messages = action.payload.messages;
            return newState;
        default:
            return state;
    }
}

export default messageReducer;