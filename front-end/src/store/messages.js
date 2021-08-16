// front-end/src/store/messages.js
import { csrfFetch } from './csrf';
import { store } from '../index';

const GET_MESSAGES = '/api/users/messages';
const SEND_MESSAGE = '/api/users/sendMessage';
const READ_MESSAGES = '/api/users/readMessage';

const storeMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

const newMessage = (newMessage) => {
    return {
        type: SEND_MESSAGE,
        payload: newMessage
    }
}

const markReadMessages = (messages) => {
    return {
        type: READ_MESSAGES,
        payload: messages
    }
}

export const readMessages = (messages) => async (dispatch) => {
    const session = store.getState().session;
    const user = session.user;

    const response = await csrfFetch(`/api/users/${user.id}/messages`, {
        method: 'PUT',
        body: JSON.stringify(messages)
    })

    const updatedMessages = await response.json();
    dispatch(markReadMessages(updatedMessages));
    return updatedMessages;
}

export const sendMessage = (message) => async (dispatch) => {
    const response = await csrfFetch(`/api/users/${message.userTwoId}/newMessage`, {
        method: 'POST',
        body: JSON.stringify(message)
    });

    const returnMessage = await response.json();
    dispatch(newMessage(returnMessage))
}

export const getMessages = (user) => async (dispatch) => {

    const response = await csrfFetch(`/api/users/${user.id}/messages`, {
        method: 'GET'
    });

    const messages = await response.json();
    dispatch(storeMessages(messages))
    return messages;
}


const initialState = { messages: null, unreadMessages: [] }

const messageReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case GET_MESSAGES:
            newState.messages = action.payload.messages;
            newState.unreadMessages.push(...action.payload.messages.filter(message => message.read === false))
            return newState;
        case READ_MESSAGES:
            newState.unreadMessages.splice(0, action.payload.messages.length);
            return newState;
        case SEND_MESSAGE:
            newState.messages = [ ...newState.messages, action.payload.returnMessage];
            return newState;
        default:
            return state;
    }
}

export default messageReducer;
