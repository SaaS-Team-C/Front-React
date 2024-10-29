import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';

interface Props {
    title: string;
    type: 'text' | 'password';
    value: string;
    placeholder: string;
    buttonName?: string;

 
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
}

export default function MypageInputBox({
    title,
    type, 
    value, 
    placeholder, 
    buttonName,
    onButtonClick,
    onChange
}: Props) {

    return (
        <div id='mypageinformation-input-warpper'>
        <div className='mypageinformation-input-box'>
            <div className='mypageinformation-input-title'>{title}</div>
            <input className='mypageinformation-input-inputbox' type={type} value={value} placeholder={placeholder} onChange={onChange} />

        </div>
        {buttonName && <button onClick={onButtonClick} >{buttonName}</button>}
        </div>


    )

}