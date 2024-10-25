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
                        style={{ cursor: 'pointer', marginTop: '1px', marginRight: '5px' }} // 마우스 커서를 포인터로 변경
                    >
                        <path fill="#333" d="M12.414 3.586L11 2l-7 7 7 7 1.414-1.414L6.828 10H17V8H6.828l5.586-5.414z"></path>
                    </svg>
                    <div className='text'>예약 확인 및 결제</div>
                </div>
            </div>
            <div id='payment-bottom-wrapper'>
                <div className='page-left'>
                    <div className='choice-room-image'>
                        <image />
                    </div>

                    <div className='left-top'>
                        <div className='left-top-title'>예약자 정보</div>
                        <div className="payment-input-container3">
                            <div className='guest-name'>
                                <div className='name-title'>이름</div>
                                <div className='name-value'></div>
                            </div>
                            <div className='guest-telNumber'>
                                <div className='telNumber-title'>전화번호</div>
                                <div className='telNumber-value'></div>
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='left-bottom'>
                        <div className='left-bottom-title'>결제 수단</div>
                        <div className='payment-typeList'>
                            <div className='kakaoPay'>
                                <img className='kakaoPay-image' src="https://image.goodchoice.kr/images/mweb/reservation/payment/kakao.png" />
                            </div>
                            <div className='tossPay'>
                                <img className='tossPay-image' src="https://image.goodchoice.kr/images/mweb/reservation/payment/tosspay.png" />
                            </div>
                            <div className='naverPay'>
                                <img className="naverPay-image" src="https://image.goodchoice.kr/images/mweb/reservation/payment/npay2.png" />
                            </div>
                            <div className='creditCard'>신용/체크카드</div>
                        </div>
                    </div>
                </div>
                <div className='page-right'>
                    <div className='right-top'>
                        <div className='right-top-wrap'>
                            <div className='right-top-title'></div>
                            <div className='right-top-container1'>
                                <div className='roomType'>객실</div>
                                <div className='roomType-input'></div>
                            </div>
                            <div className='right-top-container2'>
                                <div className='checkIn&Out'>일정</div>
                                <div className='checkin&Out-input'></div>
                            </div>
                        </div>
                    </div>
                    <div className='right-bottom'>
                        <div className='right-bottom-title'>결제정보</div>
                        <div className='right-bottom-container1'>
                            <div className='room-price1'>객실 가격(1박)</div>
                            <div className='room-price-input1'>원</div>
                        </div>
                        <div className='right-bottom-container2'>
                            <div className='room-price2'>총 결제 금액</div>
                            <div className='room-price-input2'>원</div>
                        </div>
                        <div className='right-bottom-container3'>
                            <div className='total-agree-wrap'>
                                <div className='total-label'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                    />
                                    <div className='total-agree'>약관 전체동의</div>
                                </div>
                                <div className='total-agree-button'>&gt;</div>
                            </div>

                            <div className='agree-wrap-container'>

                                <div className='agree-wrap1'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                    />

                                    <div className='list-agree1'>숙소 이용규칙 및 취소/환불규정 동의(필수)</div>
                                    <div className='list-agree-button'>&gt;</div>
                                </div>

                                <div className='agree-wrap2'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                    />

                                    <div className='list-agree2'>개인정보 수집 및 이용 동의(필수)</div>
                                    <div className='list-agree-button'>&gt;</div>
                                </div>

                                <div className='agree-wrap3'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                    />
                                    <div className='list-agree3'>개인정보 제3자 제공 동의(필수)</div>
                                    <div className='list-agree-button'>&gt;</div>
                                </div>

                                <div className='agree-wrap4'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                    />

                                    <div className='list-agree4'>만 14세 이상 확인 (필수)</div>
                                    <div className='list-agree-button'>&gt;</div>
                                </div>

                            </div>


                        </div>
                        <div className='right-bottom-button'>원 결제하기</div>
                    </div>
                </div>
            </div>
        </div >


    );
}