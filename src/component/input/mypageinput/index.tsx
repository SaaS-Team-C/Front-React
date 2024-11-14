import React, { ChangeEvent } from 'react';
import './style.css';

interface Props {
    title: string;
    type: 'text' | 'password';
    value: string;
    placeholder: string;
    activation: boolean;
    buttonName?: string;
    messageError?: string; // Change to string for error messages

    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
}

export default function MypageInputBox({
    title,
    type,
    value,
    placeholder,
    activation,
    buttonName,
    messageError,
    onButtonClick,
    onChange
}: Props) {

    return (
        <div id='mypageinformation-input-warpper'>
            {/* Deactivation Section */}
            {!activation && (
                <div className='mypageinformation-input-box-deactivation'>
                    <div className='mypageinformation-input-title deactivation'>{title}</div>
                    <div className='mypageinformation-input-area-deactivation'>
                        <div className='mypageinformation-input-inputbox-deactivation'>{value}</div>
                        {messageError && <div className='checkMessageError-deactivation'>{messageError}</div>}
                    </div>
                </div>
            )}

            {/* Activation Section */}
            {activation && (
                <div className='mypageinformation-input-box'>
                    <div className='mypageinformation-input-title'>{title}</div>
                    <div className='mypageinformation-input-area'>
                        <input 
                            className='mypageinformation-input-inputbox' 
                            type={type} 
                            value={value} 
                            placeholder={placeholder} 
                            onChange={onChange} 
                        />
                        {messageError && <div className='checkMessageError'>{messageError}</div>}
                        {buttonName && <button className='mypageinformation-telnumber-change-button' onClick={onButtonClick}>{buttonName}</button>}
                    </div>
                </div>
            )}
        </div>
    );
}
