import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    myPosts: [],
};

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.myPosts = [...state.myPosts, action.payload]
        },
        setPosts: (state, action) => {
            state.myPosts = action.payload
        },
        deletePostById: (state, action) => {
            state.myPosts = state.myPosts.filter(post => post.id !== action.payload)
        },
    },
});

export const { addPost,setPosts,deletePostById } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.myPosts;
export const selectPublishedPosts = (state) => state.posts.myPosts.filter(post => post.isPublished===true);
export default postsSlice.reducer;
