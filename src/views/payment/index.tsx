import InputBox3 from 'src/component/payment';
import './style.css';

import React, { ChangeEvent, useState } from 'react'

import Topbar from 'src/component/topbar';
import ResponseDto from 'src/apis/signUp/dto/response/response.dto';

interface PaymentComponentProps {
    onPathChange: (path: string) => void;
}

// component: 결제 화면 컴포넌트 //
export default function Payment({ onPathChange }: PaymentComponentProps) {

    // state: 예약자 입력 정보 상태 //
    const [name, setName] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');
    const [paymentType, setPaymentType] = useState<string>('');

    // state: 최종 입력 상태 확인 //
    const [isAgreed, setIsAgreed] = useState(false);

    // state: 입력 메세지 상태 //
    const [nameMessage, setNameMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [paymentTypeMessage, setPaymentTypeMessage] = useState<string>('');

    // state: 입력값 검증 상태 //
    const [isSend, setSend] = useState<boolean>(false);

    // state: 정보 메세지 에러 상태 //
    const [nameMessageError, setNameMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    const [paymentTypeMessageError, setPaymentTypeMessageError] = useState<boolean>(false);


    // variable: 결제 가능 여부 //
    const isComplete = name && telNumber && paymentType && isSend;

    // function: 전화번호 인증 Response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {

        const message =

            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '숫자 11자 입력해주세요.' :
                    responseBody.code === 'TF' ? '서버에 문제가 있습니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : ''

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setTelNumberMessage(message);
        setTelNumberMessageError(!isSuccessed);
        setSend(isSuccessed);
    };

    // event handler: 이름 변경 이벤트 처리 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setName(value);
    };

    // event handler: 전화번호 변경 이벤트 처리 //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTelNumber(value);
        setSend(false);

        // 전화번호가 11자리인지 확인하는 조건문
        if (value.length !== 11) {
            setTelNumberMessage('숫자 11자를 입력 해주세요');
        } else {
            setTelNumberMessage('');
        }
    };

    // event handler: 동의 버튼 클릭 이벤트 처리 //
    const onAgreeButtonClickHandler = () => {
        setIsAgreed(prev => !prev); // 이전 상태를 반전시킴
    };

    // render: 결제 화면 컴포넌트 렌더링 //
    return (

        <div id='payment-wrapper'>
            <Topbar />
            <div id='payment-top-wrapper'>
                <div className='headerBar'>
                    <svg
                        onClick={() => window.history.back()} // 이전 페이지로 돌아가기
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="#333333"
                        viewBox="0 0 20 20"
                        style={{ cursor: 'pointer', marginTop: '1px' , marginRight: '5px' }} // 마우스 커서를 포인터로 변경
                    >
                        <path fill="#333" d="M12.414 3.586L11 2l-7 7 7 7 1.414-1.414L6.828 10H17V8H6.828l5.586-5.414z"></path>
                    </svg>
                    <div className='text'>예약 확인 및 결제</div>
                </div>
            </div>

            <div id='payment-bottom-wrapper'>
                <div className='page-left'>
                    <div className='left-top'>
                        <div className='left-top-title'>예약자 정보</div>
                        <div className="payment-input-container3">
                            <InputBox3
                                messageError={nameMessageError}
                                message={nameMessage}
                                value={name}
                                label="이름"
                                type="text"
                                placeholder="예약자 이름을 입력해주세요."
                                onChange={onNameChangeHandler}
                            />
                            <InputBox3
                                messageError={telNumberMessageError}
                                message={telNumberMessage}
                                value={telNumber}
                                label="전화번호"
                                type="text"
                                placeholder="예약자 전화번호를 입력해주세요."
                                onChange={onTelNumberChangeHandler}
                            />


                            <div className='check-container1'>
                                <div className='check-container2'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                        checked={isAgreed} // 체크박스의 상태를 isAgreed로 연결
                                        onChange={onAgreeButtonClickHandler} // 체크박스의 상태가 변경될 때 핸들러 호출
                                    />
                                    <div className='check-message'>예약자와 투숙객이 다릅니다.</div>
                                </div>
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='left-bottom'>
                            <div className='left-bottom-title'>결제 수단</div>
                            <div className='payment-typeList'>
                                <div className='kakaopay'></div>
                                <div className='tossPay'></div>
                                <div className='naverPay'></div>
                                <div className='creditCard'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='page-right'>
                    <div className='right-top'></div>
                    <div className='right-bottom'></div>
                </div>
            </div>
        </div>


    );
}