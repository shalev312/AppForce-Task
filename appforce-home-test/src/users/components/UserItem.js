import React, { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import { UserContext } from '../../shared/context/user-context';
import Avatar from '../../shared/components/UIElements/Avatar'
import Modal from '../../shared/components/UIElements/Modal';
import Card from '../../shared/components/UIElements/Card';
import UpdateUserForm from './UpdateUserForm';

import './UserItem.css';

const UserItem = props => {
  const userContext = useContext(UserContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const showUpdateFormHandler = () => {
    setShowUpdateModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const cancelUpdateFormHandler = event => {
    event.preventDefault()
    setShowUpdateModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    userContext.delete(props.id)
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="user-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>}
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <Modal
        show={showUpdateModal}
        onCancel={cancelUpdateFormHandler}
        header="Update User"
        footerClass="user-item__modal-actions">

        <UpdateUserForm closeModal={() => setShowUpdateModal(false)} cancel={cancelUpdateFormHandler} update={userContext.update} ip={{ ...props }} />
      </Modal>

      <li className="user-item">
        <Card className="user-item__content">
          <div className="user-item__image center">
            <Avatar image={props.image} alt={props.alt} width="6rem" height="6rem" />
          </div>
          <div className="user-item__info">
            <h2>{`${props.name.title} ${props.name.first} ${props.name.last}`}</h2>
            <h3>{`${props.location.country} ${props.location.city} ${props.location.street}`}</h3>
          </div>
          <div className="user-item__actions">
            <Button onClick={showUpdateFormHandler}>EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default UserItem;
