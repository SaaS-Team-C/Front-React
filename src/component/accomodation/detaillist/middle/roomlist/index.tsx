import React, { useState } from 'react';
import './style.css';
import RoomCard from '../roomcard';

const roomsData = [
  {
    type: "스탠다드 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 2,
    price: 100000,
    description: "이 객실은 기본형 스탠다드 룸으로 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ]
  },
  {
    type: "디럭스 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 4,
    price: 150000,
    description: "디럭스 룸은 넓은 공간과 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),

    ]
  },
  {
    type: "스탠다드 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 2,
    price: 100000,
    description: "이 객실은 기본형 스탠다드 룸으로 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ]
  },
  {
    type: "디럭스 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 4,
    price: 150000,
    description: "디럭스 룸은 넓은 공간과 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),

    ]
  },
  {
    type: "스탠다드 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 2,
    price: 100000,
    description: "이 객실은 기본형 스탠다드 룸으로 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ]
  },
  {
    type: "디럭스 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 4,
    price: 150000,
    description: "디럭스 룸은 넓은 공간과 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),

    ]
  },
  {
    type: "스탠다드 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 2,
    price: 100000,
    description: "이 객실은 기본형 스탠다드 룸으로 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ]
  },
  {
    type: "디럭스 룸",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    maxOccupancy: 4,
    price: 150000,
    description: "디럭스 룸은 넓은 공간과 ...",
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),

    ]
  }
];

// 숙소 정보를 위한 인터페이스
interface AccommodationInfo {
  introduction: string;
  usageInfo: string;
}

// 숙소 정보 데이터
const accommodationData: AccommodationInfo = {
  introduction: `
    [호텔명]에 오신 것을 환영합니다! 도심 속 휴식처, [호텔명]은 현대적 감각과 세련된 디자인의 아늑한 공간에서 품격 있는 서비스를 제공합니다.
    최상의 편안함을 위해 마련된 넓고 아늑한 객실은 아름다운 도시 전망과 함께 최첨단 시설을 갖추고 있어, 고객님의 특별한 휴식 경험을 선사합니다.
  `,
  usageInfo: `
    <h3>기본정보</h3>
    - 체크인: 15:00 | 체크아웃: 11:00<br/>
    - 미성년자의 숙박 금지: 청소년 보호법 제30조에 의거하여 미성년자(만 19세 미만) 숙박이 불가능합니다.<br/>
    <h3>주차 안내</h3>
    - 주차장 완비: 주차 가능<br/>
    <h3>인원 추가 및 요금</h3>
    - 성인 추가 요금: 1인당 추가 요금 발생<br/>
    <h3>부대시설</h3>
    - 레스토랑: 11:30 ~ 21:00 운영<br/>
    - 주차장: 무료 제공<br/>
    <h3>취소 및 환불 규정</h3>
    - 체크인 3일 전: 무료 취소 가능<br/>
    - 체크인 1일 전: 30% 차감 후 환불<br/>
  `,
};

// component: middel 객실 리스트 컴보넌트(객실 카드, 숙소 소개)
const RoomList: React.FC = () => {
  const [visibleRooms, setVisibleRooms] = useState(3);
  const [isAllRoomsVisible, setIsAllRoomsVisible] = useState(false); // 모든 객실 표시 여부 상태

  const handleShowMore = () => {
    setVisibleRooms(roomsData.length); // 모든 객실 보여주기
    setIsAllRoomsVisible(true); // 상태를 true로 변경
  };

  const handleShowLess = () => {
    setVisibleRooms(3); // 다시 처음 3개의 객실만 보여주기
    setIsAllRoomsVisible(false); // 상태를 false로 변경
  };

  return (
    <div className="room-list-container">
      <h2>객실 선택</h2>
      <div className="room-list">
        {roomsData.slice(0, visibleRooms).map((room, index) => (
         
          <RoomCard key={index} room={room} isFullyBooked={false} />
        ))}
        {!isAllRoomsVisible ? (
          <button className="show-more-btn" onClick={handleShowMore}>
            객실 모두 보기
          </button>
        ) : (
          <button className="show-less-btn" onClick={handleShowLess}>
            모두 보기 닫기
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomList;
