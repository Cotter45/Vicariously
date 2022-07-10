// front-end/src/components/PostPage/EditPostModal/index.js
import { useState } from 'react';

import { Modal } from '../context/Modal/Modal';

import EditPost from './editpostmodal';

function EditPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostModal post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default EditPostModal;
