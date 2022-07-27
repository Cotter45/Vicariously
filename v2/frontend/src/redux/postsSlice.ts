import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authFetch } from './authFetch';
import type { Booking, Category, Post, Review, Rule } from './models';
// import { RootState, AppThunk } from './store';

export interface PostState {
  posts: Post[];
  myPosts: Post[];
  bookings: Booking[];
  myBookings: Booking[];
  reviews: Review[];
  myReviews: Review[];
  categories: Category[];
  rules: Rule[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PostState = {
  posts: [],
  myPosts: [],
  bookings: [],
  myBookings: [],
  reviews: [],
  myReviews: [],
  categories: [],
  rules: [],
  status: 'idle',
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ skip, take }: { skip: number; take: number }) => {
    const response = await authFetch(`/api/posts?skip=${skip}&take=${take}`);
    const data = await response.json();
    return data.data;
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      }).addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      }).addCase(getPosts.rejected, (state) => {
        state.status = 'failed';
      })
      // .addCase(getMyPosts.pending, (state) => {
      //   state.status = 'loading';
      // }).addCase(getMyPosts.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.myPosts = action.payload;
      // }).addCase(getMyPosts.rejected, (state) => {
      //   state.status = 'failed';
      // }).addCase(getBookings.pending, (state) => {
      //   state.status = 'loading';
      // }).addCase(getBookings.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.bookings = action.payload;
      // }).addCase(getBookings.rejected, (state) => {
      //   state.status = 'failed';
      // }).addCase(getMyBookings.pending, (state) => {
      //   state.status = 'loading';
      // }).addCase(getMyBookings.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.myBookings = action.payload;
      // }).addCase(getMyBookings.rejected, (state) => {
      //   state.status = 'failed';
      // }).addCase(getReviews.pending, (state) => {
      //   state.status = 'loading';
      // }).addCase(getReviews.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.reviews = action.payload;
      // }).addCase(getReviews.rejected, (state) => {
      //   state.status = 'failed';
      // })
  },
});

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;