import { React, useState, useEffect } from 'react';
import { BlogPost } from './BlogPost';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/post/postsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserBlog = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    let { userName } = useParams();

    const fetchPostsToState = async () => {
        await fetch(`/blog/users/${userName}`)
            .then(response => response.json())
            .then((json) => {
                if(json.isLoggedIn) {
                    setPosts(json.posts);
                } else {
                    dispatch(logOut());
                } 
            });
    }

    useEffect(() => {
        fetchPostsToState();
    }, [])

    return (
        <div className="d-flex flex-column align-items-center"> 
            {posts.map( post => 
            <BlogPost post={post} key={post.id}/>
            )}
        </div>
    )
}