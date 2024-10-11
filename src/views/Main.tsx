import { useNavigate } from 'react-router';
import './style.css';
import { useRef, useState } from 'react';



// component: 메인페이지 화면 컴포턴트 //
export default function Main() {
    
    // state: 모달창 상태 //
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 로그인 버튼 클릭 이벤트 처리 //
    const onsigninButtonClickHandler = () => {
        
        
    };

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


    return (
        <div id="main-wrapper">
            <div className="wrapper-head">
                <div className='logo'>
                    <div className='logo-icon'></div>
                    <div className='logo-name'>Roomly</div>
                </div>
                <div className='sign'>
                    <div className='sign-in' onClick={() => setModalOpen(true)}>로그인</div>
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
                        <input className='id-input' type="text" placeholder='  아이디를 입력해 주세요.'/>
                        </div>
                        <div className='input-log'>
                        <div className='log-in-pw-icon'></div>
                        <input className='pw-input' type="text" placeholder='  비밀번호를 입력해 주세요.'/>
                        </div>
                        <div className='log-in-button'>로그인</div>
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
                    <div className='sign-up-button' onClick={onSignupButtonClickHandler}>회원가입</div>
                </div>
            </div>
            <div className='main-top'>
                <div className='main-image'></div>
                <div className='main-search-bar'>
                    <div className='destination'>
                        <div className='word'>지역</div>
                        <input className='search' />
                    </div>
                    <div className='check-in'>
                        <div className='word'>입실 날짜</div>
                        <input className='search' type='date' placeholder='입실 날짜를 입력하세요' />
                    </div>
                    <div className='check-out'>
                        <div className='word'>퇴실 날짜</div>
                        <input className='search' type='date' placeholder='퇴실 날짜를 입력하세요' />
                    </div>
                    <div className='people'>
                        <div className='word'>인원</div>
                        <input className='search' />
                    </div>
                    <button className='search-button' />
                </div>
            </div>
        </div>
    )

}