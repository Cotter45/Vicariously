// front-end/src/components/PostPage/HostInfo/index.js
import Calendar from 'react-calendar';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { bookPost } from '../../../store/posts';

import './hostinfo.css';
import 'react-calendar/dist/Calendar.css';

function HostInfo({post}) {
    const host = post.User;
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [date, setDate] = useState();
    const [success, setSuccess] = useState(false);

    const onChange = date => {
        setDate(date);
    }

    const bookingDates = post.Bookings.map(booking => {
        return [
            booking.startDate, booking.endDate
        ]
    })

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

    const requestBooking = () => {
        if (!user || !date) return;

        const dates = {
            startDate: date[0].toDateString(),
            endDate: date[1].toDateString(),
            user
        }

        const book = dispatch(bookPost(dates, post.id));
        if (book) setSuccess(true)
    }


    return (
        <div className='info'>
            <div className='left-side'>
                <div className='host'>
                    <div className='host-picture'>
                        <img src={host.profilePicture} alt='host'></img>
                    </div>
                    <div className='host-info'>
                        <p className='host-name'>Meet your Host, <b className='name'>{host.username}</b></p>
                        <div className='reviews'>
                            <p>{post.numUserRatings} Reviews {post.avgUserRating}</p>
                        </div>
                    </div>
                </div>
                <div className='post-rules'>
                    <h2>Things to know</h2>
                    <ul>
                        {post.PostRules.map(rule => (
                            <li key={rule.id}>{rule.rule}</li>
                        ))}
                    </ul>
                </div>
                <div className='spot-description'>
                    <h2>All about {host.username}'s spot</h2>
                    <p>{post.description}</p>
                </div>
            </div>
            <div className='calendar'>
                <h2 className='calendar-head'>Stop by for a Visit</h2>
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
                    {!user && (
                        <p>You must be logged in</p>
                    )}
                    {success && (
                        <p>Your request has been sent!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HostInfo;
