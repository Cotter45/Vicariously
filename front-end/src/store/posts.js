// front-end/src/store/posts.js
import { csrfFetch } from './csrf';
import { store } from '../index';


const SEARCH_POSTS = '/api/posts/search';

const search = (searchResults) => {
    return {
        type: SEARCH_POSTS,
        payload: searchResults
    }
}

export const searchPosts = (params) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/search/${params}`);

    const response = await fetch.json();
    dispatch(search(response.results));
    return response;
}

const initialState = { searchResults: null }

const searchReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case SEARCH_POSTS:
            newState.searchResults = action.payload;
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
