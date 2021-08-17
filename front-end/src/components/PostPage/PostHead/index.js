// front-end/src/components/PostPage/PostHead/index.js
import './posthead.css';

function PostHead({post}) {

    return (
        <div className='post-head'>
            <div className='left-head'>
                <div className='reviews'>{post.PostReviews.length} Reviews  {post.avgRating}</div>
                <div className='location'>{`📍 ${post.address} ${post.city}, ${post.state}`}</div>
                <div className='categories'>
                    {post.Categories.map(category => (
                        <div className='category' key={category}>{category.category}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PostHead;
