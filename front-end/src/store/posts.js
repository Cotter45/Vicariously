// front-end/src/store/posts.js
import { csrfFetch } from './csrf';
import { sendMessage } from './messages';
import { getBookings } from './users';


const SEARCH_POSTS = '/api/posts/search';
const GET_POST = '/api/posts/:postId';
const BOOK_POST = '/api/posts/book';
const FEATURED_POSTS = '/api/posts/featured';
const CREATE_POST = '/api/posts/create';

const create = (post) => {
    return {
        type: CREATE_POST,
        payload: post
    }
}

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

export const addRule = (rule, postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}/rules`, {
        method: 'POST',
        body: JSON.stringify(rule)
    })
    const response = await fetch.json();
    return response;
}

export const addImage = (imageUrl, postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}/images`, {
        method: 'POST',
        body: JSON.stringify(imageUrl)
    })
    const response = await fetch.json();
    return response;
}

export const createPost = (newPost) => async (dispatch) => {
    const fetch = await csrfFetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify(newPost)
    })
    const response = await fetch.json();
    await dispatch(create(response));
    return response;
}

export const getFeatures = () => async (dispatch) => {
    const fetch = await csrfFetch('/api/posts/');
    const response = await fetch.json();
    await dispatch(featured(response));
    return response;
}

export const bookPost = (dates, postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(dates)
    })

    const response = await fetch.json();
    await dispatch(book(response));
    await dispatch(sendMessage(response.newMessage));
    await dispatch(getBookings(response.booking.guestId));
    return response;
}

export const getPost = (postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}`);

    const response = await fetch.json();
    await dispatch(post(response))
    return response;
}


export const searchPosts = (params) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/search/${params}`);

    const response = await fetch.json();
    await dispatch(search(response.results));
    return response;
}

const initialState = { searchResults: null, posts: {}, newPost: null }

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
            newState.bookings = action.payload.booking;
            return newState;
        case CREATE_POST:
            newState.newPost = action.payload.post;
            return newState;
        default:
            return state;
    }
}

export default searchReducer;
