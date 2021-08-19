// front-end/src/components/UserReviewModal/UserReview.js
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { reviewUser } from "../../../store/users";

function UserReview({userId, userReviews, setUserReviews, setShowModal}) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [rating, setRating] = useState(3);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let newReview = {
            rating,
            review,
            reviewerId: user.id,
            userId
        }

        setErrors([]);
        setShowModal(false);
        setUserReviews([...userReviews, newReview])
        return dispatch(reviewUser(userId, newReview))
    }

    const displayStars = (value) => {
        switch(value) {
            case '1':
                setStars('⭐️')
                return;
            case '2':
                setStars('⭐️⭐️')
                return;
            case '3':
                setStars('⭐️⭐️⭐️')
                return;
            case '4':
                setStars('⭐️⭐️⭐️⭐️')
                return;
            case '5':
                setStars('⭐️⭐️⭐️⭐️⭐️')
                return;
            default:
                return;
        }
    }


    return (
        <form className='modal-form' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>Rating 1-5</label>
            <input
                type='range'
                value={rating}
                min='1'
                max='5'
                onChange={(e) => {
                    setRating(e.target.value)
                    displayStars(e.target.value)
                }}
                required
            />
            <h2>{stars}</h2>
            <label>Review</label>
            <textarea
                type='text'
                value={review}
                onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button className='edit-profile-button' type="submit">Submit Review</button>
        </form>
    )
}

export default UserReview;
