import React, { useState } from 'react';

import AddNewUserForm from '../../../users/components/AddNewUserForm';
import Button from '../FormElements/Button';
import Modal from '../UIElements/Modal';

import './MainHeader.css';

const MainHeader = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const cancelAddUserFormHandler = event => {
    event.preventDefault();
    setShowAddUserModal(false);
  }

  const showAddUserFormHandler = () => {
    setShowAddUserModal(true);
  }

  return <header className="main-header">
    <h1>
      AppsForce-Task
    </h1>
    <Modal
      show={showAddUserModal}
      onCancel={cancelAddUserFormHandler}
      header="Add New User"
      footerClass="place-item__modal-actions">
      <AddNewUserForm
        closeModal={() => setShowAddUserModal(false)}
        cancel={cancelAddUserFormHandler} />
    </Modal>
    <Button danger small onClick={showAddUserFormHandler}>ADD USER</Button>
  </header>;
};

export default MainHeader;
