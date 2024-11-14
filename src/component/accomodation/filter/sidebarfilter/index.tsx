import React, { useState } from "react";

import "./style.css";
import RangeSlider from "./priceRagebar";

interface SidebarProps  {
  onFilterChange: (filters: any) => void;
  resetFilters: () => void;
  priceRange: { min: number; max: number };
  setPriceRange: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  reviewScore: boolean[];
  setReviewScore: React.Dispatch<React.SetStateAction<boolean[]>>;
  accommodationType: boolean[];
  setAccommodationType: React.Dispatch<React.SetStateAction<boolean[]>>;
  categoryArea: string[];
  setCategoryArea: React.Dispatch<React.SetStateAction<string[]>>;
  facilities: boolean[];
  setFacilities: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, resetFilters }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [reviewScore, setReviewScore] = useState<boolean[]>([false, false, false, false, false]);
  const [accommodationType, setAccommodationType] = useState<boolean[]>([false, false, false]);
  const [categoryArea, setCategoryArea] = useState<string[]>([]);
  const [showAllAreas, setShowAllAreas] = useState(false);
  const [facilities, setFacilities] = useState<string[]>([]);

  

  const handleFilterChange = () => {
    onFilterChange({
      priceRange,
      reviewScore,
      accommodationType,
      categoryArea,
      facilities,
    });
  };

  return (
    <aside id="sidebar">
      <div className="filter-header">
        <div className="filter-title-box">
          <div className="mini-bar"></div>
          <div className="filter-title">FILTER BY</div>
        </div>

        <div className="reset-box">
          <div className="reset">검색 초기화</div>
          <button className="reset-btn" onClick={resetFilters}></button>
        </div>
      </div>


     {/* 가격 필터 */}
     <div className="filter-section">
        <div className="filter-price-box">
          <div className="filter-price-title-box">
            <div className="filter-categories-title">Filter Price</div>
            <div className="filter-price-title-second">/ 1박 기준</div>
          </div>



        {/* 레인지 바*/}
        <RangeSlider value={priceRange} onChange={(range) => { setPriceRange(range); handleFilterChange(); }} />
        </div>
      </div>

  {/* 리뷰 점수 필터 */}
  <div className="filter-section">
        <div className="filter-section-box">
        <div className="filter-categories-title">리뷰</div>
        <ul className="star">

          {["★★★★★", "★★★★", "★★★", "★★", "★"].map((label, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={reviewScore[index]}
                onChange={() => {
                  const updatedScores = [...reviewScore];
                  updatedScores[index] = !updatedScores[index];
                  setReviewScore(updatedScores);
                  handleFilterChange();
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
      </div>

      {/* 숙소 유형 필터 */}
      <div className="filter-section">
      <div className="filter-section-box">
        <div className="filter-categories-title">숙소 유형</div>
        <ul>
          {["호텔", "펜션", "게스트하우스"].map((label, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={accommodationType[index]}
                onChange={() => {
                  const updatedTypes = [...accommodationType];
                  updatedTypes[index] = !updatedTypes[index];
                  setAccommodationType(updatedTypes);
                  handleFilterChange();
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
      </div>

    {/* 지역 카테고리 필터 */}
    <div className="filter-section">
        <div className="filter-section-box">
          <div className="filter-categories-title">지역</div>

        <ul>
          {["제주도", "서울", "부산", "경주", ...(showAllAreas ? ["강릉", "인천", "가평", "여수", "속초"] : [])].map((label) => (
            <li key={label}>
              <input
                type="checkbox"
                checked={categoryArea.includes(label)}
                onChange={() => {
                  const updatedAreas = categoryArea.includes(label)
                    ? categoryArea.filter((area) => area !== label)
                    : [...categoryArea, label];
                  setCategoryArea(updatedAreas);
                  handleFilterChange();
                }}
              />
              {label}
            </li>
          ))}
        </ul>
        <div className="button-wrapper">
          <div className={showAllAreas ? "arrow-up" : "arrow-down"}></div>
          <button className="show-all-button" onClick={() => setShowAllAreas(!showAllAreas)}>
            {showAllAreas ? "숨기기" : "더 보기"}
          </button>
          </div>
          </div>
      </div>

      {/* 시설 필터 */}
      <div className="filter-section">
      <div className="filter-section-box">
        <div className="filter-categories-title">부대 시설</div>

        <ul>
          {["무료 와이파이", "주차장", "수영장", "펫 동반 가능", "금연 객실", "실내 스파", "바베큐"].map((label) => (
            <li key={label}>
              <input
                type="checkbox"
                checked={facilities.includes(label)}
                onChange={() => {
                  const updatedFacilities = facilities.includes(label)
                    ? facilities.filter((f) => f !== label)
                    : [...facilities, label];
                  setFacilities(updatedFacilities);
                  handleFilterChange();
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </aside>
  );
};

export default Sidebar;
