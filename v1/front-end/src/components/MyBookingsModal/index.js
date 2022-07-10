// front-end/src/components/MyBookingModal/index.js
import { useState } from 'react';

import { Modal } from '../context/Modal/Modal';

import ViewBookings from './viewbookings';


function ViewBookingsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='message-button'>
      <button onClick={() => setShowModal(true)}><i className="fas fa-book fa-2x"/></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ViewBookings setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default ViewBookingsModal;
