import React, { ChangeEvent } from 'react';
import './style.css';

interface Props {
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    message: string;
    messageError: boolean;

    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({ 
    type, 
    placeholder, 
    value, 
    message,
    messageError,
    onChange
}: Props) {

    return (
        <div className="input-box">
            <div className="input-area">
                <input value={value} type={type} placeholder={placeholder} onChange={onChange} />
            </div>
            <div className={`message ${messageError ? 'error' : 'primary'}`}>{message}</div>
        </div>
    )

}