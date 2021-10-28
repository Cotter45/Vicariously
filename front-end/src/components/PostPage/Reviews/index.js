// front-end/src/components/PostPage/Reviews/index.js

import './reviews.css';

function Reviews({post}) {
    const reviews = post.postReviews;

    return (
        <div className='reviews-container'>
            <h2>🌟 {reviews.length} reviews</h2>
            {reviews.map(review => (
                <div className='single-review' key={review.id}>
                    <div className='reviewer-info'>
                        <img className='reviewer-picture' src={review.User.profilePicture} alt='user'></img>
                        <div>
                            <h4>{review.User.username}</h4>
                            <p>{new Date(review.createdAt).toDateString()}</p>
                        </div>
                    </div>
                    <p>{review.review}</p>
                </div>
            ))}
        </div>
    )
}

export default Reviews;
