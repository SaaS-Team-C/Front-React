import React from 'react';
import './style.css'; // 모달의 스타일을 위한 CSS 파일

// ModalProps 타입 정의
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: React.ReactNode; // children의 타입을 React.ReactNode로 정의
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-header'>
                    <h2>{title}</h2>
                    <button className='close-button' onClick={onClose}>X</button>
                </div>
                <div className='modal-content'>
                    {children} {/* 여기에 children을 렌더링 */}
                </div>
            </div>
        </div>
    );
};

export default Modal;