import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import './style.css';
import { useLocation, useNavigate, useParams } from 'react-router';

// import { LogInResponseDto } from 'src/apis/login/response';
// import { ResponseDto } from 'src/apis/dto/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'src/constants';
import { useSearchParams } from 'react-router-dom';
import { logInRequest } from 'src/apis/login';
import GuestLogInRequestDto from 'src/apis/login/dto/request/guest/login.request.dto';
import LogInResponseDto from 'src/apis/login/dto/response/login.responsw.dto';
import ResponseDto from 'src/apis/login/dto/response/response.dto';
import InputBox from '../input/login';

// 컴포넌트: 메인페이지 화면 컴포넌트 //
export default function Topbar() {
    // 쿠키 상태 초기화
    const [cookies, setCookie, removeCookies] = useCookies(['accessToken']);

    // state: 모달창 상태 //
    const [modalOpen, setModalOpen] = useState(false);

    // state: 로그인 입력 정보 상태 //
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // state: 메세지 출력 정보 상태 //
    const [message, setMessage] = useState<string>('');
    const [idmessage, setIdMessage] = useState<string>('');
    const [pwmessage, setPwMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    // state: url 값 저장 //
    const [searchParams, setSearchParams] = useSearchParams('');
    const [searchBar, setSearchBar] = useState<boolean>(false);
    // function: 네비게이터 함수 //
    const navigator = useNavigate();



    // function: 로그인 응답 처리 함수 //
    const logInResponse = (responseBody: LogInResponseDto | ResponseDto | null) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '아이디와 비밀번호를 모두 입력하세요.' :
            responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' : 
            responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            setPwMessage(message);
            return;
        }
        const { accessToken, expiration } = responseBody as LogInResponseDto;
        const expires = new Date(Date.now() + (expiration * 1000));
        setCookie('accessToken', accessToken, { path: '/', expires });
        setModalOpen(false)

        navigator('/main')

    };

    // event handler: 아이디 변경 이벤트 처리 //
    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setId(value);
    }

    // event handler: 비밀번호 변경 이벤트 처리 //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    }

    /** 
     * function: 로그인 버튼을 클릭 했을 경우 일어나는 이벤트 처리 */   
    const onLoginButtonClickHandler = async () => {
        if (!id) {
            setIdMessage('아이디를 입력해 주세요!');
            setErrorMessage(true);
            return;
        }
        if (!password) {
            setPwMessage('비밀번호를 입력해 주세요!');
            setErrorMessage(true);
            return;
        }
        if (!id || !password) return;
    
            const requestBody: GuestLogInRequestDto = {
                guestId: id,
                guestPw: password
            };
            logInRequest(requestBody).then(logInResponse);
        }
        // effect: 아이디 및 비밀번호 변경시 실행할 함수 //
        useEffect(() => {
            setMessage('');
        }, [id, password]);


    // function: url 값 가져오기 //
    const urlRegion = searchParams.get('Region')
    const urlStart = searchParams.get('start')
    const urlEnd = searchParams.get('end')
    const urlCount = searchParams.get('count')


    // effect: 검색값이 있을 경우 실행할 함수 //
    useEffect(() => {
        // eslint-disable-next-line no-restricted-globals
        if (urlRegion && urlStart && urlEnd && urlCount && (location.pathname !== '/main')) {
            setSearchBar(true);
            return;

        };

        setSearchBar(false);

    }, [searchParams])

    // effect: 아이디 및 비밀번호 변경시 실행할 함수 //
    useEffect(() => {
        setIdMessage('');
    }, [id]);

    // effect: 비밀번호 변경시 실행할 함수 //
    useEffect(() => {
        setPwMessage('');
    }, [password]);

    // effect: 토큰값 있을 경우 실행할 함수 //
    useEffect(() => {
        if (!modalOpen) {
            setModalOpen(false);
        }
    }, [cookies]);

    const pressKeyEnter = (event : KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onLoginButtonClickHandler();
        }
    }

    // event handler: 로그아웃 버튼 클릭 이벤트 처리 //
    const onlogoutButtonClickHandler = () => {
        removeCookies("accessToken");
        navigator('/main')
    };

    // event handler: 회원가입 버튼 클릭 이벤트 처리 //
    const onSignupButtonClickHandler = () => {
        navigator('/sign-up');
    };

    // event handler: 아이디/비밀번호 찾기 버튼 클릭 이벤트 처리 //
    const onFindIdPwButtonClickHandler = () => {
        navigator('/find');
    };

    // event handler: 마이페이지 버튼 클릭 이벤트 처리 //
    const onMyPageClickHandler = () => {
        navigator('/mypage');
    };

    // event handler: 아이콘 및 로고 클릭 이벤트 처리 //
    const onIconClickHandler = () => {
        navigator('/main');
    };

    // event handler: 로그인 버튼 클릭 이벤트 처리 //
    const onContainerClickHandler = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setModalOpen(false);
        }
    };

    const onModalContentClickHandler = (event : React.MouseEvent) => {
        event.stopPropagation()
    };

    const asdasdaszd = (event : React.MouseEvent) => {
        setModalOpen(true)
    };

    const asdasdaszd2 = (event : React.MouseEvent) => {
        setModalOpen(true)
    };

    return (
        <>
            <div id="wrapper-head">
                <div className='top-bar'>
                    <div className='logo'>
                        <div className='logo-icon' onClick={onIconClickHandler}></div>
                        <div className='logo-name' onClick={onIconClickHandler}>Roomly</div>
                    </div>
                    {searchBar && <div className='top-search-bar-container'>
                        <div className='top-search-bar-Region'>{urlRegion}</div>
                        <div className='top-search-bar-solid'></div>
                        <div className='top-search-bar-start'>{urlStart}</div>
                        <div className='top-search-bar-solid'></div>
                        <div className='top-search-bar-end'>{urlEnd}</div>
                        <div className='top-search-bar-solid'></div>
                        <div className='top-search-bar-count'>인원 {urlCount}</div>
                    </div>}
                    {cookies.accessToken && <div className='nowlogin'>
                        <div className='my-page' onClick={onMyPageClickHandler}>MYPAGE</div>
                        <div className='log-out' onClick={onlogoutButtonClickHandler}>LOGOUT</div>
                    </div>}
                    {!cookies.accessToken && <div className='sign'>
                        <div className='sign-in' onClick={() => setModalOpen(true)}>Login</div>
                        <div className='sign-up-button' onClick={onSignupButtonClickHandler}>SignUp</div>
                    </div>}
                </div>
            </div>
            {modalOpen &&
                <div className='modal-container' onMouseDown={onContainerClickHandler}
                
                onMouseUp={asdasdaszd}  >
                    <div
                        className='modal-content'
                        onClick={onModalContentClickHandler}
                    >
                        <div className='log-in'>
                            <div className='log-in-word'>Log In</div>
                            <div className='log-in-close' onClick={() => setModalOpen(false)}></div>
                        </div>
                        <div className='input-log'>
                            <div className='log-in-id-icon'></div>
                            <InputBox
                                type='text'
                                placeholder='아이디를 입력해 주세요.'
                                value={id}
                                message={idmessage}
                                messageError={errorMessage}
                                onChange={onIdChangeHandler}
                                onKey={pressKeyEnter}
                            />
                        </div>
                        <div className='input-log'>
                            <div className='log-in-pw-icon'></div>
                            <InputBox
                                type='password'
                                placeholder='비밀번호를 입력해 주세요.'
                                value={password}
                                message={pwmessage}
                                messageError={errorMessage}
                                onChange={onPasswordChangeHandler}
                                onKey={pressKeyEnter}
                            />
                        </div>
                        <div className='log-in-button' onClick={onLoginButtonClickHandler}>로그인</div>
                        <div className='find'>
                            <div className='find-id' onClick={onFindIdPwButtonClickHandler}>아이디/비밀번호 찾기</div>
                        </div>
                        <div className='sign-up'>
                            <div className='sign-up-text'>계정이 없으신가요?</div>
                            <div className='sign-up-text-button' onClick={onSignupButtonClickHandler}>회원가입</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}