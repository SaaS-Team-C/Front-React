import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Main from './views/Main';


import Payment from './views/payment';

import AccommodationList from './views/accommodation/accommodationlist';
import { ACCOMMODATION_LIST_DETAIL_PATH, ACCOMMODATION_LIST_PATH, MAIN_PATH } from './constants';

import { RegionImages } from './resources/images/Region';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Detail from './component/accomodation/detail';

import DetailList from './component/accomodation/detaillist';
import Admin from './views/admin';
import FAQ from './views/faq';

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

      <Route path={ACCOMMODATION_LIST_PATH} element={<AccommodationList />} />
      <Route path={ACCOMMODATION_LIST_DETAIL_PATH} element={<DetailList />} />
      <Route path="/accommodationList/detail/:name" element={<Detail />} />
      {/* <Route path='/sign-up' element={<SignUp onPathChange={() => {}} />} /> */}
      <Route path='/payment' element={<Payment onPathChange={() => {}} />} />
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/faq' element={<FAQ/>}/>





      <Route path='*' element={<Index />} />
    </Routes>

  );
}