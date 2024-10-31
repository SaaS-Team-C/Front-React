import './style.css';

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Topbar from 'src/component/topbar';
import ResponseDto from 'src/apis/signUp/dto/response/response.dto';
import ModalComponent1 from 'src/component/payment/modal1';
import ModalComponent2 from 'src/component/payment/modal2';
import ModalComponent3 from 'src/component/payment/modal3';
import ModalComponent4 from 'src/component/payment/modal4';
import Information from 'src/component/mypage/mypagemain/information';

interface Agreements {
    ruleAgreement: boolean;
    personalInfoAgreement: boolean;
    thirdPartyAgreement: boolean;
    ageVerification: boolean;
}

interface PaymentComponentProps {
    onPathChange: (path: string) => void;
}

// component: 결제 화면 컴포넌트 //
export default function Payment({ onPathChange }: PaymentComponentProps) {
    const location = useLocation();

    // state: 예약 상세 정보 불러오기 상태 //
    const { imageSrc, price, checkInTime, checkOutTime, roomName, roomType, personnelCount } = location.state || {};

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
    const [isTotalAgreed, setIsTotalAgreed] = useState(false);
    const [agreements, setAgreements] = useState<Agreements>({
        ruleAgreement: false,
        personalInfoAgreement: false,
        thirdPartyAgreement: false,
        ageVerification: false
    });

    // state: 약관 동의 모달 오픈/오프 상태 //
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // state: 카카오페이/토스페이 결제 요청 상태 //
    const [amount, setAmount] = useState(0);

    // variable: 결제 가능 여부 //
    const isComplete = name && telNumber && paymentType && isSend;

    // function: 1박당 가격 계산 함수 //
    const calculatePricePerNight = () => {
        if (!checkInTime || !checkOutTime) {
            return 0; // 체크인/체크아웃 시간이 없을 경우 0 반환
        }

        // YYYY-MM-DD 형식으로 Date 객체 생성
        const checkInDate = new Date(checkInTime);
        const checkOutDate = new Date(checkOutTime);
        const differenceInTime = checkOutDate.getTime() - checkInDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 밀리초를 일로 변환

        if (differenceInDays <= 0) {
            return 0; // 잘못된 날짜 범위일 경우 0 반환
        }

        return price / differenceInDays; // 가격을 일 수로 나누기
    };

    // function: 전체 동의 체크박스 상태를 관리하는 함수 //
    const handleTotalAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setIsTotalAgreed(isChecked);
        setAgreements({
            ruleAgreement: isChecked,
            personalInfoAgreement: isChecked,
            thirdPartyAgreement: isChecked,
            ageVerification: isChecked,
        });
    };

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

    //event handler: 개별 체크박스 변경 핸들러 //
    const handleAgreementChange = (key: keyof Agreements) => {
        setAgreements((prev: Agreements) => ({
            ...prev,
            [key]: !prev[key],
        }));
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

    const isAllAgreed = Object.values(agreements).every(Boolean);

    // event handler: 동의 버튼 클릭 이벤트 처리 //
    const onAgreeButtonClickHandler = () => {
        setIsAgreed(prev => !prev); // 이전 상태를 반전시킴
    };

    // event handler: 결제 변경 이벤트 처리 //
    const onChargeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    // event handler: 결제 요청 버튼 클릭 이벤트 처리 // 
    const onChargeClickButtonHandler = (
        pg_method: string,
        price: number,
        nickname: string,
        redirect_url: string
    ) => {
        const { IMP } = window;
        alert(pg_method);
        
        // 가맹점 번호 지정
        IMP.init('imp48124315');
    
        IMP.request_pay(
            {
                pg: pg_method, // 결제 방식 지정
                pay_method: 'card',
                merchant_uid: `mid_${new Date().getTime()}`, // 현재 시간
                name: '결제 품목 및 제목 지정',
                amount: 100, // 실제 충전할 금액
                buyer_email: 'buyer@example.com', // 구매자 이메일
                buyer_name: nickname, // 구매자 이름
                buyer_tel: '010-1222-2222',
                buyer_addr: '서울특별시 강남구 삼성동',
                buyer_postcode: '123-456',
                m_redirect_url: redirect_url || "http://localhost:3000/main" // 결제 완료 후 리다이렉션할 주소
            },
            function (rsp: { success: boolean; error_msg?: string }) { // callback
                if (rsp.success) { // 결제가 성공적으로 이루어졌다면
                    alert("결제되었습니다.");
                } else {
                    alert(`결제 실패되었습니다.: ${rsp.error_msg || '알 수 없는 오류'}`);
                }
            }
        );
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
                    <div className='payment-image'>
                        <div className='payImage'>
                            {imageSrc && <img src={imageSrc} alt="Room" />}
                        </div>
                    </div>
                    <div className='left-box'>
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
                </div>
                <div className='page-right'>
                    <div className='right-top'>
                        <div className='right-top-wrap'>
                            <div className='right-top-title'>상세정보</div>
                            <div className='right-top-container1'>
                                <div className='accommodationName'>숙소</div>
                                <div className='accommodation-input'>
                                    {roomName ? <div>{roomName}</div> : <div>숙소정보가 없습니다.</div>}
                                </div>
                            </div>
                            <div className='right-top-container2'>
                                <div className='roomType'>객실</div>
                                <div className='roomType-input'>
                                    {roomType ? <div>{roomType}</div> : <div>객실정보가 없습니다.</div>}
                                </div>
                            </div>

                            <div className='right-top-container3'>
                                <div className='checkInOut'>일정</div>
                                <div className='checkinInOut-input'>
                                    {checkInTime ? <div>체크인: {checkInTime} ~</div> : <div>체크인 정보가 없습니다.</div>}
                                    {checkOutTime ? <div>체크아웃: {checkOutTime}</div> : <div>체크아웃 정보가 없습니다.</div>}
                                </div>
                            </div>
                            <div className='right-top-container4'>
                                <div className='personnel'>인원</div>
                                <div className='personnel-input'>
                                    {personnelCount ? <div>{personnelCount}명</div> : <div>인원 정보가 없습니다.</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-bottom'>
                        <div className='right-bottom-title'>결제정보</div>
                        <div className='right-bottom-container1'>
                            <div className='room-price1'>객실 가격(1박)</div>
                            <div className='room-price-input1'>{calculatePricePerNight()}원</div>
                        </div>
                        <div className='right-bottom-container2'>
                            <div className='room-price2'>총 결제 금액</div>
                            {price && <div>{price}원</div>}
                        </div>
                        <div className='right-bottom-container3'>
                            <div className='total-agree-wrap'>
                                <div className='total-label'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                        checked={isAllAgreed}
                                        onChange={handleTotalAgreeChange}
                                    />
                                    <div className='total-agree'>약관 전체동의</div>
                                </div>
                            </div>

                            <div className='agree-wrap-container'>
                                <div className='agree-wrap1'>
                                    <input
                                        className='toggle-button'
                                        type='checkbox'
                                        checked={agreements.ruleAgreement}
                                        onChange={() => handleAgreementChange('ruleAgreement')}
                                    />
                                    <div className='list-agree1'>숙소 이용규칙 및 취소/환불규정 동의(필수)</div>
                                    <div className="list-agree-button" onClick={openModal}>
                                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><path d="M11 14.667 15.986 10 11 5.333 12.424 4l4.986 4.667c.787.736.787 1.93 0 2.666L12.424 16z"></path></svg></div>
                                    <ModalComponent1 isOpen={isModalOpen} closeModal={closeModal} />
                                </div>
                            </div>

                            <div className='agree-wrap2'>
                                <input
                                    className='toggle-button'
                                    type='checkbox'
                                    checked={agreements.personalInfoAgreement}
                                    onChange={() => handleAgreementChange('personalInfoAgreement')}
                                />
                                <div className='list-agree2'>개인정보 수집 및 이용 동의(필수)</div>
                                <div className="list-agree-button" onClick={openModal}>
                                    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><path d="M11 14.667 15.986 10 11 5.333 12.424 4l4.986 4.667c.787.736.787 1.93 0 2.666L12.424 16z"></path></svg></div>
                                <ModalComponent2 isOpen={isModalOpen} closeModal={closeModal} />
                            </div>

                            <div className='agree-wrap3'>
                                <input
                                    className='toggle-button'
                                    type='checkbox'
                                    checked={agreements.thirdPartyAgreement}
                                    onChange={() => handleAgreementChange('thirdPartyAgreement')}
                                />
                                <div className='list-agree3'>개인정보 제3자 제공 동의(필수)</div>
                                <div className="list-agree-button" onClick={openModal}>
                                    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><path d="M11 14.667 15.986 10 11 5.333 12.424 4l4.986 4.667c.787.736.787 1.93 0 2.666L12.424 16z"></path></svg></div>
                                <ModalComponent3 isOpen={isModalOpen} closeModal={closeModal} />
                            </div>

                            <div className='agree-wrap4'>
                                <input
                                    className='toggle-button'
                                    type='checkbox'
                                    checked={agreements.ageVerification}
                                    onChange={() => handleAgreementChange('ageVerification')}
                                />
                                <div className='list-agree4'>만 14세 이상 확인 (필수)</div>
                                <div className="list-agree-button" onClick={openModal}>
                                    <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><path d="M11 14.667 15.986 10 11 5.333 12.424 4l4.986 4.667c.787.736.787 1.93 0 2.666L12.424 16z"></path></svg></div>
                                <ModalComponent4 isOpen={isModalOpen} closeModal={closeModal} />
                            </div>
                        </div>
                    </div>
                    <div className='right-bottom-button' onClick={() => onChargeClickButtonHandler('kakaopay', price, '사용자 닉네임', '리다이렉트 URL')}>{isAllAgreed && price && <div>{price}원 결제하기</div>}</div>
                </div>
            </div>
        </div>
    );
};