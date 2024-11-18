import { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import MypageInputBox from 'src/component/input/mypageinput';
// import axios from 'axios';
import { SignInHost } from 'src/stores';
import HostPwChangeRequestDto from 'src/apis/login/dto/request/host/hostpwchange.request.dto';
import { ChangeHostPwRequest } from 'src/apis/login';
import { ResponseDto } from 'src/apis/hostmypage';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';

interface Props {
  titletext: string;
  username: string;
  activite: boolean;
}

export default function Information({ titletext, username, activite }: Props) {

  const { signInHost } = SignInHost();

  const [hostName, setHostName] = useState<string>('');
  const [hostId, setHostId] = useState<string>('');
  // const [idmessage, setIdMessage] = useState<string>('qwer1234');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [hostPassword, setHostPassword] = useState<string>('');
  const [hostPasswordCheck, setHostPasswordCheck] = useState<string>('');
  // const [changePasswordbutton, setChangePasswordbutton] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [passwordMessageError, setPasswordMessageError] = useState<boolean>(false);
  const [passwordCheckMessageError, setPasswordCheckMessageError] = useState<boolean>(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] = useState(false);
  const [telNumber, setTelNumber] = useState<string>('010-0000-0000');
  // const [message, setMessage] = useState<string>('');

  const [pwButtonBoolean, setPwButtonBoolean] = useState<boolean>(false);

  const navigator = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();

  const onCurrentPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };

  // const verifyCurrentPasswordHandler = async () => {
  //   try {
  //     const response = await axios.post('/api/verify-password', {
  //       hostId,
  //       hostPassword
  //     });

  //     if (response.status === 200 && response.data.verified) {
  //       setIsCurrentPasswordVerified(true);
  //       alert('현재 비밀번호가 확인되었습니다.');
  //     } else {
  //       alert('현재 비밀번호가 일치하지 않습니다.');
  //       setIsCurrentPasswordVerified(false);
  //     }
  //   } catch (error) {
  //     console.error('비밀번호 확인 오류:', error);
  //     alert('비밀번호 확인 중 문제가 발생했습니다. 다시 시도해주세요.');
  //   }
  // };

  const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setHostPassword(value);

    const pattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,13}$/;
    const isMatched = pattern.test(value);

    if (value.length >= 8) {
      const message = isMatched ? '' : '영문, 숫자를 혼용하여 8 ~ 13자를 입력해주세요';
      setPasswordMessage(message);
      setPasswordMessageError(!isMatched);
    } else {
      setPasswordMessage('');
      setPasswordMessageError(false);
    }
  };

  const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setHostPasswordCheck(value);

    const isHostPasswordMatch = hostPassword && hostPassword === value;

    if (isHostPasswordMatch) {
      setPasswordCheckMessage('');
      setPasswordCheckMessageError(false);
      setIsPasswordMatch(true);
    } else if (value.length > 0) {
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
      setPasswordCheckMessageError(true);
      setIsPasswordMatch(false);
    } else {
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

    ChangeHostPwRequest(hostId, requestBody).then(passwordChangeResponse);
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

  useEffect(() => {
    if (!signInHost) return;
    setHostName(signInHost.hostName)
    setHostId(signInHost.hostId)
  }, [signInHost]);

  useEffect(() => {
    if (currentPassword && hostPassword && hostPasswordCheck) {
      setPwButtonBoolean(true);
    } else {
      setPwButtonBoolean(false);
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
          <MypageInputBox
            activation={true}
            title='현재 비밀번호'
            type='password'
            value={currentPassword}
            placeholder='현재 비밀번호를 입력해 주세요.'
            onChange={onCurrentPasswordChangeHandler}
          />
          <MypageInputBox
            activation={true}
            title='비밀번호'
            type='password'
            value={hostPassword}
            placeholder='비밀번호를 입력해 주세요.'
            messageError={passwordMessageError ? passwordMessage : ''}
            onChange={onPasswordChangeHandler}
          />
          <MypageInputBox
            activation={true}
            title='비밀번호 확인'
            type='password'
            value={hostPasswordCheck}
            placeholder='비밀번호를 다시 입력해 주세요.'
            messageError={passwordCheckMessageError ? passwordCheckMessage : ''}
            onChange={onPasswordCheckChangeHandler}
            buttonName='변경'
            activboolean={pwButtonBoolean}
            onButtonClick={onHostPasswordChangeHandler}
          />
          <MypageInputBox
            activation={false}
            title="전화번호"
            type="text"
            value={telNumber}
            placeholder="-를 빼고 입력해 주세요."
            onChange={handlePhoneNumberChange}
            buttonName="변경" />
        </div>
      </div>}
    </>
  )
}
