import React from "react";
import "./modal.css";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

const ModalComponent1: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <button onClick={closeModal} className="closeButton">X</button>
                <h2>모달 제목fffffff</h2>
                <p>모달 내용fffffffffff</p>
            </div>
        </div>
    );
};

export default ModalComponent1;