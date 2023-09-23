import React, { useRef } from 'react';
import './Modal.css';
import { useGlobalState } from '../../context';
import UpdateUser from './updateUser';
import UserCoursesList from './userCourses';
import Subscription from './Subscription';

function Modal({choice}) {
  const { modalOpen, setModalOpen } = useGlobalState();

  
  return (
    <div className="full-screen-modal-user">
      <div className="modal-background-user" onClick={()=>setModalOpen(false)}></div>
      <div className="modal-content-user">
          {choice=='subscription' && <Subscription />}
          {choice=='courses' && <UserCoursesList/>}
          {choice.id && <UpdateUser user={choice}/>}
      </div>
    </div>
  );
}

export default Modal;
