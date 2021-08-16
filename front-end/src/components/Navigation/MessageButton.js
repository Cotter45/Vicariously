// front-end/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as messageActions from '../../store/messages';

function MessageButton({ user }) {
  const dispatch = useDispatch();

  const messages = useSelector(state => state.messages.messages);

  const [showMenu, setShowMenu] = useState(false);
  const [uniqueMessages, setUniqueMessages] = useState([]);

  const openMenu = () => {
    if (showMenu) return;

    if (messages) {
        let messageClip =
            Array.from(new Set(
                messages.map(message => message.User.username)))
                .map(username => {
                    return messages.find(message => message.User.username === username)
                })
        setUniqueMessages(messageClip)
    }

    setShowMenu(true);
  };

  useEffect(() => {
    if (messages) return;

    dispatch(messageActions.getMessages(user));


  }, [messages, dispatch, user])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return <>
    <button onClick={openMenu}>
      <i className="far fa-envelope fa-2x">{messages? ` ${messages.length} new` : ' ' + 0}</i>
    </button>
    {showMenu && (
      <div className="message-dropdown">
        {messages && uniqueMessages.map(message => (
          <div key={message.id} className='message'>
              <img src={message.User.profilePicture} alt={'profile'}></img>
              <h3>{message.User.username}</h3>
              <p>{messages.filter(mess => message.User.username === mess.User.username).length}</p>
          </div>
        ))}
      </div>
    )}
  </>;
}

export default MessageButton;
