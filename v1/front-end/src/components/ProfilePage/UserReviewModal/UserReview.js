// front-end/src/components/UserReviewModal/UserReview.js
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProfile, reviewUser } from "../../../store/users";

function UserReview({userId, userReviews, setUserReviews, setShowModal, update, setUpdate}) {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [rating, setRating] = useState(3);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newReview = {
            rating,
            review,
            reviewerId: user.id,
            userId
        }

        // const reviewTotal = document.getElementById('user-reviews-total');
        // const current = reviewTotal.innerText.split(' ');
        // const replace = parseInt(current[1], 10) + 1;
        // reviewTotal.innerText = reviewTotal.innerText.replace(/\d/, replace)

        // const reviews = document.getElementById('reviews-container');

        setErrors([]);
        setShowModal(false);
        // setUserReviews([...userReviews, newReview])
        await dispatch(reviewUser(userId, newReview))
        await dispatch(getProfile(userId));
        setUpdate(!update);
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
