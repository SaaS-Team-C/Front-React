import React, { useState } from 'react';
import './style.css';
import MapFilter from './mapfilter';
import Sidebar from './sidebarfilter';

const Filter: React.FC = () => {
  // 필터 상태 정의
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
  const [reviewScore, setReviewScore] = useState([false, false, false, false, false]);
  const [accommodationType, setAccommodationType] = useState([false, false, false]);
  const [categoryArea, setCategoryArea] = useState<string[]>([]);
  const [facilities, setFacilities] = useState([false, false, false, false, false, false, false]);


  const onFilterChange = (filters: any) => {
    // 필터가 변경될 때의 로직
  };

  const resetFilters = () => {
    setPriceRange({ min: 0, max: 5000000 });
    setReviewScore([false, false, false, false, false]);
    setAccommodationType([false, false, false]);
    setCategoryArea([]);
    setFacilities([false, false, false, false, false, false, false]);
  };
  
  return (
    <div id="filter-wrapper">
      <MapFilter />
      <Sidebar
                onFilterChange={onFilterChange}
                resetFilters={resetFilters}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                reviewScore={reviewScore}
                setReviewScore={setReviewScore}
                accommodationType={accommodationType}
                setAccommodationType={setAccommodationType}
                categoryArea={categoryArea}
                setCategoryArea={setCategoryArea}
                facilities={facilities}
                setFacilities={setFacilities}
      />
    </div>
  );
};

export default Filter;
