// front-end/src/components/CreatePostModal/index.js
import { useState } from 'react';

import { Modal } from '../../context/Modal/Modal';

import CreatePost from './CreatePost';


function CreatePostModal({ username, setUsername, birthday, setBirthday, profilePicture, setProfilePicture, description, setDescription }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-profile' onClick={() => setShowModal(true)}>New Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
