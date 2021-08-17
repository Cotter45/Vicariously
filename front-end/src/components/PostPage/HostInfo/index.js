// front-end/src/components/PostPage/HostInfo/index.js
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';

import './hostinfo.css';
import 'react-calendar/dist/Calendar.css';

function HostInfo({post}) {
    const host = post.User;

    const [value, setValue] = useState();
    // const [disabledDates, setDisabledDates] = useState([]);

    console.log(value)
    const bookingDates = post.Bookings.map(booking => {
        return [
            booking.startDate, booking.endDate
        ]
    })

    // useEffect(() => {
    //     if (!value) return;

    //     const removeDates = () => {
    //         setValue();
    //     }
    //     document.addEventListener('click', removeDates);
    //     return () => document.removeEventListener('click', removeDates);
    // }, [value])

    const tileClassName = ({date, view}) => {
        if (view === 'month') {
            if (date < new Date()) return 'disabled-date';
            for (let i = 0; i < bookingDates.length; i++) {
                let bookedDate = bookingDates[i];
                if (date >= new Date(bookedDate[0]) && date <= new Date(bookedDate[1])) return 'booked-date';
            }

        }
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
                <div className='description'>
                    <h2>All about {host.username}'s spot</h2>
                    <p>{post.description}</p>
                </div>
            </div>
            <div className='calendar'>
                <h2 className='calendar-head'>Stop by for a Visit</h2>
                <div className='key'>
                    <div className='yellow'></div>
                    <p>: Today</p>
                    <div className='blue'></div>
                    <p>: Booked</p>
                </div>
                <Calendar
                    onChange={setValue}
                    value={value}
                    selectRange
                    tileClassName={tileClassName}
                    />
                <div className='selected-dates'>
                    <div className='start'>
                        <h3>Start</h3>
                        {value && (
                            <p>{value[0].toDateString()}</p>
                        )}
                    </div>
                    <div className='end'>
                        <h3>End</h3>
                        {value && (
                            <p>{value[1].toDateString()}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HostInfo;
