// front-end/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as messageActions from '../../store/messages';

function MessageButton({ user }) {
  const dispatch = useDispatch();

  const messages = useSelector(state => state.messages.messages);

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    dispatch(messageActions.getMessages(user))
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

//   const messageButtonClick = (e) => {
//     dispatch(messageActions.getMessages());
//   };

  return (
    <>
      <button onClick={openMenu}>
        <i className="far fa-comment-dots fa-2x" />
      </button>
      {showMenu && (
        <div className="message-dropdown">
          {messages && messages.map(message => (
            <div key={message.id} className='message'>
                <img src={message.User.profilePicture} alt={'profile'}></img>
                <h3>{message.User.username}:</h3>
                <p>{message.message}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MessageButton;
