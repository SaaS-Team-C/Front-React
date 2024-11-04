import React from 'react';
import './style.css';


export function MyAccommodationManagement() {
  const handleRegisterClick = () => {
    window.location.href = 'http://localhost:3000/mypagehost/accommodations/register';
  };

  return (
  <div>
    <button onClick={handleRegisterClick}>숙소 등록</button>
  </div>
  );
}