import "./style.css";
import React, { useState } from 'react';
import Sidebar from "src/component/accomodation/sidebarfilter";
import List from "../../../component/accomodation/list";
import Topbar from "src/component/topbar";

const AccommodationList: React.FC = () => {

  // state: 필터 상태 업데이트 함수 및 초기값 정의 //
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [reviewScore, setReviewScore] = useState<boolean[]>([]);
  const [accommodationType, setAccommodationType] = useState<boolean[]>([]);
  const [facilities, setFacilities] = useState<boolean[]>([]);


  return (
    <div className="AccommodationList">
      <div className="app-container">
        <Topbar />
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
          <List accommodations={[]} />
        </div>
      </div>
    </div>
  );
};

export default AccommodationList;
