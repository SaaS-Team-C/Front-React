import "./style.css";

import React, { useState } from 'react'

import Sidebar from "src/component/accomodation/sidebarfilter";
// import Topbar from "src/component/topbar";
import List from "../../../component/accomodation/list";
import AccommodationListMockData from "src/mock/accommodation/list";



const AccommodationList: React.FC = () => {
  const accommodations = AccommodationListMockData;

  // 필터 상태 관리
  const [priceRange, setPriceRange] = useState({ min: 50000, max: 300000 });
  const [reviewScore, setReviewScore] = useState<boolean[]>([false, false, false, false, false]);
  const [accommodationType, setAccommodationType] = useState<boolean[]>([false, false, false]);
  const [facilities, setFacilities] = useState<boolean[]>([false, false, false, false, false, false, false]);


  // 필터링 로직
  const filteredAccommodations = accommodations.filter((accommodation) => {
    // 가격 범위 필터
    const matchesPrice = accommodation.price >= priceRange.min && accommodation.price <= priceRange.max;

    // 평점 필터 (선택된 평점이 없을 때는 필터링하지 않음)
    const selectedReviewIndexes = reviewScore
      .map((selected, index) => selected && 5 - index)
      .filter((score) => score !== false);
    const matchesReview = selectedReviewIndexes.length === 0 || selectedReviewIndexes.includes(accommodation.rating);

    // 숙소 타입 필터 (선택된 숙소 타입이 없을 때는 필터링하지 않음)
    const accommodationTypes = ['Hotel', 'Pension', 'Guesthouse'];
    const selectedAccommodationTypes = accommodationType
      .map((selected, index) => selected && accommodationTypes[index])
      .filter((type) => type !== false);
    const matchesAccommodationType =
      selectedAccommodationTypes.length === 0 || selectedAccommodationTypes.includes(accommodation.type);

    // 시설 필터 (선택된 시설이 없을 때는 필터링하지 않음)
    const facilityLabels = ['Free Wi-Fi', 'Parking', 'Pool', 'Pet-friendly', 'Non smoking room', 'Indoor Spa', 'Dinner Party'];
    const selectedFacilities = facilities
      .map((selected, index) => selected ? facilityLabels[index] : null)
      .filter((facility): facility is string => facility !== null);

    const matchesFacilities = selectedFacilities.every((facility) => accommodation.facilities.includes(facility));


    // 모든 조건을 만족하는지 체크
    return matchesPrice && matchesReview && matchesAccommodationType && matchesFacilities;
  });


  return (
    <div className="AccommodationList">
      <div className="app-container">
        {/* <Topbar /> */}
        <div className="content-container">
          <Sidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            reviewScore={reviewScore}
            setReviewScore={setReviewScore}
            accommodationType={accommodationType}
            setAccommodationType={setAccommodationType}
            facilities={facilities}
            setFacilities={setFacilities}
          />
          <List accommodations={filteredAccommodations} />
        </div>
      </div>
    </div>
  );
};

export default AccommodationList;
