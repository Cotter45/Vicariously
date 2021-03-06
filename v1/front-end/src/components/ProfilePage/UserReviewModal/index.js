// front-end/src/components/UserReviewModal/index.js
import { useState } from 'react';

import { Modal } from '../../context/Modal/Modal';
import UserReview from './UserReview';

function UserReviewModal({userId, userReviews, setUserReviews, update, setUpdate}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-profile' onClick={() => setShowModal(true)}>Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserReview
            userId={userId}
            userReviews={userReviews}
            setUserReviews={setUserReviews}
            setShowModal={setShowModal}
            update={update}
            setUpdate={setUpdate}
          />
        </Modal>
      )}
    </>
  );
}

export default UserReviewModal;
