import "./style.css";
import React, { useState, useEffect } from 'react';
import Sidebar from "src/component/accomodation/filter/sidebarfilter";
import List from "../../component/accomodation/list";
import Topbar from "src/component/topbar";
import { AccommodationDTO } from "src/apis/accommodation/dto/response/accommodation.response.dto";
import Filter from "src/component/accomodation/filter";

const AccommodationList: React.FC = () => {
  // 숙소 데이터 예시
  const [accommodations, setAccommodations] = useState<AccommodationDTO[]>([]); // 숙소 데이터 상태
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 }); // 초기 최대값 설정
  const [reviewScore, setReviewScore] = useState<boolean[]>([false, false, false, false, false]); // 초기값 설정
  const [accommodationType, setAccommodationType] = useState<boolean[]>([false, false, false]); // 초기값 설정
  const [facilities, setFacilities] = useState<boolean[]>([false, false, false, false, false, false, false]); // 초기값 설정

  // effect: 숙소 데이터 불러오기
  useEffect(() => {
    // 데이터 요청 로직이 만들어서 넣기
    // e.g) setAccommodations(fetchedData);
  }, []);

  const applyFilters = (accommodations: AccommodationDTO[]) => {
    return accommodations.filter(accommodation => {
      const minRoomPrice = Math.min(...accommodation.roomMinPrice.map(room => room.roomPrice));

      // 가격 범위 필터
      if (minRoomPrice < priceRange.min || minRoomPrice > priceRange.max) return false;

      // 평점 필터
      if (reviewScore.some((selected, index) => selected && accommodation.review_grade < 5 - index)) return false;

      // 숙소 타입 필터
      const typeMatch = accommodationType.some((selected, index) =>
        selected && ['Hotel', 'Pension', 'Guesthouse'][index] === accommodation.accommodation_type
      );
      if (!typeMatch && accommodationType.some(selected => selected)) return false;

      // 시설 필터
      const facilitiesMatch = [
        accommodation.category_wifi,
        accommodation.category_car_park,
        accommodation.category_pool,
        accommodation.category_pet,
        accommodation.category_non_smoking_area,
        accommodation.category_indoor_spa,
        accommodation.category_dinner_party
      ].every((facility, index) => !facilities[index] || facility);
      if (!facilitiesMatch) return false;

      return true;
    });
  };


  const filteredAccommodations = applyFilters(accommodations);

  return (
    <div className="AccommodationList">
      <div className="app-container">
        <Topbar />
        <div className="content-container">
          <Filter />
          {/* <List accommodations={filteredAccommodations} />  */}
        </div>
      </div>
    </div>
  );
};

export default AccommodationList;
