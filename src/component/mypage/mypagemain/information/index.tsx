import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import MypageInputBox from 'src/component/input/mypageinput';

interface Props {
    titletext: string;
    username: string;
    activite: boolean;
}

export default function Information({ titletext, username, activite }: Props) {


    const [idmessage, setIdMessage] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);


    // event handler: 비밀번호 변경 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPassword(value);
    }

    // event handler: 비밀번호 확인 변경 이벤트 처리 //
    const onCheckPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setCheckPassword(value);
    }


    useEffect(() => {
        if (!password || !checkPassword) return;

        const equal = password === checkPassword;
        
        ;
    }, [password, checkPassword]);

    return (

        <>
            {activite && <div id='information-warpper'>
                <div className='information-title'>
                    <div className='information-title-text'>{titletext}</div>
                    <div className='information-title-box'>
                        <div className='info rmation-title-ditail-username'>'{username}'</div>
                        <div className='information-title-ditail'>님 반갑습니다.</div>
                    </div>
                </div>
                <div className='information-main'>
                    <div className='information-title'>나의 정보</div>
                    <MypageInputBox title='아이디' type='text' value={idmessage} placeholder='아이디를 입력해 주세요' />                    
                    <MypageInputBox title='이름' type='text' value='value' placeholder='아이디를 입력해 주세요'  />                    
                    <MypageInputBox title='비밀번호' type='password' value={password} placeholder='비밀번호를 입력해 주세요.' onChange={onPasswordChangeHandler} />                    
                    <MypageInputBox title='비밀번호 확인' type='password' value={checkPassword} placeholder='한번더 비밀번호를 입력해 주세요.' onChange={onCheckPasswordChangeHandler} />                    
                    <MypageInputBox title='전화번호' type='text' value='value' placeholder='-를 빼고 입력해 주세요.' buttonName='변경' />                    
                </div>
            </div>}
        </>
    )
}