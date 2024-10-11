import { ResponseDto } from 'src/apis/dto/response';
import './style.css';
import { ChangeEvent, useState } from "react";
import InputBox from 'src/component/input/logup';
// import { useNavigate } from 'react-router';


// type AuthPath = '회원가입' | '로그인';

// // interface SnsContainerProps {
// //     type: AuthPath;
// // }

// // // component: SNS 로그인 회원가입 컴포넌트 //
// // function SnsContainer({ type }: SnsContainerProps) {
// // // component: SNS 로그인 회원가입 컴포넌트 //
// // function SnsContainer({ type }: SnsContainerProps) {

// // event handler: SNS 버튼 클릭 이벤트 처리 //
// const onSnsButtonClickHandler = (sns: 'kakao' | 'google') => {
//     window.location.href = `http://localhost:3000/api/v1/auth/sns-sign-in/${sns}`;
// };

// // render: SNS 로그인 회원가입 컴포넌트 렌더링 //
// return (
//     <div className="sns-container">
//         <div className="title">SNS {type}</div>
//         <div className="sns-button-container">
//             <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}kakao`} onClick={() => onSnsButtonClickHandler('kakao')}></div>
//             <div className={`sns-button ${type === '회원가입' ? 'md ' : ''}naver`} onClick={() => onSnsButtonClickHandler('google')}></div>
//         </div>
//     </div>
// );


interface AuthComponentProps {
    onPathChange: (path: null) => void;
} // null -> authPath 달아야함 


// component: 회원가입 화면 컴포넌트 //
export default function SignUp({ onPathChange }: AuthComponentProps) {

    // state: Query Parameter 상태 //
    // const [queryParam] = useSearchParams();
    // const snsId = queryParam.get('snsId');
    // const joinPath = queryParam.get('joinPath');

    // state: Host 입력 정보 상태 //
    const [guestName, setGuestName] = useState<string>('');
    const [guestId, setGuestId] = useState<string>('');
    const [guestPassword, setGuestPassword] = useState<string>('');
    const [guestPasswordCheck, setGuestPasswordCheck] = useState<string>('');
    const [guestTelNumber, setGuestTelNumber] = useState<string>('');
    const [guestAuthNumber, setGuestAuthNumber] = useState<string>('');

    // state: 입력값 검증 상태 //
    const [isCheckedId, setCheckedId] = useState<boolean>(false);
    const [isMatchedPassword, setMatchedPassword] = useState<boolean>(false);
    const [isCheckedPassword, setCheckedPassword] = useState<boolean>(false);
    const [isSend, setSend] = useState<boolean>(false);
    const [isCheckedAuthNumber, setCheckedAuthNumber] = useState<boolean>(false);

    // state: Host 입력 메세지 상태 //
    const [nameMessage, setNameMessage] = useState<string>('');
    const [idMessage, setIdMessage] = useState<string>('');
    const [passwordMessage, setPasswordMessage] = useState<string>('');
    const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
    const [telNumberMessage, setTelNumberMessage] = useState<string>('');
    const [authNumberMessage, setAuthNumberMessage] = useState<string>('');

    // // state: Host 정보 메세지 에러 상태 //
    const [nameMessageError, setNameMessageError] = useState<boolean>(false);
    const [idMessageError, setIdMessageError] = useState<boolean>(false);
    const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
    const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
    const [telNumberMessageError, setTelNumberMessageError] = useState<boolean>(false);
    const [authNumberMessageError, setAuthNumberMessageError] = useState<boolean>(false);


    // variable: SNS 회원가입 여부 //
    // const isSnsSignUp = snsId !== null && joinPath !== null;

    // variable: 회원가입 가능 여부 //
    const isComplete = guestName && guestId && isCheckedId && guestPassword && guestPasswordCheck && isMatchedPassword && isCheckedPassword
        && guestTelNumber && isSend && guestAuthNumber && isCheckedAuthNumber;

    // function: 아이디 중복확인 Response 처리 함수 //
    const idCheckResponse = (responseBody: ResponseDto | null) => {

    };

    // function: 전화번호 인증 Response 처리 함수 //
    const telAuthResponse = (responseBody: ResponseDto | null) => {

    };

    // function: 전화번호 인증 확인 Response 처리 함수 //
    const telAuthCheckResponse = (responseBody: ResponseDto | null) => {

    };

    // event handler: 이름 변경 이벤트 처리 //
    const onNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

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

    // event handler: 회원가입 버튼 클릭 이벤트 처리 //
    const onSignUpButtonHandler = () => {

    };


    // render: 회원가입 화면 컴포넌트 렌더링 //
    return (

            <div className='input-box-signup'>
                <div className='title'>Sign up</div>
                <div className="input-container">
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
                        buttonName="중복 확인"
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
                        buttonName="인증 확인"
                        onChange={onAuthNumberChangeHandler}
                        onButtonClick={onAuthNumberCheckClickHandler}
                    />
                </div>
                <div className="button-container">
                    <div>회원가입</div>
                    {/* <div className="link" onClick={() => onPathChange()}>로그인</div> */}
                </div>
            </div>

    );

}

