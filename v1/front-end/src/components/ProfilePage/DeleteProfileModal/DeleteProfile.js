// front-end/src/components/DeleteProfile/DeleteProfile.js
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logout } from '../../../store/session';

import { deleteProfile } from '../../../store/users';

function DeleteProfile({userId}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteMe = () => {
        dispatch(deleteProfile(userId));
        dispatch(logout());
        history.push('/');
    }
    return (
        <div>
            <h2>Are you sure?</h2>
            <div>
                <button onClick={deleteMe} className='edit-profile'>I'm sure!</button>
            </div>
        </div>

    )
}

export default DeleteProfile;
