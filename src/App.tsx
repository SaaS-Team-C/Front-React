import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Main from './views/main/Main';


import Payment from './views/payment';

import AccommodationList from './views/accommodation/accommodationlist';
import { ACCOMMODATION_LIST_DETAIL_PATH, ACCOMMODATION_LIST_PATH, MAIN_PATH } from './constants';

import { RegionImages } from './resources/images/region';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';


import DetailList from './component/accomodation/detaillist';

import FAQ from './views/faq';
import HostAccommodationRegister from './component/mypagehost/MyAccommodationManagement/registration';

import GuestMypage from './views/mypage/guest';

import Accommodationenrollmentapproval from './views/admin/accommodationenrollmentapproval';
import HostEnrollmentapproval from './views/admin/hostenrollmentapproval/index';
import SignUp from './views/auth';
import MypageHost from './views/mypagehost';
import FindId from './views/find';





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
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path={MAIN_PATH} element={<Main />} />
      <Route path='mypage' element={<GuestMypage />} />

      <Route path={ACCOMMODATION_LIST_PATH} element={<AccommodationList />} />
      <Route path={ACCOMMODATION_LIST_DETAIL_PATH} element={<DetailList />} />
      <Route path='/sign-up' element={<SignUp onPathChange={() => {}} />} />
      <Route path='/payment' element={<Payment onPathChange={() => {}} />} />
      <Route path='/find' element={<FindId onPathChange={() => {}} />} />
      <Route path='/admin' element={<Accommodationenrollmentapproval/>}/>
      {/* <Route path='/adminHost' element={<AccomodationEnrollApprovalPage/>}/> */}
      <Route path='/faq' element={<FAQ/>}/>
      <Route path='/mypagehost'element={<HostAccommodationRegister/>}/>
      <Route path='/mypagehost/enroll' element={<HostAccommodationRegister/>}/>


      <Route path='*' element={<Index />} />
    </Routes>

  );
}