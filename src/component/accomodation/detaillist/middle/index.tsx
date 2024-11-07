import React from 'react'
import './style.css';
import RoomList from './roomlist'
import { RoomDTO } from 'src/apis/accommodation/dto/request/room.request.dto';
import FacilitiesCard from './facilities';
import Map from './navermap';

const mockRoomsData: RoomDTO[] = [
  {
    roomName: "Deluxe Room",
    description: "Spacious suite with a beautiful city view, free WiFi, and complimentary breakfast.",
    checkInTime: "14:00",
    checkOutTime: "11:00",
    maxOccupancy: 4,
    roomPrice: 150000,
    images: [
      "Best-Western-Plus-Congress-Hotel-4-800x600.jpg",
      "https://example.com/images/deluxe-room2.jpg"
    ]
  },
  {
    roomName: "suite Room",
    description: "가족 단위로 오기 좋은 넓은 스위트 패밀리 객실.",
    checkInTime: "15:00",
    checkOutTime: "10:00",
    maxOccupancy: 4,
    roomPrice: 200000,
    images: [
      "Best-Western-Plus-Congress-Hotel-4-800x600.jpg",
      "https://example.com/images/deluxe-room2.jpg"
    ]
  },
  // 필요한 만큼 다른 객실 객체를 추가 하시면 되셔용 ㅎㅎ.
];

export default function AccommodationDetailMiddle() {
  return (
    <div className='middle-wrapper'>
      <RoomList roomsData={mockRoomsData} />
      <FacilitiesCard/>
      <Map/>
    </div>
  )
}

