import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory를 임포트합니다.
import './style.css';
import Modal from 'react-modal';
import AccommodationDetailTopImages from '../../top/imageslick';

// interface: 객실 상세보기 버튼 & 객실 정보 카드에 사용되는 props //
interface Room {
  type: string;
  checkInTime: string;
  checkOutTime: string;
  maxOccupancy: number;
  price: number;
  description: string;
  images: string[];
}

// 객실 카드 컴포넌트의 props 정의
interface RoomCardProps {
  room: Room;
  isFullyBooked: boolean; // 객실 매진 여부를 나타내는 props 추가
}

// component: 객실 상세 정보 보여주는 카드 컴포넌트 //
const RoomCard: React.FC<RoomCardProps> = ({ room, isFullyBooked }) => {
  const navigator = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // 이미지 클릭 시 이미지 모달 열기
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  // 상세 정보 버튼 클릭 시 상세 정보 모달 열기
  const handleOpenDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  // 이미지 모달 닫기
  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  // 상세 정보 모달 닫기
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // 일정 변경 버튼 클릭 핸들러
  const handleChangeSchedule = () => {
    navigator('/main'); // 메인 화면으로 이동
  };

  return (
    <div className="room-card">
      {isFullyBooked ? ( // 객실이 매진된 경우
        <div className="fully-booked-message">
          <p>선택한 날짜의 객실은 매진되었어요.</p>
          <p>상단 검색창에서 날짜나 인원을 다시 설정해보세요.</p>
          <button className="change-schedule-btn" onClick={handleChangeSchedule}>
            일정 변경
          </button>
        </div>
      ) : (
        <>
          <div className="room-card-image">
            <img
              src={room.images[0]} // 첫 번째 이미지만 표시
              alt={room.type}
              onClick={() => handleImageClick(0)} // 이미지를 클릭하면 이미지 모달 열기
            />
            <div className="image-count">{room.images.length}+</div>
          </div>
          <div className="room-card-info">
            <h3>{room.type}</h3>
            <p>입실 {room.checkInTime}</p>
            <p>퇴실 {room.checkOutTime}</p>
            <p>기준 {room.maxOccupancy}명</p>
          </div>
          <div className="room-card-action">
            <button className="detail-btn" onClick={handleOpenDetailModal}>
              상세 정보
            </button>
            <button className="reserve-btn">숙박 예약</button>
            <p className="price">₩{room.price.toLocaleString()}원</p>
          </div>
        </>
      )}

      {/* 이미지 모달: AccommodationDetailTopImages 사용 */}
      {isImageModalOpen && (
        <AccommodationDetailTopImages
          initialIndex={currentImageIndex}
          onClose={closeImageModal}
          images={room.images} // 객실 이미지 배열 전달
        />
      )}

      {/* 상세 정보 모달 */}
      {isDetailModalOpen && (
        <Modal
          isOpen={isDetailModalOpen}
          onRequestClose={closeDetailModal} // 모달 외부를 클릭하거나 닫기 버튼을 누르면 닫기
          contentLabel="Room Details Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>{room.type} - 상세정보</h2>
          <p>{room.description}</p> {/* Room description 출력 */}
          <p>입실 시간: {room.checkInTime}</p>
          <p>퇴실 시간: {room.checkOutTime}</p>
          <p>최대 수용 인원: {room.maxOccupancy}명</p>
          <p>가격: ₩{room.price.toLocaleString()}원</p>
          <button onClick={closeDetailModal}>닫기</button>
        </Modal>
      )}
    </div>
  );
};

export default RoomCard;
