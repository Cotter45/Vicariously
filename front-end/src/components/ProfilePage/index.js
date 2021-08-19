// front-end/src/components/ProfilePage/index.js
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { useEffect, useState } from 'react';

import './profilepage.css';
import { getProfile } from '../../store/users';
import EditProfileModal from './EditProfileModal';
import DeleteProfileModal from './DeleteProfileModal';
import UserReviewModal from './UserReviewModal';
import CreatePostModal from './CreatePostModal';

function ProfilePage() {
    const dispatch = useDispatch();
    const userId = useParams().userId;
    const history = useHistory();

    const users = useSelector(state => state.users.users);
    const sessionUser = useSelector(state => state.session.user);
    const user = users.find(user => user.id === +userId);

    const [username, setUsername] = useState(user ? user.username : '');
    const [birthday, setBirthday] = useState(user ? user.birthday : '');
    const [profilePicture, setProfilePicture] = useState(user ? user.profilePicture : '');
    const [description, setDescription] = useState(user ? user.description : '');
    const [userReviews, setUserReviews] = useState(user ? user.UserReviews : '');

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
        setUserReviews(user.UserReviews);
    }, [user])

    const visitPost = (postId) => {
        history.push(`/posts/${postId}`)
    }

    return (
        <div className='profile-page-container'>
            {user && (
                <>
                    <h1>{user.username}'s Profile</h1>
                    <div className='profile-container'>
                        <div className='user-left'>
                            <div className='post-card-image-container'>
                                <img className='post-card-image' src={profilePicture} alt='profile'></img>
                            </div>
                            <div className='post-card-info'>
                                <div className='username'>
                                    <h3>{username}</h3>
                                    <div className={user.online ? 'online' : 'offline' }></div>
                                </div>
                                <h3>{user.UserReviews.length} reviews {user.avgUserRating}</h3>
                                <p><b>Birthday</b> {new Date(birthday).toDateString()}</p>
                                <h3>Bio</h3>
                                <div className='description'>
                                    <p>{description}</p>
                                </div>
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
                                {sessionUser && sessionUser.id !== user.id && (
                                    <div className='edit'>
                                        <UserReviewModal
                                            userId={user.id}
                                            userReviews={userReviews}
                                            setUserReviews={setUserReviews} />
                                    </div>
                                )}
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className='listings-container'>
                        <h1>{user.username}'s Listings</h1>
                        {sessionUser && sessionUser.id === user.id && (
                            <CreatePostModal />
                        )}
                        {user.posts.map(post => (
                            <div key={post.id} onClick={() => visitPost(post.id)} className='listing-container'>
                                <div className='post-card-image-container'>
                                    <img className='post-card-image' src={post.Images[0].imageUrl} alt='posting'></img>
                                </div>
                                <div className='post-card-info'>
                                    <div className='title'>
                                        <h3>{post.title}</h3>
                                    </div>
                                    <div className='post-info'>
                                        <p>{post.address} {post.city}, <b>{post.state} {post.country}</b> </p>
                                        <div className='description'>
                                            <p>{post.description}</p>
                                        </div>
                                        <p>{post.PostReviews.length} reviews</p>
                                    </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className='reviews-container'>
                        <h2>🌟 {user.userReviews.length} reviews</h2>
                        {user.userReviews.map(review => (
                            <div key={review.id}>
                                <div className='reviewer-info'>
                                    <img className='reviewer-picture' src={review.User.profilePicture} alt='user'></img>
                                    <div>
                                        <h4>{review.User.username}</h4>
                                        <p>{new Date(review.createdAt).toDateString()}</p>
                                    </div>
                                </div>
                                <p>{review.review}</p>
                            </div>
                         ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ProfilePage;
