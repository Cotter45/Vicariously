// front-end/src/components/SplashPage/index.js

import { useSelector } from 'react-redux';
import './splashpage.css'

function SplashPage() {
    const user = useSelector(state => state.session.user);
    console.log(user)

    return (
        <div className='main'>
            <div className='splash'>
                <h2>hello</h2>
            </div>
        </div>
    )
}

export default SplashPage;
