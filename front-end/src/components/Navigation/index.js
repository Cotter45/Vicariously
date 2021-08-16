// front-end/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileButton from './MenuButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';

import './Navigation.css';
import MessageButton from './MessageButton';

function Navigation({ isLoggedIn }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <MessageButton user={sessionUser}/>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav className='nav-bar'>
        <NavLink exact to="/"><i className="fas fa-home fa-2x"/></NavLink>
        {isLoggedIn && sessionLinks}
    </nav>
  );
}

export default Navigation;
