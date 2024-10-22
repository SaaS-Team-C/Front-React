import { ResponseDto } from 'src/apis/dto/response';
import './guest-style.css';
import './host-style.css';
import { ChangeEvent, useEffect, useState } from "react";
import InputBox from 'src/component/input/logup/guest';
import InputBox2 from 'src/component/input/logup/host';
import { useSearchParams } from 'react-router-dom';
import { guestIdCheckRequest, GuestSignUpRequest, hostIdCheckRequest, HostSignUpRequest, telAuthCheckRequest, telAuthRequest } from 'src/apis';
import { GuestIdCheckRequestDto, GuestSignUpRequestDto, HostIdCheckRequestDto, HostSignUpRequestDto, TelAuthCheckRequestDto, TelAuthRequestDto } from 'src/apis/dto/request/auth';


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
  onPathChange: (path: string) => void;
}


// component: 회원가입 화면 컴포넌트 //
export default function SignUp({ onPathChange }: AuthComponentProps) {

  // state: 현재 화면 상태 관리
  const [currentView, setCurrentView] = useState<CurrentView>('guest');

  // state: 최종 입력 상태 확인 //
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  // state: Query Parameter 상태 //
  const [queryParam] = useSearchParams();
  const snsId = queryParam.get('snsId') ?? '';
  const joinPath = queryParam.get('joinPath') ?? '';

  // state: 공통 입력 정보 상태 //
  const [telNumber, setTelNumber] = useState<string>('');
  const [authNumber, setAuthNumber] = useState<string>('');

  // state:  guest 입력 정보 상태 //
  const [guestName, setGuestName] = useState<string>('');
  const [guestId, setGuestId] = useState<string>('');
  const [guestPassword, setGuestPassword] = useState<string>('');
  const [guestPasswordCheck, setGuestPasswordCheck] = useState<string>('');

  // state:  host 입력 정보 상태 // 
  const [hostName, setHostName] = useState<string>('');
  const [hostId, setHostId] = useState<string>('');
  const [hostPassword, setHostPassword] = useState<string>('');
  const [hostPasswordCheck, setHostPasswordCheck] = useState<string>('');
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const [businessImage, setBusinessImage] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [businessStartDay, setBusinessStartDay] = useState<string>('');


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
  const isSnsSignUp = snsId !== null && joinPath !== null;

  // variable: 공통 회원가입 타입 //
  const isCompleteSignUp = (name: string, id: string, password: string, passwordCheck: string) => {
    return name && id && isCheckedId && password && passwordCheck && isMatchedPassword && isCheckedPassword
      && telNumber && isSend && authNumber && isCheckedAuthNumber && isAgreed;
  }


  // variable: guest 회원가입 가능 여부
  const isCompleteGuest = isCompleteSignUp(guestName, guestId, guestPassword, guestPasswordCheck);

  // variable: host 회원가입 가능 여부
  const isCompleteHost = isCompleteSignUp(hostName, hostId, hostPassword, hostPasswordCheck) && businessNumber;

  // function: 아이디 중복확인 Response 처리 함수 //
  const IdCheckResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'DI' ? '이미 사용중인 아이디입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'SU' ? '사용가능한 아이디입니다.' : ''

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    setIdMessage(message);
    setIdMessageError(!isSuccessed); // 성공이 아닐때 에러가 떠야 하니까
    setCheckedId(isSuccessed); // 성공 된 경우
  };

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

  // function : guest 회원가입 Response 처리 함수 //
  const guestSignUpResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
              responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
                responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
  };

  // function : host 회원가입 Response 처리 함수 //
  const hostSignUpResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
              responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
                responseBody.code === 'NB' ? '사업자번호 인증에 실패했습니다.' :
                  responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
  };

  // function : 사업자 번호 전송 Response 처리 함수 //
  const validateResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
          responseBody.code === 'NB' ? '사업자번호 인증에 실패했습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      alert(message);
      return;
    }
  };

  // event handler: 이름 변경 이벤트 처리 //
  const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestName(value);
    setHostName(value);
  };


  // event handler: guest 아이디 중복 확인 버튼 클릭 이벤트 처리 //
  const onGuestIdCheckClickHandler = () => {
    if (!guestId) return; // 중복되지 않은 아이디일 경우 바로 return 시켜준다.

    // 객체 생성
    const requestBody: GuestIdCheckRequestDto = {
      guestId: guestId
    }
    // Promise 타입이기때문에 기다리지 않고 다음 결과가 넘어가기 때문에 then을 사용한다.
    // then은 앞의 결과가 끝나고 바로 then을 수행하게끔 만들어 준다.
    guestIdCheckRequest(requestBody).then(IdCheckResponse);
  };

  // event handler: host 아이디 중복 확인 버튼 클릭 이벤트 처리 //
  const onHostIdCheckClickHandler = () => {
    if (!hostId) return;

    const requestBody: HostIdCheckRequestDto = {
      hostId: hostId
    }

    hostIdCheckRequest(requestBody).then(IdCheckResponse);
  };

  // event handler: 아이디 변경 이벤트 처리 //
  const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestId(value);
    setHostId(value);
    setIdMessage('');
  };

  // event handler: 비밀번호 변경 이벤트 처리 //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestPassword(value);
    setHostPassword(value);

    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isMatched = pattern.test(value);

    const message = (isMatched || !value) ? '' : '영문, 숫자를 혼용하여 8 ~ 13자를 입력해주세요';
    setPasswordMessage(message);
    setPasswordMessageError(!isMatched);
    setMatchedPassword(isMatched);
  };

  // event handler: 비밀번호 변경 확인 이벤트 처리 //
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGuestPasswordCheck(value);
    setHostPasswordCheck(value);
  };

  // event handler: 사업자등록번호 변경 이벤트 처리 // 
  const onBusinessNumberCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target; // 입력된 값을 가져옴
    setBusinessNumber(value); // 상태 업데이트

    if (!value) {
      // 입력이 없을 경우 초기화
      setBusinessNumberCheckMessage('');
      setBusinessNumberCheckMessageError(false);
      return;
    }

    const pattern = /^[0-9]{10}$/;
    const isMatched = pattern.test(value);

    if (!isMatched) {
      setBusinessNumberCheckMessage('숫자 10자를 입력 해주세요');
      setBusinessNumberCheckMessageError(true);
    } else {
      // 10자 숫자 형식이 맞으면 에러 메시지 초기화
      setBusinessNumberCheckMessage('');
      setBusinessNumberCheckMessageError(false);
    }
  };

  // event handler: 전화번호 인증 버튼 클릭 이벤트 처리 //
  const onTelNumberSendClickHandler = () => {
    if (!telNumber) return;

    const pattern = /^[0-9]{11}$/;
    const isMatched = pattern.test(telNumber);

    if (!isMatched) {
      setTelNumberMessage('숫자 11자를 입력 해주세요');
      setTelNumberMessageError(true);
      return;
    }

    const requestBody: TelAuthRequestDto = {
      telNumber // 속성의 이름과 담을 변수의 이름이 동일한 경우 하나로 작성
    }
    telAuthRequest(requestBody).then(telAuthResponse);
  };

  // event handler: 인증 확인 버튼 클릭 이벤트 처리 //
  const onAuthNumberCheckClickHandler = () => {
    if (!authNumber) return;

    const requestBody: TelAuthCheckRequestDto = {
      telNumber, authNumber
    }
    telAuthCheckRequest(requestBody).then(telAuthCheckResponse);

  };

  // event handler: 개인정보 동의 버튼 클릭 이벤트 처리 //
  const onAgreeButtonClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked);
  };

  // Event handler: guest 회원가입 버튼 클릭 이벤트 처리
  const onGuestSignUpButtonClickHandler = () => {
    if (!isCompleteGuest) return;

    const requestBody: GuestSignUpRequestDto = {
      guestName,
      guestId,
      guestPassword,
      telNumber,
      joinPath
    }
    GuestSignUpRequest(requestBody).then(guestSignUpResponse);
  };

  // Event handler: host 회원가입 버튼 클릭 이벤트 처리
  const onHostSignUpButtonClickHandler = () => {
    if (!isCompleteHost) return;

    const requestBody: HostSignUpRequestDto = {
      hostName,
      hostId,
      hostPassword,
      telNumber,
      businessNumber,
      businessImage,
      businessName,
      businessStartDay
    }
    HostSignUpRequest(requestBody).then(hostSignUpResponse);
  };

  // event handler: 상단 게스트 버튼 클릭 이벤트 처리
  const onGuestButtonClickHandler = () => {
    setCurrentView('guest'); // 게스트 화면으로 변경
  };

  // event handler: 상단 호스트 버튼 클릭 이벤트 처리
  const onHostButtonClickHandler = () => {
    setCurrentView('host'); // 호스트 화면으로 변경
  };

  // event handler: 메인페이지 이동 버튼(회원가입 버튼 하단) 클릭 이벤트 처리
  const onMainPageGoClickHandler = () => {
    window.location.href = '/main'; // 이동할 페이지 경로 설정
  };

  // event handler: 전화번호 변경 이벤트 처리 //
  const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTelNumber(value);
    setSend(false);
    setTelNumberMessage('');
  };

  // event handler: 인증번호 변경 이벤트 처리 //
  const onAuthNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAuthNumber(value);
    setCheckedAuthNumber(false);
    setAuthNumberMessage('');
  };

  // effect : 비밀번호 및 비밀번호 확인 변경시 실행할 함수 //
  useEffect(() => {
    if (!guestPassword || !guestPasswordCheck) {
      setPasswordCheckMessage(''); // 초기화
      setPasswordCheckMessageError(false);
      setCheckedPassword(false);
      return;
    }

    const isEqual = guestPassword === guestPasswordCheck;
    const message = isEqual ? '' : '비밀번호가 일치하지 않습니다.'

    setPasswordCheckMessage(message);
    setPasswordCheckMessageError(!isEqual);
    setCheckedPassword(isEqual);
  }, [guestPassword, guestPasswordCheck]);

  useEffect(() => {
    if (!hostPassword || !hostPasswordCheck) {
      setPasswordCheckMessage(''); // 초기화
      setPasswordCheckMessageError(false);
      setCheckedPassword(false);
      return;
    }

    const isEqual = hostPassword === hostPasswordCheck;
    const message = isEqual ? '' : '비밀번호가 일치하지 않습니다.'

    setPasswordCheckMessage(message);
    setPasswordCheckMessageError(!isEqual);
    setCheckedPassword(isEqual);
  }, [hostPassword, hostPasswordCheck]);


  // render: 게스트 회원가입 화면 컴포넌트 렌더링 //
  if (currentView === 'guest') {
    return (
      <div id='guest-signUp-wrapper'>
        <div style={{ paddingTop: '50px' }}>
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
                  onChange={onNameChangeHandler}
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
                  onButtonClick={onGuestIdCheckClickHandler}
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
                  value={telNumber}
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
                  value={authNumber}
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
                <input
                  className='guest-agreeButton'
                  type='checkbox'
                  checked={isAgreed} // 체크박스의 상태를 isAgreed로 연결
                  onChange={onAgreeButtonClickHandler} // 체크박스의 상태가 변경될 때 핸들러 호출
                />
                <div className='guest-agreeMessage'>개인정보 수집 및 이용약관에 동의합니다.</div>
              </div>
              < div className={`guest-button-clear ${isCompleteGuest ? 'primary' : 'disable'}`}
                onClick={isCompleteGuest ? onGuestSignUpButtonClickHandler : undefined}>회원가입</div>
              <div className='guest-alreay-signIn'>
                <div className='guest-alreay'>이미 Roomly 회원이신가요?</div>
                <div className='guest-mainPageGo' onClick={onMainPageGoClickHandler}>메인페이지에서 로그인하기</div>
              </div>
              <SnsContainer type="회원가입" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // render: 호스트 회원가입 화면 컴포넌트 렌더링 //
  if (currentView === 'host') {
    return (
      <div id='host-signUp-wrapper'>
        <div style={{ paddingTop: '50px' }}>
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
                  value={hostName}
                  label="이름"
                  type="text"
                  placeholder="이름을 입력해주세요."
                  onChange={onNameChangeHandler}
                />
                <InputBox2
                  messageError={idMessageError}
                  message={idMessage}
                  value={hostId}
                  label="아이디"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  buttonName="중복확인"
                  onChange={onIdChangeHandler}
                  onButtonClick={onHostIdCheckClickHandler}
                />
                <InputBox2
                  messageError={passwordMessageError}
                  message={passwordMessage}
                  value={hostPassword}
                  label="비밀번호"
                  type="password"
                  placeholder="비밀번호"
                  onChange={onPasswordChangeHandler}
                />
                <InputBox2
                  messageError={passwordCheckMessageError}
                  message={passwordCheckMessage}
                  value={hostPasswordCheck}
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
                  value={telNumber}
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
                  value={authNumber}
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
                <input
                  className='host-agreeButton'
                  type='checkbox'
                  checked={isAgreed} // 체크박스의 상태를 isAgreed로 연결
                  onChange={onAgreeButtonClickHandler} // 체크박스의 상태가 변경될 때 핸들러 호출
                />
                <div className='host-agreeMessage'>개인정보 수집 및 이용약관에 동의합니다.</div>
              </div>
              <div
                className={`host-button-clear ${isCompleteHost ? 'primary' : 'disable'}`}
                onClick={isCompleteHost ? onHostSignUpButtonClickHandler : undefined}
              >
                회원가입
              </div>
              <div className='host-alreay-signIn'>
                <div className='host-alreay'>이미 Roomly 회원이신가요?</div>
                <div className='host-mainPageGo' onClick={onMainPageGoClickHandler}>메인페이지에서 로그인하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
