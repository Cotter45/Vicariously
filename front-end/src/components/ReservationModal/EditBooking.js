import Calendar from "react-calendar";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { bookPost, getPost } from '../../store/posts';

import 'react-calendar/dist/Calendar.css';
import { cancelBooking } from "../../store/users";

function EditReservation({ setUpdate, setEditBooking, booking }) {
    const dispatch = useDispatch();

    const post = useSelector(state => state.posts.posts[booking.postId]);
    const user = useSelector(state => state.session.user);

    const [date, setDate] = useState();
    const [bookingDates, setBookingDates] = useState([]);

    useEffect(() => {
        if (post) return;

        dispatch(getPost(booking.postId))
    }, [booking.postId, dispatch, post])

    useEffect(() => {
        if (!post) return;

        setBookingDates(post.Bookings.map(booking => {
            return [
                booking.startDate, booking.endDate
            ]
        }))
    }, [post])


    const onChange = date => {
        setDate(date);
    }

    const tileClassName = ({date, view}) => {
        if (view === 'month') {
            if (new Date(date) < new Date()) return 'disabled-date';
            for (let i = 0; i < bookingDates.length; i++) {
                let bookedDate = bookingDates[i];
                if (new Date(date) >= new Date(bookedDate[0]) && new Date(date) <= new Date(bookedDate[1])) return 'booked-date';
            }
            return;
        }
    }

    const requestBooking = async () => {
        if (!date) return;

        const dates = {
            startDate: date[0].toDateString(),
            endDate: date[1].toDateString(),
            user
        }

        await dispatch(bookPost(dates, post.id));
        await dispatch(cancelBooking(booking.id, user.username));
        setUpdate(true);
        setEditBooking(false);
    }

    const cancelUpdate = () => {
        setUpdate(true);
        setEditBooking(false);
    }


    return (
        <>
            {post && (
                <div className='modal-form'>
                    <div className='calendar'>
                        <h2 className='calendar-head'>Select your new dates</h2>
                        <Calendar
                            onChange={onChange}
                            value={date}
                            selectRange
                            tileClassName={tileClassName}
                            />
                        <div className='selected-dates'>
                            <div className='start'>
                                <h3>Start</h3>
                                <div>
                                    {date && (
                                        <p>{date[0].toDateString()}</p>
                                    )}
                                </div>
                            </div>
                            <div className='end'>
                                <h3>End</h3>
                                <div>
                                    {date && (
                                        <p>{date[1].toDateString()}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='book'>
                            <button type='button' onClick={requestBooking}>Request a Visit</button>
                            <button type='button' onClick={cancelUpdate}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditReservation;
