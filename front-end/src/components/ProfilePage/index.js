// front-end/src/components/ProfilePage/index.js
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { useEffect, useState } from 'react';

import './profilepage.css';
import { getProfile } from '../../store/users';
import EditProfileModal from './EditProfileModal';
import DeleteProfileModal from './DeleteProfileModal';
import UserReviewModal from './UserReviewModal';
import CreatePostModal from '../CreatePostModal';

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
    const [userReviews, setUserReviews] = useState(user ? user.userReviews : '');

    const [update, setUpdate] = useState(false);

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
        setUserReviews(user.userReviews);
        // setUpdate(!update);
    }, [user])

    useEffect(() => {
        if (!update || !user) return;
        setUserReviews(user.userReviews);
        setUpdate(!update);
        console.log('update')
    }, [dispatch, update, user, userId])

    const visitPost = (postId) => {
        history.push(`/posts/${postId}`)
    }

    return (
        <div className='profile-page-container' id='mobile-profile-container'>
            {user && (
                <div className='profile'>
                    <h1>{user.username}'s Profile</h1>
                    <div className='profile-container' id='profile-container'>
                        <div className='user-left' id='user-left'>
                            <div className='post-card-image-container' id='profile-image-container'>
                                <img className='post-card-image' src={profilePicture} alt='profile'></img>
                            </div>
                            <div className='post-card-info' id='profile-info'>
                                <div className='username'>
                                    <h3>{username}</h3>
                                    <div className={user.online ? 'online' : 'offline' }></div>
                                </div>
                                <h3>{userReviews.length} reviews {user.avgUserRating}</h3>
                                <p><b>Birthday</b> {new Date(birthday).toDateString()}</p>
                                <h3>Bio</h3>
                                <div className='description' id='description'>
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
                                            setUserReviews={setUserReviews} 
                                            setUpdate={setUpdate}
                                            update={update}
                                            />
                                    </div>
                                )}
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <div className='listings-container' id='listings-container'>
                        <h1>{user.username}'s Listings</h1>
                        {sessionUser && sessionUser.id === user.id && (
                            <div className='new-post' id='new-post'>
                                <h2>New</h2>
                                <CreatePostModal />
                            </div>
                        )}
                        {user.posts.map(post => (
                            <div key={post.id} onClick={() => visitPost(post.id)} className='listing-container' id='listing'>
                                <div className='post-card-image-container' id='image-container'>
                                    <img className='post-card-image' id='image' src={post.Images[0].imageUrl} alt='posting'></img>
                                </div>
                                <div className='post-card-info' id='info'>
                                    <div className='title' id='title'>
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
                    <div className='reviews-container' id='reviews-container'>
                        <h2 id='user-reviews-total'>🌟 {user.userReviews.length} reviews</h2>
                        {userReviews.length && userReviews.map(review => (
                            <div key={review.id}>
                                <div className='reviewer-info'>
                                    <img className='reviewer-picture' src={review.User.profilePicture} alt='user'></img>
                                    <div>
                                        <h4>{review.User.username}</h4>
                                        <p>{new Date(review.createdAt).toDateString()}</p>
                                    </div>
                                </div>
                                <p id='review'>{review.review}</p>
                            </div>
                         ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfilePage;
