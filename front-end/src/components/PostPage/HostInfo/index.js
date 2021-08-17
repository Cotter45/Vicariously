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

    const blockDates = (disabledDates) => {

    }

    console.log(disabledDates)

    const [value, onChange] = useState();

    // console.log(value[0].toDateString())
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
                    selectRange
                    disabledDates
                    />
                {value && (
                    <div className='selected-dates'>
                        <div className='start'>
                            <h3>Start</h3>
                            <p>{value[0].toDateString()}</p>
                        </div>
                        <div className='end'>
                            <h3>End</h3>
                            <p>{value[1].toDateString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default HostInfo;
