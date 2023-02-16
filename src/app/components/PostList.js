import { React, useEffect } from 'react';
import { Post } from './Post';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectAllPosts,
    setPosts,
    deletePostById
} from '../../features/post/postsSlice'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export const PostList = ()=> {
    const posts = useSelector(selectAllPosts);
    const dispatch = useDispatch();

    const fetchPostsToState = async () => {
        await fetch("/blog/home")
            .then(response => response.json())
            .then(json => dispatch(setPosts(json)));
    }

    const removePostById = async (postID) => {
        await fetch("/blog/home", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postID }),
        })
        .then((response) => response.json())
        .then((data) => {
            dispatch(deletePostById(postID))
        })
    }

    useEffect(() => {
        fetchPostsToState();
    }, [])

    return (
        <div className="d-flex flex-column align-items-center">
            {posts.map((post,index) => 
            <Post post={post} removePostById={removePostById} index={index} key={post.id}/>
            )}
        </div>
    )
}