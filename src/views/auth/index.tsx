import { ResponseDto } from 'src/apis/dto/response';
import './guest-style.css';
import './host-style.css';
import { ChangeEvent, useState } from "react";
import InputBox from 'src/component/input/logup/guest';
import InputBox2 from 'src/component/input/logup/host';


type AuthPath = '회원가입' | '로그인';
type CurrentView = 'host' | 'guest';

interface SnsContainnerProps {
    type: AuthPath;
}

// component : SNS 로그인 회원가입  컴포넌트  //
function SnsContainer({ type }: SnsContainnerProps) {

    // event handler: SNS 버튼 클릭 이벤트 처리 //
    const onSnsButtonClickHandler = (sns: 'kakao' | 'google') => {
        window.location.href = ``;
    };

    // render : SNS 로그인 회원가입 컴포넌트 렌더링 //
    return (
        <div className="sns-container">
            <div className="snsMessage">SNS계정으로 {type}</div>
            <div className="sns-button-container">
                <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}kakao`} onClick={() => onSnsButtonClickHandler('kakao')}></div>
                <div className={`sns-button ${type === '회원가입' ? 'md ' : ''} google`} onClick={() => onSnsButtonClickHandler('google')}></div>
            </div>
        </div>
    )
}

interface AuthComponentProps {
    onPathChange: (path: null) => void;
} // null -> authPath 달아야함 


// component: 회원가입 화면 컴포넌트 //
export default function SignUp({ onPathChange }: AuthComponentProps) {

    // state: 현재 화면 상태 관리
    const [currentView, setCurrentView] = useState<CurrentView>('guest');

    // state: Query Parameter 상태 //
    // const [queryParam] = useSearchParams();
    // const snsId = queryParam.get('snsId');
    // const joinPath = queryParam.get('joinPath');

    // state:  guest 입력 정보 상태 //
    const [guestName, setGuestName] = useState<string>('');
    const [guestId, setGuestId] = useState<string>('');
    const [guestPassword, setGuestPassword] = useState<string>('');
    const [guestPasswordCheck, setGuestPasswordCheck] = useState<string>('');
    const [guestTelNumber, setGuestTelNumber] = useState<string>('');
    const [guestAuthNumber, setGuestAuthNumber] = useState<string>('');

    // state:  host 입력 정보 상태 // 
    const [hostName, setHostName] = useState<string>('');
    const [hostId, setHostId] = useState<string>('');
    const [hostPassword, setHostPassword] = useState<string>('');
    const [hostPasswordCheck, setHostPasswordCheck] = useState<string>('');
    const [hostTelNumber, setHostTelNumber] = useState<string>('');
    const [hostAuthNumber, setHostAuthNumber] = useState<string>('');
    const [businessNumber, setBusinessNumber] = useState<string>('');

    // state: 입력값 검증 상태 //
    const [isCheckedId, setCheckedId] = useState<boolean>(false);
    const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
    const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
    const [isSend, setSend] = useState<boolean>(false);
    const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

    // state: 입력 메세지 상태 //
    const [nameMessage, setNameMessage] = useState<string>('');
    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');
    const [businessNumberCheckMessage, setBusinessNumberCheckMessage] = useState<string>('');

    // state: 정보 메세지 에러 상태 //
    const [nameMessageError, setNameMessageError] = useState<boolean>(false);
    const [idMessageError, setIdMessageError] = useState<boolean>(false);
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);
    const [businessNumberCheckMessageError, setBusinessNumberCheckMessageError] = useState<boolean>(false);


    // variable: SNS 회원가입 여부 //
    // const isSnsSignUp = snsId !== null && joinPath !== null;

    // variable: guest 회원가입 가능 여부 //
    const isCompleteGuest = guestName && guestId && isCheckedId && guestPassword && guestPasswordCheck && isMatchedPassword && isCheckedPassword
        && guestTelNumber && isSend && guestAuthNumber && isCheckedAuthNumber;

        
    // variable: host 회원가입 가능 여부 //
    const isCompleteHost = hostName && hostId && isCheckedId && hostPassword && hostPasswordCheck && isMatchedPassword && isCheckedPassword
    && hostTelNumber && isSend && hostAuthNumber && isCheckedAuthNumber;

    // function: 아이디 중복확인 Response 처리 함수 //
    const idCheckResponse = (responseBody: ResponseDto | null) => {
        const message = ''
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setIdMessage(message);
        setIdMessageError(!isSuccessed); // 성공이 아닐때 에러가 떠야 하니까
        setCheckedId(isSuccessed); // 성공 된 경우
    };

    // function: 전화번호 인증 Response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {

        const message = ''
            const isSuccessed = responseBody !== null && responseBody.code === 'SU'; 
            setTelNumberMessage(message);
            setTelNumberMessageError(!isSuccessed);
            setSend(isSuccessed);
    };

    // function: 전화번호 인증 확인 Response 처리 함수 //
    const telAuthCheckResponse = (responseBody: ResponseDto | null) => {
        const message = ''
            const isSuccessed = responseBody !== null && responseBody.code === 'SU';
            setAuthNumberMessage(message);
            setAuthNumberMessageError(!isSuccessed);
            setCheckedAuthNumber(isSuccessed);
    };

    // function : 회원가입 Response 처리 함수 //
    const signUpResponse = (responseBody: ResponseDto | null) => {
        const message = ''
            const isSuccessed = responseBody !== null && responseBody.code === 'SU';
            if(!isSuccessed){
                alert(message);
                return;
        }
    };

    // event handler: 게스트 이름 변경 이벤트 처리 //
    const onGuestNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setGuestName(value);
};

    // event handler: 호스트 이름 변경 이벤트 처리 //
    const onHostNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setHostName(value);
    };

    // event handler: 아이디 변경 이벤트 처리 //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    };

    // event handler: 비밀번호 변경 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    };

    // event handler: 비밀번호 변경 확인 이벤트 처리 //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    };

    // event handler: 전화번호 변경 이벤트 처리 //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    };

    // event handler: 인증번호 변경 이벤트 처리 //
    const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

    };

    // event handler: 중복 확인 버튼 클릭 이벤트 처리 //
    const onIdCheckClickHandler = () => {

    };

    // event handler: 전화번호 인증 버튼 클릭 이벤트 처리 //
    const onTelNumberSendClickHandler = () => {

    };

    // event handler: 인증 확인 버튼 클릭 이벤트 처리 //
    const onAuthNumberCheckClickHandler = () => {

    };

    // event handler: 회원가입 버튼 클릭 이벤트 처리 

    const onSignUpButtonHandler = () => {

    };

    // event handler: 개인정보 동의 버튼 클릭 이벤트 처리 //
    const onAgreeButtonClickHandler = () => {

    };

    // event handler: 게스트 버튼 클릭 이벤트 처리
    const onGuestButtonClickHandler = () => {
        setCurrentView('guest'); // 게스트 화면으로 변경
    };

    // event handler: 호스트 버튼 클릭 이벤트 처리
    const onHostButtonClickHandler = () => {
        setCurrentView('host'); // 호스트 화면으로 변경
    };

    // event handler: 사업자 등록번호 등록버튼 클릭 이벤트 처리 
    const onBusinessNumberCheckChangeHandler = () => {

    };

    const onMainPageGoClickHandler = () => {
        window.location.href = '/main'; // 이동할 페이지 경로 설정
    };


    // render: 게스트 회원가입 화면 컴포넌트 렌더링  //
    if (currentView === 'guest') {
        return (
            <div id='guest-signUp-wrapper'>
                <>
                    <div style={{ paddingTop: '60px' }}>
                        <div className='guest-login-button'>
                            <a className='GuestLogin-button-guest'>Guest</a>
                            <a className='GuestLogin-button-host' onClick={onHostButtonClickHandler}>Host</a>
                        </div>
                        <div className='guest-input-box-signup'>
                            <div className='guest-inputBox'>
                                <div className='guest-title'>Sign up</div>
                                <div className="guest-input-container3">
                                    <InputBox
                                        messageError={nameMessageError}
                                        message={nameMessage}
                                        value={guestName}
                                        label="이름"
                                        type="text"
                                        placeholder="이름을 입력해주세요."
                                        onChange={onGuestNameChangeHandler}
                                    />
                                    <InputBox
                                        messageError={idMessageError}
                                        message={idMessage}
                                        value={guestId}
                                        label="아이디"
                                        type="text"
                                        placeholder="아이디를 입력해주세요."
                                        buttonName="중복확인"
                                        onChange={onIdChangeHandler}
                                        onButtonClick={onIdCheckClickHandler}
                                    />
                                    <InputBox
                                        messageError={passwordMessageError}
                                        message={passwordMessage}
                                        value={guestPassword}
                                        label="비밀번호"
                                        type="password"
                                        placeholder="비밀번호"
                                        onChange={onPasswordChangeHandler}
                                    />
                                    <InputBox
                                        messageError={passwordCheckMessageError}
                                        message={passwordCheckMessage}
                                        value={guestPasswordCheck}
                                        label="비밀번호 확인"
                                        type="password"
                                        placeholder="비밀번호 확인"
                                        onChange={onPasswordCheckChangeHandler}
                                    />
                                    <InputBox
                                        messageError={telNumberMessageError}
                                        message={telNumberMessage}
                                        value={guestTelNumber}
                                        label="전화번호"
                                        type="text"
                                        placeholder="-빼고 입력해주세요."
                                        buttonName="전화번호 인증"
                                        onChange={onTelNumberChangeHandler}
                                        onButtonClick={onTelNumberSendClickHandler}
                                    />
                                    <InputBox
                                        messageError={authNumberMessageError}
                                        message={authNumberMessage}
                                        value={guestAuthNumber}
                                        label="인증번호"
                                        type="text"
                                        placeholder="인증번호 4자리를 입력해주세요."
                                        buttonName="인증확인"
                                        onChange={onAuthNumberChangeHandler}
                                        onButtonClick={onAuthNumberCheckClickHandler}
                                    />
                                </div>
                            </div>
                            <div className="guest-button-container2">
                                <div className='guest-agree'>
                                    <input className='guest-agreeButton' type='checkBox'></input>
                                    <div className='guest-agreeMessage'>개인정보 수집 및 이용약관에 동의합니다.</div>
                                </div>
                                <div className='guest-button-clear'>회원가입</div>
                                <div className='guest-alreay-signIn'>
                                    <div className='guest-alreay'>이미 Roomly 회원이신가요?</div>
                                    <div className='guest-mainPageGo' onClick={onMainPageGoClickHandler}>메인페이지에서 로그인하기</div>
                                </div>
                                <SnsContainer type="회원가입" />
                            </div>
                        </div>
                    </div>
                </>
            </div>
        );
    }

    // render: 호스트 회원가입 화면 컴포넌트 렌더링 //
    if (currentView === 'host') {
        return (
            <div id='host-signUp-wrapper'>
                <>
                    <div style={{ paddingTop: '60px' }}>
                        <div className='host-login-button'>
                            <a className='HostLogin-button-guest' onClick={onGuestButtonClickHandler}>Guest</a>
                            <a className="HostLogin-button-host">Host</a>
                        </div>
                        <div className='host-input-box-signup'>
                            <div className='host-inputBox'>
                                <div className='host-title'>Sign up</div>
                                <div className="host-input-container3">
                                    <InputBox2
                                        messageError={nameMessageError}
                                        message={nameMessage}
                                        value={guestName}
                                        label="이름"
                                        type="text"
                                        placeholder="이름을 입력해주세요."
                                        onChange={onHostNameChangeHandler}
                                    />
                                    <InputBox2
                                        messageError={idMessageError}
                                        message={idMessage}
                                        value={guestId}
                                        label="아이디"
                                        type="text"
                                        placeholder="아이디를 입력해주세요."
                                        buttonName="중복확인"
                                        onChange={onIdChangeHandler}
                                        onButtonClick={onIdCheckClickHandler}
                                    />
                                    <InputBox2
                                        messageError={passwordMessageError}
                                        message={passwordMessage}
                                        value={guestPassword}
                                        label="비밀번호"
                                        type="password"
                                        placeholder="비밀번호"
                                        onChange={onPasswordChangeHandler}
                                    />
                                    <InputBox2
                                        messageError={passwordCheckMessageError}
                                        message={passwordCheckMessage}
                                        value={guestPasswordCheck}
                                        label="비밀번호 확인"
                                        type="password"
                                        placeholder="비밀번호 확인"
                                        onChange={onPasswordCheckChangeHandler}
                                    />
                                    <InputBox2
                                        messageError={businessNumberCheckMessageError}
                                        message={businessNumberCheckMessage}
                                        value={businessNumber}
                                        label="사업자 등록번호"
                                        type="text"
                                        placeholder="사업자 등록번호 10자리를 입력해주세요."
                                        onChange={onBusinessNumberCheckChangeHandler}
                                    />
                                    <InputBox2
                                        messageError={telNumberMessageError}
                                        message={telNumberMessage}
                                        value={guestTelNumber}
                                        label="전화번호"
                                        type="text"
                                        placeholder="-빼고 입력해주세요."
                                        buttonName="전화번호 인증"
                                        onChange={onTelNumberChangeHandler}
                                        onButtonClick={onTelNumberSendClickHandler}
                                    />
                                    <InputBox2
                                        messageError={authNumberMessageError}
                                        message={authNumberMessage}
                                        value={guestAuthNumber}
                                        label="인증번호"
                                        type="text"
                                        placeholder="인증번호 4자리를 입력해주세요."
                                        buttonName="인증확인"
                                        onChange={onAuthNumberChangeHandler}
                                        onButtonClick={onAuthNumberCheckClickHandler}
                                    />
                                </div>
                            </div>
                            <div className="host-button-container2">
                                <div className='host-agree'>
                                    <input className='host-agreeButton' type='checkBox'></input>
                                    <div className='host-agreeMessage'>개인정보 수집 및 이용약관에 동의합니다.</div>
                                </div>
                                <div className='host-button-clear'>회원가입</div>
                                <div className='host-alreay-signIn'>
                                    <div className='host-alreay'>이미 Roomly 회원이신가요?</div>
                                    <div className='host-mainPageGo' onClick={onMainPageGoClickHandler}>메인페이지에서 로그인하기</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div >

        );
    };
}
