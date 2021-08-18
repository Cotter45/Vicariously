// front-end/src/components/ProfilePage/index.js
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import './profilepage.css';
import { getProfile } from '../../store/users';
import EditProfileModal from './EditProfileModal';
import DeleteProfileModal from './DeleteProfileModal';

function ProfilePage() {
    const dispatch = useDispatch();
    const userId = useParams().userId;

    const users = useSelector(state => state.users.users);
    const sessionUser = useSelector(state => state.session.user);
    const user = users.find(user => user.id === +userId);

    const [username, setUsername] = useState(user ? user.username : '');
    const [birthday, setBirthday] = useState(user ? user.birthday : '');
    const [profilePicture, setProfilePicture] = useState(user ? user.profilePicture : '');
    const [description, setDescription] = useState(user ? user.description : '');

    useEffect(() => {
        if (user) return;

        dispatch(getProfile(userId));
    }, [dispatch, user, userId])

    useEffect(() => {
        if (!user) return;

        setUsername(user.username);
        setBirthday(user.birthday);
        setProfilePicture(user.profilePicture);
        setDescription(user.description);
    }, [user])

    return (
        <div className='profile-page-container'>
            {user && (
                <div className='profile-container'>
                    <div className='user-left'>
                        <div className='post-card-image-container'>
                            <img className='post-card-image' src={profilePicture} alt='profile'></img>
                        </div>
                        <div className='post-card-info'>
                            <h3>{username}</h3>
                            <h3>{user.UserReviews.length} reviews {user.avgUserRating}</h3>
                            <p><b>Birthday</b> {new Date(birthday).toDateString()}</p>
                            <p>{description}</p>
                            {sessionUser && sessionUser.id === user.id && (
                                <div className='edit'>
                                    <EditProfileModal
                                    username={username}
                                    setUsername={setUsername}
                                    birthday={birthday}
                                    setBirthday={setBirthday}
                                    profilePicture={profilePicture}
                                    setProfilePicture={setProfilePicture}
                                    description={description}
                                    setDescription={setDescription}
                                    />
                                    <DeleteProfileModal userId={user.id}/>
                                </div>
                            )}
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage;
