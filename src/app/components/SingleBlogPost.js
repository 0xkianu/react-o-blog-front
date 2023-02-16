import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAllPosts } from '../../features/post/postsSlice';
import { BlogPost } from './BlogPost';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SingleBlogPost = () => {
    const posts = useSelector(selectAllPosts);
    let { postID } = useParams();

    return (
        <div className="d-flex flex-column align-items-center"> 
            <BlogPost post={posts[postID]}/>
        </div>
    )
}