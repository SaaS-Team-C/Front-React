import React, { useState } from 'react';
import Slider from 'react-slider';
import './style.css';

// interface: onFilterChange 함수에 대한 타입 정의 //
interface PriceFilterProps {
  onFilterChange: (filters: { priceRange: { min: number; max: number } }) => void;
}

// component: PriceFilter 컴포넌트 //
const PriceFilter: React.FC<PriceFilterProps> = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(30000);
  const [maxPrice, setMaxPrice] = useState(50000);

  // function: 필터 적용 함수 //
  const applyFilter = () => {
    onFilterChange({ priceRange: { min: minPrice, max: maxPrice } });
  };

  return (
    <div id='price-filter-container'>

      <Slider
        className='price-range-bar'
        value={[minPrice, maxPrice]}
        min={0}
        max={100000}
        onChange={([min, max]) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
      />

      <div className='price-result-box'>
        <div className='price-minbox'>{`${minPrice}원`} 이상 ~ </div>
        <div className='price-maxbox'>{`${maxPrice}원`} 이하</div>
      </div>

      <div className='button-box'>
        <button className='button-clear' onClick={() => {
          setMinPrice(30000);
          setMaxPrice(50000);
        }}>Clear</button>
        <button className='button-apply' onClick={applyFilter}>Apply</button>
      </div>
    </div>
  );
};

export default PriceFilter;
