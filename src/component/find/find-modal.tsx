import React from "react";
import "./find.css";

interface ModalProps {
    isOpenFind: boolean;
    closeModalFind: () => void;
    guestId: string | null;  // guestId as string | null
}

const FindComponent: React.FC<ModalProps> = ({ isOpenFind, closeModalFind, guestId }) => {
    if (!isOpenFind) return null;

    return (
        <div className="overlay2-find" role="dialog" aria-modal="true">
            <div className="find">
                <button onClick={closeModalFind} className="closeButton" aria-label="Close modal">X</button>
                {/* Check if guestId is null or not */}
                {guestId ? (
                    <div>찾은 아이디는 <strong>{guestId}</strong>입니다.</div>
                ) : (
                    <div>아이디를 찾을 수 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default FindComponent;
