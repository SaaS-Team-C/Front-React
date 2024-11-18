import { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import MypageInputBox from 'src/component/input/mypageinput';
import axios from 'axios';
import { SignInHost } from 'src/stores';

import { ChangeHostPwRequest } from 'src/apis/login';
import { ResponseDto } from 'src/apis/hostmypage';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import HostPwChangeRequestDto from 'src/apis/login/dto/request/host/hostpwchange.request.dto';

interface Props {
  titletext: string;
  username: string;
  activite: boolean;
}

export default function MyInfoManagement({ titletext, username, activite }: Props) {

  // 호스트 이름 불러오기
  const { signInHost } = SignInHost();

  const [hostName, setHostName] = useState<string>('');
  const [hostId, setHostId] = useState<string>('');
  const [idmessage, setIdMessage] = useState<string>('qwer1234');
  const [currentPassword, setCurrentPassword] = useState<string>(''); // 현재 비밀번호 추가
  const [hostPassword, setHostPassword] = useState<string>('');
  const [hostPasswordCheck, setHostPasswordCheck] = useState<string>('');
  const [changePasswordbutton, setChangePasswordbutton] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
  const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false); // 현재 비밀번호 검증 상태
  const [telNumber, setTelNumber] = useState<string>('010-0000-0000');
  const [message, setMessage] = useState<string>('');

  // 내가 새로 넣은 변수들 //
  const [pwButtonBoolean, setPwButtonBoolean] = useState<boolean>(false);

  const navigator = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();

  // event handler: 현재 비밀번호 입력 이벤트 핸들러 //
  const onCurrentPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };

  // event handler: 현재 비밀번호 확인 핸들러 //
  const verifyCurrentPasswordHandler = async () => {
    try {
      const response = await axios.post('/api/verify-password', {
        hostId,
        hostPassword
      });

      if (response.status === 200 && response.data.verified) {
        setIsCurrentPasswordVerified(true);
        alert('현재 비밀번호가 확인되었습니다.');
      } else {
        alert('현재 비밀번호가 일치하지 않습니다.');
        setIsCurrentPasswordVerified(false);
      }
    } catch (error) {
      console.error('비밀번호 확인 오류:', error);
      alert('비밀번호 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // event handler: 비밀번호 변경 이벤트 처리 //
  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setHostPassword(value);

    // 비밀번호 패턴 검사
    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isMatched = pattern.test(value);

    // 비밀번호가 8자 이상일 때만 메시지를 설정
    if (value.length >= 8) {
      const message = isMatched ? '' : '영문, 숫자를 혼용하여 8 ~ 13자를 입력해주세요';
      setPasswordMessage(message);
      setPasswordMessageError(!isMatched);
    } else {
      setPasswordMessage(''); // 비밀번호가 8자 미만일 때 메시지 초기화
      setPasswordMessageError(false);
    }

  }

  // event handler: 비밀번호 변경 확인 이벤트 처리 //
  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // Host와 Host의 비밀번호 확인 값을 모두 업데이트
    setHostPasswordCheck(value);

    // 입력된 값이 있는지 확인하고 비밀번호와 일치 여부를 체크
    const isHostPasswordMatch = hostPassword && hostPassword === value;

    if (isHostPasswordMatch) {
      // 비밀번호가 일치할 때
      setPasswordCheckMessage(''); // 메시지 초기화
      setPasswordCheckMessageError(false); // 에러 상태 초기화
      setIsPasswordMatch(true); // 버튼 활성화
    } else if (value.length > 0) {
      // 비밀번호가 일치하지 않을 때
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
      setPasswordCheckMessageError(true);
      setIsPasswordMatch(false);
    } else {
      // 비밀번호 확인 값이 없을 때 메시지 초기화
      setPasswordCheckMessage('');
      setPasswordCheckMessageError(false);
      setIsPasswordMatch(false);
    }
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTelNumber(e.target.value);
  };

  const onHostPasswordChangeHandler = async () => {
    const requestBody: HostPwChangeRequestDto = {
      currentHostPw: currentPassword,
      changeHostPw: hostPassword
    };

    // ChangeHostPwRequest(hostId, requestBody).then(passwordChangeResponse);
  };

  const passwordChangeResponse = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'VF' ? '비밀번호를 모두 입력하세요.' :
          responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' :
            responseBody.code === 'TCF' ? '서버에 문제가 있습니다.' :
              responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

    const isSuccessed = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccessed) {
      return;
    }
    navigator('/main')
    removeCookies('accessToken')
  };

  // 호스트 이름 불러오기
  useEffect(() => {
    if (!signInHost) return;
    setHostName(signInHost.hostName)
    setHostId(signInHost.hostId)
  }, [signInHost]);

  // 비밀번호 변경 버튼 변경 활성화 처리 //
  useEffect(() => {
    if (currentPassword && hostPassword && hostPasswordCheck) {
      setPwButtonBoolean(true)
    } else {
      setPwButtonBoolean(false)
    }
  }, [
    currentPassword,
    hostPassword,
    hostPasswordCheck
  ]);

  return (
    <>
      {activite && <div id='information-warpper'>
        <div className='information-title'>
          <div className='information-title-text'>{titletext}</div>
          <div className='information-title-box'>
            <div className='information-title-ditail-username'>'{hostName}'</div>
            <div className='information-title-ditail'>님 반갑습니다.</div>
          </div>
        </div>
        <div className='information-main'>
          <MypageInputBox activation={false} title='아이디' type='text' value={hostId} placeholder='' />
          <MypageInputBox activation={false} title='이름' type='text' value={hostName} placeholder='' />
          <MypageInputBox activation={false} title='비밀번호' type='text' value={hostPassword} placeholder='' />
          <MypageInputBox activation={false} title='전화번호' type='text' value={telNumber} placeholder='' />
        </div>
      </div>}
    </>
  );
}
