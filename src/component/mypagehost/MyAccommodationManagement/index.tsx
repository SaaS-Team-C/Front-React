import "./style.css";
import { useNavigate } from "react-router";
import Topbar from "src/component/topbar";
import HostMypageLayout from "src/layout/mypageHost";
import React, { useEffect, useState } from 'react';
import PaginationFunction from "src/component/accomodation/pagination";

import axios from "axios";

type MyAccommodation = {
  accommodationName: string;
  accommodationMainImage: string;
  applyStatus: boolean;
  entryTime: string;
};

const handleRegisterClick = () => {
  window.location.href = "http://localhost:3000/mypagehost/accommodations/register";
};

const AccommodationManagementPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("운영중");
  const [accommodations, setAccommodations] = useState<MyAccommodation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // effect : 백엔드 API에서 데이터 불러오기
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/roomly/host/list/{hostId}'); // 실제 백엔드 URL로 변경 필요
        setAccommodations(response.data); // 받아온 데이터를 상태에 저장
      } catch (err) {
        setError('숙소 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);


  const filteredAccommodations = accommodations.filter(
    (accommodation) => 
      selectedTab === "운영중" ? accommodation.applyStatus : !accommodation.applyStatus
  );


  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        {filteredAccommodations.map((accommodation, index) => (
          <AccommodationCard key={index} accommodation={accommodation} />
        ))}
      </div>
      <PaginationFunction
        totalItems={100}
        itemsPerPage={10}
        currentPage={1}
        onPageChange={(page: number) => {
          // 페이지 변경 로직 추가
        }}
      />
    </div>
  );
};

type AccommodationCardProps = {
  accommodation: MyAccommodation;
};

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/mypagehost/accommodations/showDetailList");
  };

  const handleEdit = (name: string) => {
    navigate(`/mypagehost/accommodations/edit/${name}`);
  };

  const handleDelete = (name: string) => {
    if (window.confirm("정말로 이 숙소를 삭제하시겠습니까?")) {
      console.log(`숙소 ${name} 삭제`);
    }
  };

  return (
    <div id="accommodation-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="card-date">{accommodation.entryTime}</div>
      <div className="card-content">
        <img src={accommodation.accommodationMainImage} alt="Accommodation" className="card-image" />
        <div className="card-info">
          <div className="card-header">
            <span className="status-tag">
              {accommodation.applyStatus ? "운영중" : "등록 승인 대기중"}
            </span>
          </div>
          <h3 className="room-name">{accommodation.accommodationName}</h3>
        </div>
        <div className="card-actions">
          <button
            className="edit-button"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(accommodation.accommodationName);
            }}
          >
            수정
          </button>
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(accommodation.accommodationName);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export function MyAccommodationManagement() {
  return (
    <>
      <Topbar />
      <div className="test">
        <HostMypageLayout />
        <div id="host-accommodation-register-wrapper">
          <AccommodationManagementPage />
        </div>
      </div>
    </>
  );
}