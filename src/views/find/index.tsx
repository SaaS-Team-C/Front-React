import Topbar from 'src/component/topbar';
import './style.css';
import { useState } from 'react';
import ResponseDto from 'src/apis/signUp/dto/response/response.dto';
import FindComponent from 'src/component/find/find-modal';

type CurrentView = 'host-find-id' | 'guest-find-id' | 'host-find-password' | 'guest-find-password';

interface FindComponentProps {
    onPathChange: (path: string) => void;
}

// component : Guest Id찾기 컴포넌트  //
export default function FindId({ onPathChange }: FindComponentProps) {

    // state: 현재 화면 상태 관리
    const [currentView, setCurrentView] = useState<CurrentView>('guest-find-id');

    // state: 정보 입력상태 //
    const [guestName, setGuestName] = useState('');
    const [hostName, setHostName] = useState('');
    const [telNumber, setTelNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [guestId, setGuestId] = useState<string | null>(null);
    const [hostId, setHostId] = useState<string | null>(null);

    // state: 입력값 검증 상태 //
    const [isSend, setSend] = useState<boolean>(false);
    const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

    // state: 입력 메세지 상태 //
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');

    // state: 정보 메세지 에러 상태 //
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    
    // state: guest 모달 오픈/오프 상태 //
    const [isGuestModalOpen, setGuestModalOpen] = useState(false);
    const GuestopenModal = () => setGuestModalOpen(true);
    const GuestcloseModal = () => setGuestModalOpen(false);

    // state: host 모달 오픈/오프 상태 //
    const [isHostModalOpen, setHostModalOpen] = useState(false);
    const HostopenModal = () => setHostModalOpen(true);
    const HostcloseModal = () => setHostModalOpen(false);

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

    // event handler: 상단 게스트 버튼 클릭 이벤트 처리
    const onGuestButtonClickHandler = () => {
        setCurrentView('guest-find-id'); // 게스트 화면으로 변경
    };

    // event handler: 상단 호스트 버튼 클릭 이벤트 처리
    const onHostButtonClickHandler = () => {
        setCurrentView('host-find-id'); // 호스트 화면으로 변경
    };

    // event handler: 상단 게스트 버튼 클릭 이벤트 처리
    const onGuestPasswordFindButtonClickHandler = () => {
        setCurrentView('guest-find-password'); // 게스트 화면으로 변경
    };

    // event handler: 상단 호스트 버튼 클릭 이벤트 처리
    const onHostPasswordFindClickHandler = () => {
        setCurrentView('host-find-password'); // 호스트 화면으로 변경
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

    //event handler: Guest 아이디 찾기 버튼 클릭 핸들러 //
    const onGuestFindIdButtonClickHandler = async () => {
        try {
            const response = await fetch('/api/guest-find-id', {
                method: 'POST',
                body: JSON.stringify({ guestName, telNumber, verificationCode }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (data.success) {
                setGuestId(data.guestId);  // 찾은 아이디 설정
                setGuestModalOpen(true);  // 아이디를 찾았을 때만 모달 열기
            } else {
                alert('정보가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('아이디 찾기 실패:', error);
            alert('존재하지 않는 유저 정보입니다.');
            setGuestModalOpen(false);

        }
    };

    //event handler: host 아이디 찾기 버튼 클릭 핸들러 //
    const onHostFindIdButtonClickHandler = async () => {
        try {
            const response = await fetch('/api/host-find-id', {
                method: 'POST',
                body: JSON.stringify({ hostName, telNumber, verificationCode }),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (data.success) {
                setHostId(data.hostId);  // 찾은 아이디 표시
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

    // render: guest 아이디 찾기 화면 렌더링 //
    if (currentView === 'guest-find-id') {
        return (
            <div id='findId-wrapper'>
                <Topbar />
                <div className="findId">
                    <div className="findId-wrapper">
                        <div className='findId-body'>
                            <div className='findId-title'>아이디 찾기</div>
                            <div className='guest-login-button1'>
                                <a className='GuestLogin-button-guest1'>Guest</a>
                                <a className='GuestLogin-button-host1' onClick={onHostButtonClickHandler}>Host</a>
                            </div>

                        </div>
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
                        <button className="findId-button" onClick={onGuestFindIdButtonClickHandler}>
                            아이디 찾기
                        </button>
                        <div className="modal-guest">
                            {/* <FindComponent isOpenFind={isGuestModalOpen} closeModalFind={GuestcloseModal} /> */}
                        </div>
                        <div className='mainPage-movig' onClick={onMainPageGoClickHandler}>
                            메인페이지에서 로그인하기
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // render: guest 아이디 찾기 화면 렌더링 //
    if (currentView === 'host-find-id') {
        return (
            <div id='findId-wrapper'>
                <Topbar />
                <div className="findId">
                    <div className="findId-wrapper">
                        <div className='findId-body'>
                            <div className='findId-title'>아이디 찾기</div>
                            <div className='host-login-button2'>
                                <a className='HostLogin-button-guest2' onClick={onGuestButtonClickHandler}>Guest</a>
                                <a className="HostLogin-button-host2">Host</a>
                            </div>
                        </div>


                        <div className="nameBox">
                            <div className="nameBox-title">이름</div>
                            <input
                                className="nameBox-input"
                                type="text"
                                placeholder="이름을 입력하세요."
                                value={hostName}
                                onChange={(e) => setHostName(e.target.value)}
                            />
                        </div>
                        <div className="telNumberBox">
                            <div className="telNumberBox-title">휴대전화</div>
                            <div className="telNumberBox-input" >
                                <input
                                    value={telNumber}
                                    type="text"
                                    placeholder="휴대전화 번호를 입력하세요."
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
                        <button className="findId-button" onClick={onHostFindIdButtonClickHandler}>
                            아이디 찾기
                        </button>
                        {isHostModalOpen && (
                            <div className="modal">
                                <div className="modal-content">
                                    <button className="close-button" onClick={HostcloseModal}>X</button>
                                    <div>찾은 아이디는 {hostId}입니다.</div>
                                    <div className='mainPage-movig' onClick={onMainPageGoClickHandler}>메인페이지에서 로그인하기</div>
                                </div>
                            </div>
                        )}
                        <div className='mainPage-movig' onClick={onMainPageGoClickHandler}>
                            메인페이지에서 로그인하기
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    // render: guest 비밀번호 찾기 화면 렌더링 //
    if (currentView === 'guest-find-password') {
        return (
            <div id=''></div>
        )
    }

}