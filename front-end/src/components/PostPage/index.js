// front-end/src/components/PostPage/index.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getPost } from '../../store/posts';
import ImageContainer from './ImageContainer';

import PostHead from './PostHead';

import './postpage.css';

function PostPage() {
    const { postId } = useParams();
    const dispatch = useDispatch();

    const selectedPost = useSelector(state => state.searchResults.posts.post);

    useEffect(() => {
        if (selectedPost) return;

        return dispatch(getPost(postId));
    }, [dispatch, postId, selectedPost])

    return (
        <div className='post-page'>
            <h2>{selectedPost && selectedPost.description}</h2>
            {selectedPost && (
                <>
                    <PostHead post={selectedPost} />
                    <ImageContainer post={selectedPost} />
                </>
            )}
        </div>
    )
}

export default PostPage;
