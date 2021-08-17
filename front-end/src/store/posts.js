// front-end/src/store/posts.js
import { csrfFetch } from './csrf';
// import { store } from '../index';


const SEARCH_POSTS = '/api/posts/search';
const GET_POST = '/api/posts/:postId'

const post = (post) => {
    return {
        type: GET_POST,
        payload: post
    }
}

const search = (searchResults) => {
    return {
        type: SEARCH_POSTS,
        payload: searchResults
    }
}

export const getPost = (postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}`);

    const response = await fetch.json();
    dispatch(post(response))
    return response;
}


export const searchPosts = (params) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/search/${params}`);

    const response = await fetch.json();
    dispatch(search(response.results));
    return response;
}

const initialState = { searchResults: null, posts: [] }

const searchReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch(action.type) {
        case SEARCH_POSTS:
            newState.searchResults = action.payload;
            return newState;
        case GET_POST:
            newState.posts = action.payload;
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
