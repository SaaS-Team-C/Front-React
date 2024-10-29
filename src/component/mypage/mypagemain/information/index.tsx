import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import InputBox from 'src/component/input/login';
import MypageInputBox from 'src/component/input/mypageinput';

interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function Information({ titletext, username, activite }: Props) {


    const [idmessage, setIdMessage] = useState<string>('');
    const [pwmessage, setPwMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);


    const onChange = (event: ChangeEvent) => {

    }
    useEffect(() => {
        setPwMessage('');
    }, [idmessage]);

    return (

        <>
            {activite && <div id='information-warpper'>
                <div className='information-title'>
                    <div className='information-title-text'>{titletext}</div>
                    <div className='information-title-box'>
                        <div className='information-title-ditail-username'>'{username}'</div>
                        <div className='information-title-ditail'>님 반갑습니다.</div>
                    </div>
                </div>
                <div className='information-main'>
                    <div className='information-title'>나의 정보</div>
                    <MypageInputBox title='아이디' type='text' value='value' placeholder='아이디를 입력해 주세요' onChange={onChange} />                    
                    <MypageInputBox title='이름' type='text' value='value' placeholder='아이디를 입력해 주세요' onChange={onChange} />                    
                    <MypageInputBox title='비밀번호' type='password' value='value' placeholder='비밀번호를 입력해 주세요.' onChange={onChange} />                    
                    <MypageInputBox title='비밀번호 확인' type='password' value='value' placeholder='한번더 비밀번호를 입력해 주세요.' onChange={onChange} />                    
                    <MypageInputBox title='전화번호' type='text' value='value' placeholder='-를 빼고 입력해 주세요.' onChange={onChange} buttonName='변경' />                    
                </div>
            </div>}
        </>
    )
}
