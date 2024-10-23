import React, { useState } from 'react';
import RoomCard from '../roomcard';


const roomsData = [
  {
    type: '스탠다드룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 159000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '슈페리어룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 189000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '디럭스룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 219000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '스탠다드룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 159000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '슈페리어룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 189000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '디럭스룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 219000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '스탠다드룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 159000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '슈페리어룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 189000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  },
  {
    type: '디럭스룸',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    maxOccupancy: 2,
    price: 219000,
    images: [
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./Europe-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
      require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
      require('./ibis-Yerevan-Center-4-800x600.jpg'),
    ],
  }
];

const RoomList: React.FC = () => {
  const [visibleRooms, setVisibleRooms] = useState(3);

  const handleShowMore = () => {
    setVisibleRooms(roomsData.length);
  };

  return (
    <div className="room-list">
      <h2>객실 선택</h2>
      {roomsData.slice(0, visibleRooms).map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
      {visibleRooms < roomsData.length && (
        <button className="show-more-btn" onClick={handleShowMore}>
          객실 모두 보기
        </button>
      )}
    </div>
  );
};

export default RoomList;
