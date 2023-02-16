import { useSelector } from 'react-redux';
import { selectPublishedPosts } from '../../features/post/postsSlice';
import { BlogPost } from './BlogPost';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Blog = () => {
    const posts = useSelector(selectPublishedPosts);

    return (
        <div className="d-flex flex-column align-items-center"> 
            {posts.map( post => 
            <BlogPost post={post} key={post.id}/>
            )}
        </div>
    )
}