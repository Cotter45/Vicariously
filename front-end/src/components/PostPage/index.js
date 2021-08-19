// front-end/src/components/PostPage/index.js
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { getPost } from '../../store/posts';
import HostInfo from './HostInfo';
import ImageContainer from './ImageContainer';
import PostHead from './PostHead';
import Reviews from './Reviews';

import './postpage.css';
import MapContainer from '../Maps';

function PostPage() {
    const { postId } = useParams();
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts.posts[postId]);

    const [location, setLocation] = useState(false);

    useEffect(() => {
        if (post) return;

        return dispatch(getPost(postId));
    }, [dispatch, postId, post])

    useEffect(() => {
        if (!post) return;
        if (location) return;
console.log('hey')
        return setLocation([{
            lat: +post.lat,
            lng: +post.lng
        }])
    }, [post, location])

    return (
        <div className='post-page'>
            <h2>{post && post.title}</h2>
            {post && (
                <>
                    <PostHead post={post} />
                    <ImageContainer post={post} />
                    <HostInfo post={post} />
                    <Reviews post={post} />
                    <div className='post-map'>
                        <h2>Where you'll be</h2>
                        {location && (
                            <MapContainer location={location} />
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default PostPage;
