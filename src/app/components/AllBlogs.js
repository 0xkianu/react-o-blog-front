import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/post/postsSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AllBlogs = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    const fetchUsers = async () => {
        await fetch('/blog/users')
            .then(response => response.json())
            .then((json) => {
                if(json.isLoggedIn) {
                    setUsers(json.users);
                } else {
                    dispatch(logOut());
                } 
            });
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="d-flex flex-column align-items-start m-5"> 
            {users.map((user) => 
            <NavLink to={"/blog/users/"+user.username} className="my-2"><span className="blog-link">{user.username}</span></NavLink>
            )}
        </div>
    )
}