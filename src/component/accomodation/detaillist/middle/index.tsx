import React from 'react'
import './style.css';
import RoomList from './roomlist'
import { RoomDTO } from 'src/apis/accommodation/dto/request/room.request.dto';
import FacilitiesCard from './facilities';

import Map from './navermap';
import MapWithMarkers from './mapmarker';
import {Status, Wrapper} from "@googlemaps/react-wrapper";
import GoogleMap from './googlemap';
import { AccommodationDetailRequestDTO } from 'src/apis/accommodation/dto/request/accommodation-detail.request.dto';


const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap/>;
  }
};

const mockAccommodationData: AccommodationDetailRequestDTO = {
  accommodation_name: "Luxury Hotel",
  introduction: "럭셔리한 분위기와 최고의 서비스를 자랑하는 숙소입니다.",
  usage_info: "기본정보 체크인 : 15:00 | 체크아웃 : 11:00 22시 이후 체크인 시 호텔 프론트 문의 무료 Wi-Fi 전 객실 금연 (흡연 시, 호텔 내부 규정에 따라 과금 발생) [일회용품 사용 규제 안내] 2024년 3월 29일부로 환경보호 동참 및 환경부의 일회용품 무상 제공 규제에 따라 유상으로 판매됩니다 어메니티 구매가 필요하신 고객님들께서는 프론트에 문의 부탁드립니다 (무상 제한 품목 : 칫솔, 치약, 샴푸, 린스, 면도기) 또한, 객실 내 기본으로 제공되는 생수 외 추가 생수를 요청하시는 경우 1병 당 1,000원의 요금이 발생됩니다. 미성년자 단독 숙박 금지 호텔 센트럴베이에서는 청소년 보호법 제29조(청소년 고용 금지 및 출입 제한 등)에 의거하여 미성년자(만 19세 미만) 숙박이 불가능함을 안내드립니다 예약 시 해당 내용을 숙지하지 않은 부분에 대한 책임은 고객에게 있으며 환불은 불가합니다. 주차 안내당 호텔은 기계식 주차타워로만 운영 하고 있고 1객실 당 차량 1대 주차 가능합니다 대형 세단차량, 준대형 이상의 RV, SUV 차량, 공차중량 2,300KG 초과차량 및 오토바이(이륜/사륜)는 주차 불가함을 알려드립니다",

  rooms: [
    {
      roomName: "Deluxe Room",
      description: "Spacious suite with a beautiful city view, free WiFi, and complimentary breakfast.",
      checkInTime: "14:00",
      checkOutTime: "11:00",
      maxOccupancy: 4,
      roomPrice: 150000,
      images: [
        require("./guamHayattoutdoor.jpg"),
        require("./00fee112.webp"),
        require("./1e934a37.avif"),
        require("./376a71e5.webp"),
        require("./3a94d2de.avif"),
        require("./6410d584.webp"),
        require("./7d463801.avif"),
        require("./9015f3a4.avif"),
        require("./970ac34e.avif"),
        require("./9841e722.webp"),
        require("./f4dd89a9.webp"),
        require("./hayattExteria.jpg"),
     
      ],
    },
    {
      roomName: "Suite Room",
      description: "가족 단위로 오기 좋은 넓은 스위트 패밀리 객실.",
      checkInTime: "15:00",
      checkOutTime: "10:00",
      maxOccupancy: 4,
      roomPrice: 200000,
      images:   [ 
    
      require("./00fee112.webp"),
      require("./1e934a37.avif"),
      require("./376a71e5.webp"),
      require("./3a94d2de.avif"),
      require("./6410d584.webp"),
      require("./7d463801.avif"),
      require("./9015f3a4.avif"),
      require("./970ac34e.avif"),
      require("./9841e722.webp"),
      require("./f4dd89a9.webp"),
      require("./hayattExteria.jpg"),
      require("./guamHayattoutdoor.jpg"),
      ]
    },
  
      {
        roomName: "Standard Room",
        description: "Comfortable room with essential amenities, free WiFi, and a cozy environment.",
        checkInTime: "14:00",
        checkOutTime: "11:00",
        maxOccupancy: 2,
        roomPrice: 120000,
        images: [
          require("./3a94d2de.avif"),
          require("./00fee112.webp"),
          require("./1e934a37.avif"),
          require("./376a71e5.webp"),
          require("./6410d584.webp"),
        ],
      },
      {
        roomName: "Deluxe Room",
        description: "Spacious suite with a beautiful city view, free WiFi, and complimentary breakfast.",
        checkInTime: "14:00",
        checkOutTime: "11:00",
        maxOccupancy: 4,
        roomPrice: 150000,
        images: [
          require("./guamHayattoutdoor.jpg"),
          require("./00fee112.webp"),
          require("./1e934a37.avif"),
          require("./376a71e5.webp"),
          require("./3a94d2de.avif"),
        ],
      },
      {
        roomName: "Suite Room",
        description: "Ideal for families, spacious suite with premium facilities and beautiful city views.",
        checkInTime: "15:00",
        checkOutTime: "10:00",
        maxOccupancy: 4,
        roomPrice: 200000,
        images: [
          require("./6410d584.webp"),
          require("./7d463801.avif"),
          require("./9015f3a4.avif"),
          require("./970ac34e.avif"),
          require("./9841e722.webp"),
        ],
      },
      {
        roomName: "Single Room",
        description: "Affordable room with all the necessary amenities for solo travelers.",
        checkInTime: "13:00",
        checkOutTime: "11:00",
        maxOccupancy: 1,
        roomPrice: 80000,
        images: [
          require("./f4dd89a9.webp"),
          require("./hayattExteria.jpg"),
          require("./3a94d2de.avif"),
          require("./7d463801.avif"),
          require("./9015f3a4.avif"),
        ],
      },
      {
        roomName: "Executive Suite",
        description: "Luxurious suite with an executive lounge, free WiFi, and private check-in service.",
        checkInTime: "16:00",
        checkOutTime: "12:00",
        maxOccupancy: 3,
        roomPrice: 250000,
        images: [
          require("./970ac34e.avif"),
          require("./9841e722.webp"),
          require("./f4dd89a9.webp"),
          require("./hayattExteria.jpg"),
          require("./guamHayattoutdoor.jpg"),
        ],
      },
      {
        roomName: "King Room",
        description: "Spacious room with a king-size bed, beautiful views, and premium facilities.",
        checkInTime: "15:00",
        checkOutTime: "10:00",
        maxOccupancy: 2,
        roomPrice: 180000,
        images: [
          require("./00fee112.webp"),
          require("./1e934a37.avif"),
          require("./376a71e5.webp"),
          require("./3a94d2de.avif"),
          require("./6410d584.webp"),
        ],
      },
      {
        roomName: "Twin Room",
        description: "Comfortable room with two twin beds, ideal for friends or family members.",
        checkInTime: "13:00",
        checkOutTime: "11:00",
        maxOccupancy: 2,
        roomPrice: 130000,
        images: [
          require("./7d463801.avif"),
          require("./9015f3a4.avif"),
          require("./970ac34e.avif"),
          require("./9841e722.webp"),
          require("./f4dd89a9.webp"),
        ],
      },
      {
        roomName: "Presidential Suite",
        description: "Exclusive suite with top-tier amenities, private lounge, and breathtaking views.",
        checkInTime: "16:00",
        checkOutTime: "12:00",
        maxOccupancy: 6,
        roomPrice: 500000,
        images: [
          require("./hayattExteria.jpg"),
          require("./guamHayattoutdoor.jpg"),
          require("./00fee112.webp"),
          require("./1e934a37.avif"),
          require("./376a71e5.webp"),
        ],
      },
      {
        roomName: "Family Room",
        description: "Spacious room for families with multiple beds and a relaxing environment.",
        checkInTime: "15:00",
        checkOutTime: "11:00",
        maxOccupancy: 5,
        roomPrice: 220000,
        images: [
          require("./3a94d2de.avif"),
          require("./7d463801.avif"),
          require("./9015f3a4.avif"),
          require("./970ac34e.avif"),
          require("./9841e722.webp"),
        ],
      },
      {
        roomName: "Penthouse Suite",
        description: "Elegant suite with panoramic views, luxury decor, and private rooftop access.",
        checkInTime: "17:00",
        checkOutTime: "12:00",
        maxOccupancy: 4,
        roomPrice: 400000,
        images: [
          require("./f4dd89a9.webp"),
          require("./hayattExteria.jpg"),
          require("./guamHayattoutdoor.jpg"),
          require("./00fee112.webp"),
          require("./1e934a37.avif"),
        ],
      },
    

  ],
};


const mockRoomsData: RoomDTO[] = [
  
];

const markersData = [
  { id: 1, latitude: 37.7749, longitude: -122.4194, label: 'San Francisco' },
  { id: 2, latitude: 34.0522, longitude: -118.2437, label: 'Los Angeles' },
  { id: 3, latitude: 36.1699, longitude: -115.1398, label: 'Las Vegas' },
];

const AccommodationDetailMiddle: React.FC = () => {

  const latitude = 37.7749; // 임의의 위도 값
  const longitude = -122.4194; // 임의의 경도 값
  const accommodationAddress = '부산광역시 부산진구 중앙대로 668 에이원프라자 빌딩 4층'
  
  return (
    <div className='middle-wrapper'>
      <RoomList roomsData={mockAccommodationData.rooms} 
      accommodationData={mockAccommodationData}  />
      <FacilitiesCard/>
      <Map latitude={latitude} longitude={longitude} accommodationAddress={accommodationAddress} />
      {/* <MapWithMarkers markers={markersData} />
      <Wrapper apiKey="AIzaSyCqPhfzQDCxqzMIJNBeMTJuzJ9o71CqRM4" render={render} libraries={['marker']}/>
       */}
  

    </div>
  )
}

export default AccommodationDetailMiddle

