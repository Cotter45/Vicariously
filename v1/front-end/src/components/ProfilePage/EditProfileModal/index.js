// front-end/src/components/EditProfileModal/index.js
import { useState } from 'react';

import { Modal } from '../../context/Modal/Modal';
import EditProfile from './EditProfile';

function EditProfileModal({ username, setUsername, birthday, setBirthday, profilePicture, setProfilePicture, description, setDescription }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-profile' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfile
            username={username}
            setUsername={setUsername}
            birthday={birthday}
            setBirthday={setBirthday}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            description={description}
            setDescription={setDescription}
          />
        </Modal>
      )}
    </>
  );
}

export default EditProfileModal;
