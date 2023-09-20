import React, { useRef } from 'react';
import './Modal.css';
import { useGlobalState } from '../../context';
import UpdateUser from './updateUser';

function Modal({choice}) {
  const { modalOpen, setModalOpen } = useGlobalState();

  
  console.log('rendering modal');
  return (
    <div className="full-screen-modal">
      <div className="modal-background" onClick={()=>setModalOpen(false)}></div>
      <div className="modal-content">
          <UpdateUser choice={choice}/>
      </div>
    </div>
  );
}

export default Modal;
