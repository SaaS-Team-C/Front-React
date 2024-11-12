import React, { useState } from 'react';
import './style.css';
import RoomCard from '../roomcard';
import { RoomDTO } from 'src/apis/accommodation/dto/request/room.request.dto';
import { AccommodationDetailRequestDTO } from 'src/apis/accommodation/dto/request/accommodation-detail.request.dto';
// import MapSection from '../navermap';

interface RoomDetailProps {
  roomsData: RoomDTO[];
}
interface AccommodationInfoProps {
  accommodationData?: AccommodationDetailRequestDTO;
}

// component: middel 객실 리스트 컴보넌트(객실 카드, 숙소 소개)
const RoomList: React.FC<RoomDetailProps & AccommodationInfoProps> = ({ roomsData, accommodationData }) => {
  const [visibleRooms, setVisibleRooms] = useState(3); // 처음에는 3개의 객실만 보이도록 설정
  const [isAllRoomsVisible, setIsAllRoomsVisible] = useState(false); // 모든 객실 표시 여부


  const handleShowMore = () => {
    setVisibleRooms(roomsData.length); // 모든 객실 보여주기
    setIsAllRoomsVisible(true); // 상태를 true로 변경
  };

  const handleShowLess = () => {
    setVisibleRooms(3); // 다시 처음 3개의 객실만 보여주기
    setIsAllRoomsVisible(false); // 상태를 false로 변경
  };

  return (
    <div id="room-list-container">
      <div className='room-list-title'>객실 선택</div>
      <div className="room-list">
        {roomsData.slice(0, visibleRooms).map((room, index) => (
          <RoomCard key={index} room={room} isFullyBooked={false} />))}
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

      <div id="accommodation-info-section">
          <>
            <div className="accommodation-info">
              {accommodationData ? (
                <>
                  <div className='accommodation-info-introduction'>숙소 소개</div>
                  <p>{accommodationData.introduction}</p>
                  <h3>숙소 이용 정보</h3>
                  <div dangerouslySetInnerHTML={{ __html: accommodationData.usage_info }} />
                </>
              ) : (
                <p>등록된 숙소 정보가 없습니다.</p>
              )}
            </div>
          </>
        
      </div>
      {/* 지도 섹션 */}
      {/* {isAccommodationInfoVisible && <MapSection />} */}


    </div>
  );
};

export default RoomList;
