// front-end/src/components/MyBookingsModal/viewbookings.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBookings } from "../../store/users";

import './bookings.css';

function ViewBookings({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.users.bookings);
    const myStays = useSelector(state => state.users.myStays);

    useEffect(() => {
        if (bookings.length || myStays.length) return;

        return dispatch(getBookings(user.id));
    })

    const reRoute = (postId) => {
        history.push(`/posts/${postId}`)
        setShowModal(false);
    }

    return (
        <div id='booking-container'>
            <div className='card-container' >
                <h2>My Stays</h2>
                    {bookings && bookings.map((booking, index) => (
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
                {myStays && myStays.map((stay, index) => (
                    <>
                        <div key={stay.id} onClick={e => reRoute(stay.id)} id='stay'>
                            <div id='stay-image'>
                                <img src={stay.Images[0].imageUrl} alt='stay'></img>
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
                                        {booking && (
                                            <>
                                                <button id='center-button'>View Bookings</button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className='buttons'>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}


export default ViewBookings;
