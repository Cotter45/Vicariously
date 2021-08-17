// front-end/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
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

  return (
    <>
      <div className='menu'>
        <button onClick={openMenu}>
          <i className="fas fa-bars fa-2x" />
        </button>
      </div>
      {showMenu && (
        <div className="menu-dropdown">
          <div className='info'>
            <img src={user.profilePicture} alt='profile'></img>
            <div>
              <h3>{user.username}</h3>
              <p>{user.email}</p>
            </div>
          </div>
            <button onClick={() => console.log('stuff')}>Profile</button>
            <button onClick={logout}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
