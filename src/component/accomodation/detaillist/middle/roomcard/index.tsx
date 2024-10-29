import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';
import Modal from 'react-modal';
import AccommodationDetailTopImages from '../../top/imageslick';
import { PAYMENT_PATH } from 'src/constants';


// interface: 객실 상세보기 버튼 & 객실 정보 카드에 사용되는 props //
interface Room {
  name: string;
  type: string;
  checkInTime: string;
  checkOutTime: string;
  maxOccupancy: number;
  price: number;
  description: string;
  images: string[];
}

// props: 객실 카드 컴포넌트의 props 정의 //
interface RoomCardProps {
  room: Room;
  isFullyBooked: boolean; // 객실 매진 여부를 나타내는 props 추가
}

// component: 객실 상세 정보 보여주는 카드 컴포넌트 //
const RoomCard: React.FC<RoomCardProps> = ({ room, isFullyBooked }) => {

  // state: 상태 함수 //

  // state: 상태 함수 //
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // state: url 값 저장 //
  const [searchParams, setSearchParams] = useSearchParams('');

  // function: url 값 가져오기 //
  const urlRegion = searchParams.get('Region')
  const urlStart = searchParams.get('start')
  const urlEnd = searchParams.get('end')
  const urlCount = searchParams.get('count')
  const urlName = searchParams.get('name')
  const urlRoom = searchParams.get('roomType')

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

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

  // event handler: 숙소 예약 버튼 클릭 시 예약 페이지로 이동하는 핸들러 //
  //! 예약 버튼 클릭시 로그인 상태 확인 필요 & 로그인 안되어 있을 시 로그인 하도록 alert창 or 회원가입 페이지로 이동하게끔 수정하기
  const handleChangebooking = () => {
    navigator(
      `${PAYMENT_PATH}?Region=${urlRegion}&start=${urlStart}&end=${urlEnd}&count=${urlCount}&name=${encodeURIComponent(room.name)}&roomType=${urlRoom}`,
      { state: { imageSrc: room.images[0], price: room.price, checkInTime: urlStart, checkOutTime: urlEnd, personnelCount: urlCount, roomName: urlName, roomType: urlRoom } }
    );
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
            <button className="reserve-btn" onClick={handleChangebooking}>
              숙박 예약
            </button>
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
          <p>{room.description}</p>
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
