import { ChangeEvent, useRef, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router';
import InputBox from '../input/login';

// component: 메인페이지 화면 컴포턴트 //
export default function Topbar() {

    // state: 모달창 상태 //
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    // state: 로그인 입력 정보 상태 //
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // state: 메세지 출력 정보 상태 //
    const [message, setMessage] =useState<string>('');

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // function: 로그인 Response처리 함수 //
    const signInResponse = (responseBody : null) => {
    const message = '서버에 문제가 있습니다.';
        // !responseBody ? '서버에 문제가 있습니다.'  : 
        // responseBody.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
        // responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' : 
        // responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
        // responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
    
    // const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    // if (!isSuccessed) {
    //     setMessage(message);
        return;
    }

    // event handler: 아이디 변경 이벤트 처리 //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setId(value);
    }

    // event handler: 비밀번호 변경 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPassword(value);
    }

    // event handler: 로그인 버튼 클릭 이벤트 처리 //
    function onsigninButtonClickHandler() {
        if (!id || !password) return;

    }

    // event handler: 회원가입 버튼 클릭 이벤트 처리 //
    const onSignupButtonClickHandler = () => {
        navigator('/sign-up');
    };

    // event handler: 아이디 찾기 버튼 클릭 이벤트 처리 //
    const onFindIdButtonClickHandler = () => {
        navigator('/find-id')
    }

    // event handler: 비밀번호 찾기 버튼 클릭 이벤트 처리 //
    const onFindPasswordButtonClickHandler = () => {
        navigator('/find-pw')
    }

    const onIconClickHandler = () => {
        navigator('/main')   
    }

    return (
    <>
        <div id="wrapper-head">
        <div className='top-bar'>
        <div className='logo'>
            <div className='logo-icon' onClick={onIconClickHandler}></div>
            <div className='logo-name' onClick={onIconClickHandler}>Roomly</div>
        </div>
        <div className='sign'>
            <div className='sign-in' onClick={() => setModalOpen(true)}>로그인</div>
            
            <div className='sign-up-button' onClick={onSignupButtonClickHandler}>회원가입</div>
        </div>
        </div>
    </div>
    {modalOpen && 
            <div className='modal-container' onClick={e => {
                if (e.target === modalBackground.current) {
                    setModalOpen(false);
                }
            }}>
            <div className={'modal-content'}>
                <div className='log-in'>
                    <div className='log-in-word'>Log In</div>
                    <div className='log-in-close' onClick={() => setModalOpen(false)}></div>
                </div>
                <div className='input-log'>
                <div className='log-in-id-icon'></div>
                <InputBox type='text' placeholder='아이디를 입력해 주세요.' value={id} message='' messageError onChange={onIdChangeHandler}/>
                </div>
                <div className='input-log'>
                <div className='log-in-pw-icon'></div>
                <InputBox type='password' placeholder='비밀번호를 입력해 주세요.' value={password} message='' messageError onChange={onPasswordChangeHandler}/>
                </div>
                <div className='log-in-button' onClick={onsigninButtonClickHandler}>로그인</div>
                <div className='find'>
                    <div className='find-id' onClick={onFindIdButtonClickHandler}>아이디 찾기</div>
                    <div className='find-pw' onClick={onFindPasswordButtonClickHandler}>비밀번호 찾기</div>
                </div>
                <div className='sign-up' >
                    <div className='sign-up-text'>계정이 없으신가요?</div>
                    <div className='sign-up-text-button' onClick={onSignupButtonClickHandler}>회원가입</div>
                </div>
            </div>
            </div>
            }
    </>
    )

}