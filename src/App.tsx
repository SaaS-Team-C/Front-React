import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Main from './views/Main';

// import SignUp from './views/auth/guest/index';
import SignUp from './views/auth';

import AccommodationList from './views/accommodationlist';
import { ACCOMMODATION_LIST_DETAIL_PATH, ACCOMMODATION_LIST_PATH, MAIN_PATH } from './constants';
import AccommodationListDetail from './views/accommodationlist/accommodationlistedetail';
import { regionImages } from './resources/images/region';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

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
      <Route path={MAIN_PATH}  element={<Main />} />
      <Route path={ACCOMMODATION_LIST_PATH} element={<Main />} />

      {/* <Route path={ACCOMMODATION_LIST_PATH} element={<AccommodationList />}>
        <Route path='detail' element={<AccommodationListDetail />} /> */}
      {/* </Route> */}
      {/* 숙소데이터 등록 되면 아래 경로로 사용 예정 */}
      {/* <Route path=':accommodationName' element={<AccommodationListDetail />} /> */}


      {/* <Route path='/sign-up' element={<SignUp onPathChange={() => { }} />} /> */}
      <Route path='*' element={<Index />} />
    </Routes>

  );
}