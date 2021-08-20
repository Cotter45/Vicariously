// front-end/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MenuButton from './Menu/MenuButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';

import './Navigation.css';
import MessageButton from './Messages/MessageButton';
import SearchBar from './Search/searchbar';
import CreatePostModal from '../ProfilePage/CreatePostModal';


function Navigation({ isLoggedIn }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-buttons'>
        <MessageButton user={sessionUser}/>
        <MenuButton user={sessionUser} />
        <div className='nav-modals'>
          <CreatePostModal />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='logged-out'>
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }

  return (
    <nav className='nav-bar'>
        <NavLink className='active' exact to="/">Vicariously</NavLink>
        <SearchBar />
        {isLoggedIn && sessionLinks}
    </nav>
  );
}

export default Navigation;
