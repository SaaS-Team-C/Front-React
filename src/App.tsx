import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './views/Main';
import AccommodationList from './views/accommodationlist';


export default function App() {
  return (
    <Routes>
      <Route path='/main' element={<Main />}/>
      <Route path='/accommodationList' element={<AccommodationList />}/>

      
    </Routes>

  );
}
