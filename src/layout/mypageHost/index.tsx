import React, { useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './style.css';
import Topbar from 'src/component/topbar';
import MypageCatalogButton from 'src/component/mypage/mypagecatalogbutton';
import { MyInfoManagement } from 'src/component/mypagehost/ReservationStatus';
import { ReservationStatus } from 'src/component/mypagehost/myinfo';
import { MyAccommodationManagement } from 'src/component/mypagehost/MyAccommodationManagement';


export default function HostMypageLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  // 현재 URL 경로에 맞춰 활성화된 탭을 설정
  const currentPath = location.pathname;

  // 네비게이션 버튼 클릭 핸들러
  const onClickButtonHandler = (path: string) => {
    navigate(path);  // path로 이동
  };

  const datail1 = '내정보관리';
  const datail2 = '예약현황';
  const datail3 = '내 숙소정보 관리';


  return (
    <>
    
      <Topbar />


            <div id="mypage-wrapper">
              <div className="guestMypage-side-bar">
                <MypageCatalogButton text={datail1} activite={currentPath === "/mypagehost"} onClick={() => onClickButtonHandler("/mypagehost")} />
                <MypageCatalogButton text={datail2} activite={currentPath === "/mypagehost/books"} onClick={() => onClickButtonHandler("/mypagehost/books")} />
                <MypageCatalogButton text={datail3} activite={currentPath === "/mypagehost/accommodations"} onClick={() => onClickButtonHandler("/mypagehost/accommodations")}
          />
              </div>

              <div className="guestMypage-main">
               <Routes>
                <Route path="/mypagehost" element={<MyInfoManagement />} />
                <Route path="/mypagehost/books" element={<ReservationStatus />} />
                <Route path="/mypagehost/accommodations" element={<MyAccommodationManagement />} />
              </Routes> 
              </div>
            </div>
    </>
  );
}
