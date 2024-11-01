import Topbar from 'src/component/topbar';
import './style.css';
import { useState } from 'react';
import ResponseDto from 'src/apis/signUp/dto/response/response.dto';

interface FindComponentProps {
    onPathChange: (경로: string) => void;
}

export default function FindId({ onPathChange }: FindComponentProps) {

    // state: 정보 입력상태 //
    const [guestName, setGuestName] = useState('');
    const [telNumber, setTelNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [guestId, setGuestId] = useState<string | null>(null);

    // state: 입력값 검증 상태 //
    const [isSend, setSend] = useState<boolean>(false);
    const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

    // state: 입력 메세지 상태 //
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');

    // state: 정보 메세지 에러 상태 //
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    
    // function: 전화번호 인증 Response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {

        const message =

            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '숫자 11자 입력해주세요.' :
                    responseBody.code === 'DT' ? '중복된 전화번호 입니다.' :
                        responseBody.code === 'TF' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                                responseBody.code === 'SU' ? '인증번호가 전송되었습니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setTelNumberMessage(message);
        setTelNumberMessageError(!isSuccessed);
        setSend(isSuccessed);
    };

    // function: 전화번호 인증 확인 Response 처리 함수 //
    const telAuthCheckResponse = (responseBody: ResponseDto | null) => {
        const message =
            !responseBody ? '서버에 문제가 있습니다.' :
                responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
                    responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
                        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
                            responseBody.code === 'SU' ? '인증번호가 확인되었습니다.' : ''

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setAuthNumberMessage(message);
        setAuthNumberMessageError(!isSuccessed);
        setCheckedAuthNumber(isSuccessed);
    };

    // event handler: 인증번호 전송 버튼 클릭 핸들러
    const handleSendVerificationCode = async () => {
        try {
            const response = await fetch('/api/send-verification', {
                method: 'POST',
                body: JSON.stringify({ telNumber }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            telAuthResponse(data); // 인증번호 전송 결과 처리
        } catch (error) {
            console.error('인증번호 전송 실패:', error);
            alert('인증번호 전송에 실패했습니다.');
        }
    };

    //event handler: 아이디 찾기 버튼 클릭 핸들러 //
    const onFindIdButtonClickHandler = async () => {
        try {
            const response = await fetch('/api/find-id', {
                method: 'POST',
                body: JSON.stringify({ guestName, telNumber, verificationCode }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (data.success) {
                setGuestId(data.guestId);  // 찾은 아이디 표시
            } else {
                alert('정보가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('아이디 찾기 실패:', error);
            alert('존재하지 않는 유저 정보입니다.');
        }
    };

    // event handler: 메인페이지 이동 버튼(회원가입 버튼 하단) 클릭 이벤트 처리
    const onMainPageGoClickHandler = () => {
        window.location.href = '/main'; // 이동할 페이지 경로 설정
    };

      // render: 아이디 찾기 화면 렌더링 //
    return (
        <div id='findId-wrapper'>
            <Topbar />
            <div className="findId">
                <div className="findId-wrapper">
                    <div className='findId-title'>아이디 찾기</div>
                    <div className="nameBox">
                        <div className="nameBox-title">이름</div>
                        <input
                            className="nameBox-input"
                            type="text"
                            placeholder="이름을 입력하세요"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                        />
                    </div>
                    <div className="telNumberBox">
                        <div className="telNumberBox-title">휴대전화</div>
                        <div className="telNumberBox-input" >
                            <input
                                value={telNumber}
                                type="text"
                                placeholder="휴대전화 번호를 입력하세요"
                                onChange={(e) => setTelNumber(e.target.value)}
                            />
                            <button className="telNumberBox-button" onClick={handleSendVerificationCode}>
                                인증번호 전송
                            </button>
                        </div>
                        {telNumberMessage && (
                            <div className={`message ${telNumberMessageError ? 'error' : 'success'}`}>
                                {telNumberMessage}
                            </div>
                        )}
                        <input
                            className="authNumber-input"
                            type="text"
                            placeholder="인증번호를 입력하세요."
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        {authNumberMessage && (
                            <div className={`message ${authNumberMessageError ? 'error' : 'success'}`}>
                                {authNumberMessage}
                            </div>
                        )}
                    </div>
                    <button className="findId-button" onClick={onFindIdButtonClickHandler}>
                        아이디 찾기
                    </button>
                    {guestId && <div className="foundUserId">찾은 아이디는 {guestId}입니다.</div>}
                    <div className='mainPage-movig' onClick={onMainPageGoClickHandler}>
                        메인페이지에서 로그인하기
                    </div>
                </div>
            </div>
        </div>
    );
}