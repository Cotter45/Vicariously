// front-end/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as messageActions from '../../store/messages';

function MessageButton({ user }) {
  const dispatch = useDispatch();

  const messages = useSelector(state => state.messages.messages);

  const [showMenu, setShowMenu] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [responding, setResponding] = useState(false);
  const [message, setMessage] = useState({});
  const [uniqueMessages, setUniqueMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  const openMessage = (message) => {
    setShowMessage(true);
    setMessage(message);
  }

  const sendMessage = (e) => {
      e.preventDefault();
    console.log(newMessage)
    //   dispatch(sendMessage(e.target.value))
  }

  useEffect(() => {
    if (showMessage === false) return;
    if (responding === true) return;

    const closeMessage = () => {
        setMessage({});
        setNewMessage('');
        setResponding(false);
        setShowMessage(false);
    }

    document.addEventListener('click', closeMessage);
    return () => document.removeEventListener('click', closeMessage);
  }, [showMessage, responding])

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

  return (
    <>
        <div className='message-button'>
            <button onClick={openMenu}>
                <i className="far fa-envelope fa-2x"></i>
            </button>
            <div className='new-messages'>{messages? `${messages.length}` : null}</div>
        </div>
        {showMenu && showMessage === false && (
            <div className="message-dropdown">
                {messages && uniqueMessages.map(uniqueMessage => (
                    <div key={uniqueMessage.id} className='message' onClick={() => openMessage(uniqueMessage)}>
                        <img src={uniqueMessage.User.profilePicture} alt={'profile'}></img>
                        <h3>{uniqueMessage.User.username}</h3>
                        <p>{messages.filter(message => uniqueMessage.User.username === message.User.username).length} new</p>
                    </div>
                ))}
            </div>
        )}
        {showMessage && showMenu === false && (
            <div className='messenger-dropdown'>
                {messages && messages
                    .filter(messageItem => messageItem.userTwoId === message.userTwoId)
                    .sort((a, b) => a.createdAt - b.createdAt)
                    .map(each => (
                        <div key={each.id} className={each.userOneId === user.id ? 'left' : 'right'}>{each.message}</div>
                    ))
                }
                <form onSubmit={sendMessage}>
                    <label>
                        <input type='text'
                            placeholder='Type here...'
                            value={newMessage}
                            onChange={(event) => setNewMessage(event.target.value)}
                            onFocus={() => setResponding(true)}
                            onBlur={() => setResponding(false)}
                            ></input>
                    </label>
                    <button type='submit'>Send</button>
                </form>
            </div>
        )}
    </>
  )
}

export default MessageButton;
