// front-end/src/components/PostPage/Reviews/index.js

import './reviews.css';

function Reviews({post}) {
    const reviews = post.postReviews;
    console.log(reviews)

    return (
        <div className='reviews-container'>
            <h2>🌟 {reviews.length} reviews</h2>
            {reviews.map(review => (
                <>
                    <div className='reviewer-info' key={review.User.id}>
                        <img className='reviewer-picture' src={review.User.profilePicture} alt='user'></img>
                        <div>
                            <h4>{review.User.username}</h4>
                            <p>{new Date(review.createdAt).toDateString()}</p>
                        </div>
                    </div>
                    <p>{review.review}</p>
                </>
            ))}
        </div>
    )
}

export default Reviews;
