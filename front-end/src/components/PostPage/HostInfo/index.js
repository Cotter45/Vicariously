// front-end/src/components/PostPage/HostInfo/index.js
import Calendar from 'react-calendar';
import { useState } from 'react';

import './hostinfo.css';
import 'react-calendar/dist/Calendar.css';

function HostInfo({post}) {
    const host = post.User;

    const disabledDates = post.Bookings.map(booking => {
        return [
            booking.startDate, booking.endDate
        ]
    })

    console.log(disabledDates)

    const [value, onChange] = useState(new Date());

    return (
        <div className='info'>
            <div className='host'>
                <div className='host-picture'>
                    <img src={host.profilePicture} alt='host'></img>
                </div>
                <div className='host-info'>
                    <p className='host-name'>Meet your Host, {host.username}</p>
                    <div className='reviews'>
                        <p>{post.numUserRatings} Reviews {post.avgUserRating}</p>
                    </div>
                </div>
            </div>
            <div className='calendar'>
                <Calendar
                    onChange={onChange}
                    value={value}
                    />
            </div>
        </div>

    )
}

export default HostInfo;
