// front-end/src/store/users.js
import EditPost from '../components/PostPage/EditPostModal/editpostmodal';
import { csrfFetch } from './csrf';
import { sendMessage } from './messages';

const GET_PROFILE = '/api/users/profile';
const EDIT_PROFILE = '/api/users/edit';
const DELETE_PROFILE = '/api/users/delete';
const REVIEW_USER = '/api/users/review';
const GET_BOOKINGS = '/api/users/bookings';
const MY_POSTS = '/api/users/myPosts';
const DELETE_POST = '/api/posts/delete';
const EDIT_POST = '/api/posts/edit';
const CANCEL_BOOKING = '/api/bookings/delete';

const cancel = ({ bookingId }) => {
    return {
        type: CANCEL_BOOKING,
        payload: bookingId
    }
}

const postEdit = ({ newPost }) => {
    return {
        type: EDIT_POST,
        payload: newPost
    }
}

const bookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        payload: bookings
    }
}

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

const myPosts = ({ posts }) => {
    return {
        type: MY_POSTS,
        payload: posts
    }
}

const removePost = (postId) => {
    return {
        type: DELETE_POST,
        payload: postId
    }
}

export const cancelBooking = (bookingId, username) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/bookings/${bookingId}`, {
        method: 'DELETE',
        body: JSON.stringify({username})
    })
    const response = await fetch.json();
    dispatch(sendMessage(response.newMessage));
    dispatch(cancel(response));
    return response;
}

export const editPost = (post, postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(post)
    })
    const response = await fetch.json();
    dispatch(postEdit(response));
    return response;
}

export const deletePost = (postId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })
    const response = await fetch.json();
    dispatch(removePost(postId));
    return response;
}

export const getBookings = (userId) => async (dispatch) => {
    const fetch = await csrfFetch(`/api/users/${userId}/bookings`);
    const response = await fetch.json();
    if (response.message === 'None') {
        dispatch(myPosts(response))
        return;
    } else if (response.message === 'Nada') {
        return;
    } else {
        dispatch(bookings(response));
        return response;
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

const initialState = { users: [], myReviews: {}, bookings: [], myStays: [] }

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
        case MY_POSTS:
            newState.myStays = action.payload;
            return newState;
        case GET_BOOKINGS:
            newState.bookings = action.payload.bookings;
            newState.myStays = action.payload.posts;
            return newState;
        case DELETE_POST:
            const post = newState.myStays.find(post => post.id === action.payload);
            newState.myStays.splice(newState.myStays.indexOf(post), 1);
            return newState;
        case EDIT_POST:
            const postToUpdate = newState.myStays.find(post => post.id === action.payload.id);
            newState.myStays.splice(newState.myStays.indexOf(postToUpdate), 1, action.payload);
            return newState;
        case CANCEL_BOOKING:
            console.log(action.payload)
            const booking = newState.bookings.find(booking => booking.id === action.payload);
            newState.bookings.splice(newState.bookings.indexOf(booking), 1);
            return newState;
        default:
            return state;
    }
}

export default userReducer;
