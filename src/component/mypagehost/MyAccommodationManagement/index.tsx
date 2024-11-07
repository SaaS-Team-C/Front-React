import "./style.css";
import { To, useLocation, useNavigate } from "react-router";
import Topbar from "src/component/topbar";
import HostMypageLayout from "src/layout/mypageHost";


// AccommodationManagementPage.tsx
import React, { useState } from 'react';
import './style.css';
import PaginationFuction from "src/component/accomodation/pagination";

type Accommodation = {
  id: string;
  name: string;
  type: string; // e.g., "운영중", "등록 승인 대기중", "삭제 승인 대기중"
  roomType: string;
  guestName: string;
  phoneNumber: string;
  numberOfGuests: number;
  date: string;
  price: number;
};

// Sample accommodations data
const accommodations: Accommodation[] = [
  {
    id: "#DC-0185-79-568787",
    name: "제주산호호텔 서귀포점",
    type: "운영중",
    roomType: "DELUXE | Double Room",
    guestName: "이순신",
    phoneNumber: "010-1212-3434",
    numberOfGuests: 4,
    date: "2024.12.25 (수)",
    price: 280000,
  },
  {
    id: "#DC-0190-88-123456",
    name: "부산해운대호텔",
    type: "등록 승인 대기중",
    roomType: "STANDARD | Single Room",
    guestName: "김유신",
    phoneNumber: "010-1111-2222",
    numberOfGuests: 2,
    date: "2024.12.20 (금)",
    price: 150000,
  },
  {
    id: "#DC-0200-45-987654",
    name: "서울강남호텔",
    type: "삭제 승인 대기중",
    roomType: "SUITE | Triple Room",
    guestName: "박명수",
    phoneNumber: "010-3333-4444",
    numberOfGuests: 3,
    date: "2024.12.30 (화)",
    price: 350000,
  },
  // Add more sample data as needed
];


const handleRegisterClick = () => {
  window.location.href =
    "http://localhost:3000/mypagehost/accommodations/register";
};


const AccommodationManagementPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("운영중");

  const filteredAccommodations = accommodations.filter(
    (accommodation) => accommodation.type === selectedTab
  );

   return (
    <div className="accommodation-management-page">
      <h2 className="page-title">내 숙소 정보 관리</h2>
      <p className="page-subtitle">• 호스트님의 숙소 현황을 확인해보세요!</p>
      <div className="tab-container">
        <button
          className={`tab-button ${selectedTab === "운영중" ? "active" : ""}`}
          onClick={() => setSelectedTab("운영중")}
        >
          운영중인 숙소
        </button>
        <button
          className={`tab-button ${selectedTab === "등록 승인 대기중" ? "active" : ""}`}
          onClick={() => setSelectedTab("등록 승인 대기중")}
        >
          등록 승인 대기중
        </button>
        <button
          className={`tab-button ${selectedTab === "삭제 승인 대기중" ? "active" : ""}`}
          onClick={() => setSelectedTab("삭제 승인 대기중")}
        >
          삭제 승인 대기중
        </button>
        <button className="register-button" onClick={handleRegisterClick}>
          숙소 등록
        </button>
      </div>
      <div className="accommodation-list">
        {filteredAccommodations.map((accommodation) => (
          <AccommodationCard key={accommodation.id} accommodation={accommodation} />
        ))}
      </div>
      <PaginationFuction totalItems={100} itemsPerPage={10} currentPage={1} onPageChange={function (page: number): void {
          throw new Error("Function not implemented.");
        } }/>
    </div>
    
  );
};

type AccommodationCardProps = {
  accommodation: Accommodation;
};


const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const navigate = useNavigate();

  // 수정 버튼 클릭 핸들러 (숙소 수정 페이지로 이동)
  const handleEdit = (id: string) => {
    navigate(`/mypagehost/accommodations/edit/${id}`);
  }

  // 삭제 버튼 클릭 핸들러 
  const handleDelete = (id: string) => {
    if (window.confirm("정말로 이 숙소를 삭제하시겠습니까?")) {
      // (삭제 api 작성)
      console.log(`숙소 ${id} 삭제`);
      // 삭제 후 상태 업데이트 로직 필요 (filteredAccommodations에서 해당 숙소 제거 하는 로직)
    }
  }
  
  return (
    <div className="accommodation-card">
      <div className="card-date">{accommodation.date}</div>
      <div className="card-content">
        <img src="https://via.placeholder.com/80" alt="Room" className="card-image" />
        <div className="card-info">
          <div className="card-header">
            <span className="status-tag">{accommodation.type}</span>
            <span className="room-id">{accommodation.id}</span>
          </div>
          <h3 className="room-name">{accommodation.name}</h3>
          <p className="room-type">{accommodation.roomType}</p>
          <p className="guest-name">{accommodation.guestName}</p>
          <p className="phone-number">{accommodation.phoneNumber}</p>
          <p className="number-of-guests">• 숙박 인원: {accommodation.numberOfGuests}명</p>
        </div>
        <div className="card-price">
          {accommodation.price.toLocaleString()}원
        </div>
      </div>

      <div className="card-actions">
        <button className="edit-button" onClick={() => handleEdit(accommodation.id)}>
          수정
        </button>
        <button className="delete-button" onClick={() => handleDelete(accommodation.id)}>
          삭제
        </button>
      </div>
    </div>
    
  );
};


export function MyAccommodationManagement() {
 
  // render: 내용물 rendering 부분 //
  return (
    <>
        <Topbar/>
        <div className="test">
        <HostMypageLayout />
        <div id="host-accommodation-register-wrapper">
        <AccommodationManagementPage/>
        </div>
        <div className="pagination">

        </div>
        </div>
    </>
  );
}

