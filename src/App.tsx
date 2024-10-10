import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './views/Main';

export default function App() {
  return (
    <Routes>
      <Route path='/main' element={<Main />}/>
    </Routes>

  );
}
