import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './views/Main';
// import SignUp from './views/auth/guest/index';
import AccommodationList from './views/accommodationlist';
import { ACCOMMODATION_LIST_PATH } from './constants';
import SignUp from './views/auth/guest';


export default function App() {
  return (
    <Routes>
      <Route path='/main' element={<Main />}/>
      <Route path={ACCOMMODATION_LIST_PATH} element={<AccommodationList />}/>
      <Route path='/sign-up' element={<SignUp onPathChange={() => {}} />} />
    </Routes>

  );
}