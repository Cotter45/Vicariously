// front-end/src/components/DeleteProfileModal/index.js
import { useState } from 'react';

import { Modal } from '../../context/Modal/Modal';
import DeleteProfile from './DeleteProfile';

function DeleteProfileModal({userId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-profile' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteProfile
            userId={userId}
          />
        </Modal>
      )}
    </>
  );
}

export default DeleteProfileModal;
