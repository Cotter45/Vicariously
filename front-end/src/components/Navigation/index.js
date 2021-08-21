// front-end/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProfileButton from './Menu/ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormPage';

import './Navigation.css';
import MessageButton from './Messages/MessageButton';
import SearchBar from './Search/searchbar';
import CreatePostModal from '../CreatePostModal';
import ViewBookingsModal from '../MyBookingsModal';
import { login } from '../../store/session';


function Navigation({ isLoggedIn }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demo = async () => {
    const user = {
      credential: 'demo',
      password: 'password'
    }
    await dispatch(login(user))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-buttons'>
        <CreatePostModal />
        <ViewBookingsModal />
        <MessageButton user={sessionUser}/>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='logged-out'>
        <button onClick={demo}>Demo</button>
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
