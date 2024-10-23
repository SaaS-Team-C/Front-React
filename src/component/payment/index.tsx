import React, { ChangeEvent } from 'react';
import './style.css';

interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    message: string;
    messageError: boolean;
    buttonName?: string;

    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
}

export default function InputBox3({
    label,
    type,
    placeholder,
    value,
    buttonName,
    message,
    messageError,
    onChange,
    onButtonClick
}: Props) {

    return (

        <div id='payment-wrapper'>
            <div className="payment-input-container2">
                <label>{label}</label>
                <div className="payment-input-with-button">
                    <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
                    {buttonName && <button onClick={onButtonClick}>{buttonName}</button>}
                </div>
                {message && <p className="message">{message}</p>}
                {messageError && <p className="messageError">{messageError}</p>}
            </div>
        </div>


    );
};

