import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userAccount: 'Unknown',
    isLoggedIn: false,
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
        setUserAccount: (state, action) => {
            state.userAccount = action.payload
        },
        logIn: (state) => {
            state.isLoggedIn = true;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
        },
    },
});

export const { addPost,setPosts,deletePostById,setUserAccount,logIn,logOut } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.myPosts;
export const selectPublishedPosts = (state) => state.posts.myPosts.filter(post => post.isPublished===true);
export const selectIsLoggedIn = (state) => state.posts.isLoggedIn;
export const selectUserAccount = (state) => state.posts.userAccount;
export default postsSlice.reducer;
