import React, { useState } from 'react';
import './style.css';
import Topbar from 'src/component/topbar';
import MypageCatalogButton from 'src/component/mypage/mypagecatalogbutton';
import { MyInfoManagement } from 'src/component/mypagehost/ReservationStatus';
import { ReservationStatus } from 'src/component/mypagehost/myinfo';
import { MyAccommodationManagement } from 'src/component/mypagehost/MyAccommodationManagement';


export default function HostMypageLayout() {
  const datail1 = '내정보관리';
  const datail2 = '예약현황';
  const datail3 = '내 숙소정보 관리';

  const [click, setClick] = useState<string>(datail1);
  const userName = "이소진"; 

  // 네비게이션 버튼 클릭 핸들러
  const onClickButtonHandler = (distinction: string) => {
    setClick(distinction);
    
  };

  return (
    <>
      <Topbar />

          {/* 상단 환영 문구 */}
          <div id="welcome-message"> 호스트 '{userName}'님, 반갑습니다.</div>
            <div id="mypage-wrapper">
              <div className="guestMypage-side-bar">
                <MypageCatalogButton text={datail1} activite={click === datail1} onClick={() => onClickButtonHandler(datail1)} />
                <MypageCatalogButton text={datail2} activite={click === datail2} onClick={() => onClickButtonHandler(datail2)} />
                <MypageCatalogButton text={datail3} activite={click === datail3} onClick={() => onClickButtonHandler(datail3)} />
              </div>

              <div className="guestMypage-main">
                {click === datail1 && <MyInfoManagement />}
                {click === datail2 && <ReservationStatus />}
                {click === datail3 && <MyAccommodationManagement />}
              </div>
            </div>
    </>
  );
}
