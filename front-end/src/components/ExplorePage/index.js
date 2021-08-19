// front-end/src/components/ExplorePage/index.js
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { getFeatures } from '../../store/posts';

import MapContainer from '../Maps';
import './explorepage.css';
import { getKey } from '../../store/maps';

function ExplorePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    dispatch(getKey);

    const posts = useSelector(state => state.posts.featuredPosts);

    useEffect(() => {
        if (posts) return;

        dispatch(getFeatures());
    }, [posts, dispatch]);

    const visitPost = (postId) => {
        history.push(`/posts/${postId}`)
    }

    return (
        <div className='explore-page'>
            <div className='explore-left'>
                <h1>Featured Posts</h1>
                {posts && posts.map(post => (
                    <div key={post.id} onClick={() => visitPost(post.id)} className='post-card'>
                        <div className='post-card-image-container'>
                            <img className='post-card-image' src={post.Images[0].imageUrl} alt='posting'></img>
                        </div>
                        <div className='post-card-info'>
                            <div className='title'>
                                <h3>{post.title}</h3>
                            </div>
                            <div className='post-info'>
                                <p>{post.address} {post.city}, <b>{post.state} {post.country}</b> </p>
                                <p>{post.description}</p>
                                <p>{post.PostReviews.length} reviews</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='explore-right'>
                <MapContainer posts={posts} />
            </div>
        </div>
    )
}

export default ExplorePage;
