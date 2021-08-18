// front-end/src/components/ExplorePage/index.js
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getFeatures } from '../../store/posts';

function ExplorePage() {
    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.featuredPosts);

    useEffect(() => {
        if (posts) return;

        dispatch(getFeatures());
    }, [posts, dispatch]);

    return (
        <h2>hello</h2>
    )
}

export default ExplorePage;
