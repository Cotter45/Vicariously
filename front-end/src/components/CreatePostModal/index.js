// front-end/src/components/CreatePostModal/index.js
import { useState } from 'react';

import { Modal } from '../context/Modal/Modal';

import CreatePost from './CreatePost';


function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='message-button'>
      <button onClick={() => setShowModal(true)}><i className="fas fa-plus fa-2x"/></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePost setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default CreatePostModal;
