// front-end/src/components/SplashPage/index.js

import { useSelector } from 'react-redux';
import './splashpage.css'

function SplashPage() {
    const user = useSelector(state => state.session.user);
    console.log(user)

    return (
        <div className='main'>
            <div className='splash'>
                <div className='splash-memo'>
                    <h3>Miss your neighbors?</h3>
                    <p>Vicariously was created for you to connect with <br></br> people wherever you are.</p>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
