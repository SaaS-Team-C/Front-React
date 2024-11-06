import React from 'react';
import './style.css';

interface SidebarProps {
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
  reviewScore: boolean[];
  setReviewScore: (scores: boolean[]) => void;
  accommodationType: boolean[];
  setAccommodationType: (types: boolean[]) => void;
  categoryArea: string[];
  setCategoryArea: (area: string[]) => void;
  facilities: boolean[];
  setFacilities: (facilities: boolean[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  priceRange,
  setPriceRange,
  reviewScore,
  setReviewScore,
  accommodationType,
  setAccommodationType,
  categoryArea,
  setCategoryArea,
  facilities,
  setFacilities,
}) => {
  const resetFilters = () => {
    setPriceRange({ min: 0, max: 5000000 });
    setReviewScore([false, false, false, false, false]);
    setAccommodationType([false, false, false]);
    setCategoryArea([]);
    setFacilities([false, false, false, false, false, false, false]);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'min' | 'max') => {
    const value = Number(e.target.value);
    setPriceRange({
      ...priceRange,
      [side]: value,
    });
  };

  return (
    <aside className="sidebar">
      <div className="filter-header">
        <h2>FILTER BY</h2>
        <button className="reset-btn" onClick={resetFilters}>Reset</button>
      </div>

      {/* 가격 필터 */}
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="range-container">
          <input type="range" min="0" max="5000000" step="10000" value={priceRange.min} onChange={(e) => handlePriceChange(e, 'min')} />
          <input type="range" min="0" max="5000000" step="10000" value={priceRange.max} onChange={(e) => handlePriceChange(e, 'max')} />
        </div>
      </div>

      {/* 리뷰 점수 필터 */}
      <div className="filter-section">
        <h3>Review Score</h3>
        <ul>
          {['5 stars', '4 stars', '3 stars', '2 stars', '1 star'].map((label, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={reviewScore[index]}
                onChange={() => {
                  const updatedScores = [...reviewScore];
                  updatedScores[index] = !updatedScores[index];
                  setReviewScore(updatedScores);
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* 숙소 타입 필터 */}
      <div className="filter-section">
        <h3>Accommodation Type</h3>
        <ul>
          {['Hotel', 'Pension', 'Guesthouse'].map((label, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={accommodationType[index]}
                onChange={() => {
                  const updatedTypes = [...accommodationType];
                  updatedTypes[index] = !updatedTypes[index];
                  setAccommodationType(updatedTypes);
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* 지역 카테고리 필터 */}
      <div className="filter-section">
        <h3>Area</h3>
        <ul>
          {['Seoul', 'Busan', 'Jeju', 'Gangwon'].map((label) => (
            <li key={label}>
              <input
                type="checkbox"
                checked={categoryArea.includes(label)}
                onChange={() => {
                  const updatedAreas = categoryArea.includes(label)
                    ? categoryArea.filter((area) => area !== label)
                    : [...categoryArea, label];
                  setCategoryArea(updatedAreas);
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* 시설 필터 */}
      <div className="filter-section">
        <h3>Facilities</h3>
        <ul>
          {['Free Wi-Fi', 'Parking', 'Pool', 'Pet-friendly', 'Non smoking room', 'Indoor Spa', 'Dinner Party'].map((label, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={facilities[index]}
                onChange={() => {
                  const updatedFacilities = [...facilities];
                  updatedFacilities[index] = !updatedFacilities[index];
                  setFacilities(updatedFacilities);
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
