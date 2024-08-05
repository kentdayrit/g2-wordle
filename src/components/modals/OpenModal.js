
import React from 'react';
import Modal from 'react-modal';
import './OpenModal.css';

const OpenModal = ({ isOpen, onRequestClose, title, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
        >
            <h2>{title}</h2>
            <div className="modal-content">
                {children}
            </div>
            <button className="close-button" onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default OpenModal;
