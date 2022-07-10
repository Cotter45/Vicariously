// front-end/src/components/MyBookingsModal/viewbookings.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import './bookings.css';
import { getBookings, deletePost, cancelBooking } from "../../store/users";
import EditPost from "../EditPostModal/editpostmodal";
import EditReservation from "../ReservationModal/EditBooking";

function ViewBookings({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.users.bookings);
    const myStays = useSelector(state => state.users.myStays);

    const [reservations, setReservations] = useState(bookings);
    const [myListings, setMyListings] = useState(myStays);
    const [stay, setStay] = useState([]);
    const [booking, setBooking] = useState([]);


    const [change, setChange] = useState(false);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [editBooking, setEditBooking] = useState(false);

    useEffect(() => {
        if (!reservations.length && !myListings.length) {
            dispatch(getBookings(user.id))
            setReservations(bookings);
            setMyListings(myStays)
        }
    }, [bookings, reservations, dispatch, myStays, myListings, user.id]);

    useEffect(() => {
        if (!change) return;
        setReservations(bookings);
        setMyListings(myStays);

        return setChange(false);
    }, [bookings, change, dispatch, myStays, user.id])

    useEffect(() => {
        if (!update) return;
        setReservations(bookings);
        setMyListings(myStays);

        return setUpdate(false);
    }, [bookings, myStays, update])

    const reRoute = (postId) => {
        history.push(`/posts/${postId}`)
        setShowModal(false);
    }

    const removePost = async (postId) => {
        await dispatch(deletePost(postId))
        setChange(true);
    }

    const editPost = (post) => {
        setStay(post);
        setEdit(true);
    }

    const cancel = async (bookingId, username) => {
        await dispatch(cancelBooking(bookingId, username));
        setChange(true);
    }

    const changeBooking = async (booking) => {
        setBooking(booking);
        setEditBooking(true);
    }

    return (
        <>
        {!edit && !editBooking && !update && (
            <div id='booking-container'>
                <div className='card-container' >
                    <h2>My Stays</h2>
                        {!update && reservations && reservations.map((booking, index) => (
                            <div key={booking.id} className='row'>
                                <div onClick={e => reRoute(booking.Post.id)} id='booking'>
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
                                </div>
                                <div className='buttons'>
                                    <button onClick={() => changeBooking(booking)}>Update</button>
                                    <button onClick={() => cancel(booking.id, user.username)}>Cancel</button>
                                </div>
                            </div>
                        ))}
                </div>
                <div className='card-container'>
                    <h2>My Listings</h2>
                    {!change && myListings && myListings.map((stay, index) => (
                        <div key={stay.id} className='row'>
                            <div onClick={e => reRoute(stay.id)} id='stay'>
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
                                <button onClick={e => editPost(stay)}>Edit</button>
                                <button onClick={e => removePost(stay.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {edit && !editBooking && (
            <EditPost setUpdate={setUpdate} setEdit={setEdit} post={stay} />
        )}
        {editBooking && !edit && (
            <EditReservation setUpdate={setUpdate} setEditBooking={setEditBooking} booking={booking} />
        )}
    </>
    )
}


export default ViewBookings;
