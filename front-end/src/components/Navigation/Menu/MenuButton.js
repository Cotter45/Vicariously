// front-end/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";

import * as sessionActions from '../../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const profile = () => {
    history.push(`/profile/${user.id}`);
  }

  return (
    <>
      <div className='menu'>
        <button onClick={openMenu}>
          <i className="fas fa-bars fa-2x" />
        </button>
      </div>
      {showMenu && (
        <div className="menu-dropdown">
          <div className='menu-info'>
            <img src={user.profilePicture} alt='profile'></img>
            <div>
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <div className='post-card-info'>
            <button className='edit-profile' onClick={profile}>Profile</button>
            <button className='edit-profile' onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
