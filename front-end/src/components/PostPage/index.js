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

function PostPage() {
    const { postId } = useParams();
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts.posts[postId]);

    useEffect(() => {
        if (post) return;

        return dispatch(getPost(postId));
    }, [dispatch, postId, post])

    return (
        <div className='post-page'>
            <h2>{post && post.title}</h2>
            {post && (
                <>
                    <PostHead post={post} />
                    <ImageContainer post={post} />
                    <HostInfo post={post} />
                    <Reviews post={post} />
                </>
            )}
        </div>
    )
}

export default PostPage;
