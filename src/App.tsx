import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './views/Main';
import SignUp from './views/auth/guest/index';
import AccommodationList from './views/accommodationlist';


export default function App() {
  return (
    <Routes>
      <Route path='/main' element={<Main />}/>
      <Route path='/accommodationList' element={<AccommodationList />}/>
      <Route path='/sign-up' element={<SignUp onPathChange={() => {}} />} />
    </Routes>

  );
}