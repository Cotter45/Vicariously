// front-end/src/store/session.js
import { csrfFetch } from './csrf';
import { store } from '../index';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const logout = () => async (dispatch) => {
  const session = store.getState().session;
  const user = session.user;

  const response = await csrfFetch('/api/session/', {
    method: 'DELETE',
    body: JSON.stringify({
        user
    })
  });

  dispatch(removeUser());
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, birthday, profilePicture, description } = user;
  const response = await csrfFetch("/api/users/", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
      birthday,
      profilePicture,
      description
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session/');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;

  const response = await csrfFetch('/api/session/', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
