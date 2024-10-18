import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './views/Main';

// import SignUp from './views/auth/guest/index';
import SignUp from './views/auth';

import AccommodationList from './views/accommodationlist';
import { ACCOMMODATION_LIST_DETAIL_PATH, ACCOMMODATION_LIST_PATH } from './constants';
import AccommodationListDetail from './views/accommodationlist/accommodationlistedetail';


export default function App() {
  return (
    <Routes>
      <Route path='/main' element={<Main />} />


      <Route path={ACCOMMODATION_LIST_PATH} element={<AccommodationList />} />
      <Route path={ACCOMMODATION_LIST_DETAIL_PATH(':accommodationName')} element={<AccommodationListDetail />} />

      <Route path='/sign-up' element={<SignUp onPathChange={() => { }} />} />
    </Routes>

  );
}