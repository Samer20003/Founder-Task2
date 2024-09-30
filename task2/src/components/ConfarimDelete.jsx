import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function ConfarimDelete({onClose, OnConfirm}) {
    return (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Warning</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              <p>Are you sure you want to delete the post !! </p>
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>Close</Button>
              <Button variant="primary" onClick={OnConfirm}>Yes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      );
}

export default ConfarimDelete