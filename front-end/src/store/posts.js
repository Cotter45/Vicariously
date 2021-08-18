// front-end/src/store/posts.js
import { csrfFetch } from './csrf';
import { sendMessage } from './messages';


const SEARCH_POSTS = '/api/posts/search';
const GET_POST = '/api/posts/:postId';
const BOOK_POST = '/api/posts/book';
const FEATURED_POSTS = '/api/posts/featured';

const featured = (posts) => {
    return {
        type: FEATURED_POSTS,
        payload: posts
    }
}

const book = (dates) => {
    return {
        type: BOOK_POST,
        payload: dates
    }
}

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

export const getFeatures = () => async (dispatch) => {
    const fetch = await csrfFetch('/api/posts/');
    const response = await fetch.json();
    dispatch(featured(response));
    return response;
}

export const bookPost = (dates, postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(dates)
    })

    const response = await fetch.json();
    dispatch(book(response));
    dispatch(sendMessage(response.newMessage))
    return response;
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
        case FEATURED_POSTS:
            newState.featuredPosts = action.payload.posts;
            return newState;
        case SEARCH_POSTS:
            newState.searchResults = action.payload;
            return newState;
        case GET_POST:
            newState.posts[action.payload.post.id] = action.payload.post;
            return newState;
        case BOOK_POST:
            newState.bookings = action.payload;
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
