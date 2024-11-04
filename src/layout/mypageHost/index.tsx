import React from 'react';
import { Route, Routes, useNavigate, useLocation, To } from 'react-router-dom';
import './style.css';
import Topbar from 'src/component/topbar';
import MypageCatalogButton from 'src/component/mypage/mypagecatalogbutton';
import { MyInfoManagement } from 'src/component/mypagehost/ReservationStatus';
import { ReservationStatus } from 'src/component/mypagehost/myinfo';
import { MyAccommodationManagement } from 'src/component/mypagehost/MyAccommodationManagement';
import HostAccommodationRegister from 'src/component/mypagehost/MyAccommodationManagement/registration';

export default function HostMypageLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 URL 경로에 맞춰 활성화된 탭을 설정
  const currentPath = location.pathname;

  // 네비게이션 버튼 클릭 핸들러
  const onClickButtonHandler = (path: To) => {
    navigate(path);  // path로 이동
  };

  return (
    <>
      <Topbar />

      <div id="mypage-wrapper">
        <div className="guestMypage-side-bar">
          <MypageCatalogButton
            text="내정보관리"
            activite={currentPath === "/mypagehost"}
            onClick={() => onClickButtonHandler("/mypagehost")}
          />
          <MypageCatalogButton
            text="예약현황"
            activite={currentPath === "/mypagehost/books"}
            onClick={() => onClickButtonHandler("/mypagehost/books")}
          />
  
          <MypageCatalogButton
            text="내 숙소정보 관리"
            activite={currentPath === "/mypagehost/accommodations" || currentPath === "/mypagehost/accommodations/register"}
            onClick={() => onClickButtonHandler("/mypagehost/accommodations")}
          />
        </div>
      </div>
    </>
  );
}
