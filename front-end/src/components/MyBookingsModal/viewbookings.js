// front-end/src/components/MyBookingsModal/viewbookings.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import './bookings.css';
import { getBookings } from "../../store/users";
import { deletePost } from "../../store/users";

function ViewBookings({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.users.bookings);
    const myStays = useSelector(state => state.users.myStays);

    const [bookings1, setBookings] = useState(bookings);
    const [myStays1, setMyStays] = useState(myStays);

    useEffect(() => {
        if ((bookings && bookings.length) || (myStays && myStays.length)) return;

        return dispatch(getBookings(user.id));
    }, [bookings, myStays, dispatch, user.id])



    const reRoute = (postId) => {
        history.push(`/posts/${postId}`)
        setShowModal(false);
    }

    console.log(myStays1)
    const removePost = (postId) => {
        const post = myStays1.find(post => post.id === postId);
        myStays1.splice(myStays.indexOf(post, 1));
        setMyStays(myStays1)
        dispatch(deletePost(postId))
    }

    return (
        <div id='booking-container'>
            <div className='card-container' >
                <h2>My Stays</h2>
                    {bookings1 && bookings1.map((booking, index) => (
                        <div key={booking.id} onClick={e => reRoute(booking.Post.id)} id='booking'>
                            <div>
                                <h4>{booking.Post.title}</h4>
                            </div>
                            <div id='dates'>
                                <div>
                                    <h4>Start Date</h4>
                                    <p>{booking.startDate}</p>
                                </div>
                                <div>
                                    <h4>End Date</h4>
                                    <p>{booking.endDate}</p>
                                </div>
                            </div>
                            <div className='buttons'>
                                <button>Update</button>
                                <button>Cancel</button>
                            </div>
                        </div>
                    ))}
            </div>
            <div className='card-container'>
                <h2>My Listings</h2>
                {myStays1 && myStays1.map((stay, index) => (
                    <div className='row'>
                        <div key={stay.id} onClick={e => reRoute(stay.id)} id='stay'>
                            <div id='stay-image'>
                                <img src={stay.Images.length && stay.Images[0].imageUrl} alt='stay'></img>
                            </div>
                            <div id='center'>
                                <h4>{stay.title}</h4>
                                {stay.Bookings.map(booking => (
                                    <div key={booking.id}>
                                        {booking && !booking.confirmed && (
                                            <>
                                                <button id='center-button'>Pending Confirmation</button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='buttons'>
                            <button>Edit</button>
                            <button onClick={e => removePost(stay.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ViewBookings;
