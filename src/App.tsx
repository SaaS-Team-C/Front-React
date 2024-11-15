import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Main from './views/main/Main';


import Payment from './views/payment';

import { ACCESS_TOKEN, ACCOMMODATION_LIST_DETAIL_PATH, ACCOMMODATION_LIST_PATH, AUTH_PATH, FINDID_PATH, getSignInRequest, MAIN_PATH } from './constants';

import { RegionImages } from './resources/images/region';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import SignUp from './views/auth';
import DetailList from './component/accomodation/detaillist';

import FAQ from './views/faq';
import HostAccommodationRegister from './component/mypagehost/MyAccommodationManagement/registration';

import AccomodationEnrollApprovalPage from './views/admin/hostenrollmentapproval';
import MypageInputBox from './component/input/mypageinput';
import BookingList from './component/mypage/bookinglist';

import HostEnrollmentapproval from './views/admin/hostenrollmentapproval/index';
import FindId from './views/find';
import HostMypageLayout from './layout/mypageHost';
import { MyInfoManagement } from './component/mypagehost/ReservationStatus';
import { ReservationStatus } from './component/mypagehost/myinfo';

import GuestMypage from './views/mypageguest';
import Accommodationenrollmentapproval from './views/admin/accommodationenrollmentapproval';
import AccommodationList from './views/accommodation';
import Roomly from './views/roomly';

import MyAccommodationManagementView from './views/mypagehost/MyAccommodationManagement';
import ShowDetailList from './component/mypagehost/MyAccommodationManagement/showaccdetail/detaillist';
import {SignInUser} from './stores';
import { ResponseDto } from './apis/signUp/dto/response';
import GetSignInResponseDto from './apis/login/dto/response/get-guest-sign-in.response.dto';
import GetGuestSignInResponseDto from './apis/login/dto/response/get-guest-sign-in.response.dto';
import List from './component/accomodation/list';




// component: root path 컴포넌트 //
function Index() {
  const navigator = useNavigate();

  useEffect(() => {
    navigator('/main');
  }, []);

  return (
    <></>
  );
}

// component: booking path 컴포넌트 //
function Booking() {
  // state: 로그인 쿠키 상태 // 
  const [cookies] = useCookies();
  const navigator = useNavigate();

  // effect: 예약하기 클릭 시 마운트 될 상태 //
  useEffect(() => {
    if (cookies.accessToken) navigator('/booking');
    else navigator('/main');
  }, []);

  return (
    <></>
  )

}

export default function App() {
  
  // 로그인 유저 정보 상태 //
  const {signInUser, setSignInUser} = SignInUser();

  // state : cookie 상태 //
  const [cookies, setCookie, removeCookie] = useCookies();

  // function : 네비게이터 함수 //
  const navigator = useNavigate();
  

  const getSignInResponse = (responseBody: GetGuestSignInResponseDto | ResponseDto | null) => {
  const message = 
  !responseBody ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' :
  responseBody.code === 'NI' ? '로그인 유저 정보가 존재하지 않습니다.' :
  responseBody.code === 'AF' ? '잘못된 접근입니다.' :
  responseBody.code === 'DBE' ? '로그인 유저 정보를 불러오는데 문제가 발생했습니다.' : '';
  
  const isSuccessde = responseBody !== null && responseBody.code === 'SU';
  
  // if (!isSuccessde) {
  //   alert(message)
  //   removeCookie(ACCESS_TOKEN, { path: ROOT_PATH })
  //   setSignInUser(null);
  //   navigator(AUTH_ABSOLUTE_PATH)
  //   return;
  // }

  const {guestId, guestName, guestTelNumber} = responseBody as GetGuestSignInResponseDto
  setSignInUser({guestId, guestName, guestTelNumber});
}

useEffect(() => {
  const accessToken = cookies[ACCESS_TOKEN];
  if (accessToken) getSignInRequest(accessToken).then(getSignInResponse)
  else setSignInUser(null);
}, [cookies[ACCESS_TOKEN]])

  // onPathChange 함수 정의
  const handlePathChange = () => {
    console.log('Path changed!');
  };
  
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={MAIN_PATH} element={<Main />} />
      <Route path='mypage' element={<GuestMypage />} />

      <Route path={ACCOMMODATION_LIST_PATH} element={<AccommodationList />} />
      <Route path={ACCOMMODATION_LIST_DETAIL_PATH} element={<DetailList />} />
      <Route path={AUTH_PATH} element={<SignUp />} />
      <Route path='/payment' element={<Payment onPathChange={() => { } }/>} />
      <Route path={FINDID_PATH} element={<FindId />} />
      <Route path='/roomly-company' element={<Roomly />} />
      <Route path='/adminHost' element={<HostEnrollmentapproval/>}/>
      <Route path='/adminAccommodation' element={<Accommodationenrollmentapproval/>}/>
      <Route path='/faq' element={<FAQ/>}/>


      <Route path="/mypagehost" element={<HostMypageLayout />}>
        <Route index element={<MyInfoManagement />} />
      </Route>

      <Route path="/mypagehost/books" element={<HostMypageLayout />}>
        <Route index element={<ReservationStatus />} />
      </Route>
      // ! 자식 요소로 경로 넣으면 화면이 안뜸. 왜 그런지 아시는 분???
      {/* <Route path="/mypagehost/accommodations" element={<HostMypageLayout />}> */}
            {/* <Route index element={<MyAccommodationManagement/>} />
            <Route path="register" element={<HostAccommodationRegister />} /> */}
      {/* </Route> */}


      <Route path='/mypagehost/accommodations' element={<MyAccommodationManagementView/>}/>    
      <Route path='/mypagehost/accommodations/register' element={<HostAccommodationRegister/>}/>
      <Route path='/mypagehost/accommodations/edit' element={<HostAccommodationRegister/>}/>
      <Route path='/mypagehost/accommodations/showDetailList' element={<ShowDetailList/>}/>


      <Route path='*' element={<Index />} />
      <Route path='/test' element= {<BookingList />}/>
    </Routes>

  );
}