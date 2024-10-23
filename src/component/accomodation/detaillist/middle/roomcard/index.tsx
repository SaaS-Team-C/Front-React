import React, { useState } from 'react';
import AccommodationDetailTopImages from '../../top/imageslick';



interface Room {
  type: string;
  checkInTime: string;
  checkOutTime: string;
  maxOccupancy: number;
  price: number;
  images: string[];
}

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="room-card">
      <div className="room-card-image">
        <img
          src={room.images[0]} // 첫 번째 이미지만 표시
          alt={room.type}
          onClick={() => handleImageClick(0)} // 이미지를 클릭하면 모달이 열림
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
        <button className="detail-btn">상세 정보</button>
        <button className="reserve-btn">숙박 예약</button>
        <p className="price">₩{room.price.toLocaleString()}원</p>
      </div>

      {/* 모달 창을 띄우는 AccommodationDetailTopImages 컴포넌트 */}
      {isModalOpen && (
        <AccommodationDetailTopImages
          initialIndex={currentImageIndex}
          onClose={closeModal} images={[]} />
      )}
    </div>
  );
};

export default RoomCard;
