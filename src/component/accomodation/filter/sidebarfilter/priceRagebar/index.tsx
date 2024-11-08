import React, { useState } from 'react';
import "./style.css";

const RangeSlider: React.FC = () => {
  // 슬라이더의 최소값, 최대값, 초기값 설정
  const [minValue, setMinValue] = useState<number>(2000000);
  const [maxValue, setMaxValue] = useState<number>(3000000);

  // 슬라이더 값이 바뀔 때마다 색상이 변화하도록 처리
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(Number(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(Number(e.target.value));
  };

  // 슬라이더 트랙의 배경색을 계산
  const getMinTrackBackground = () => {
    const minTrackPercentage = ((minValue - 0) / (5000000 - 0)) * 100; // 0 ~ 5000000 범위 기준으로 비율 계산
    return `linear-gradient(to right, #00ACCF ${minTrackPercentage}%, #FF5733 ${minTrackPercentage}%)`;
  };

  const getMaxTrackBackground = () => {
    const maxTrackPercentage = ((maxValue - 0) / (5000000 - 0)) * 100;
    return `linear-gradient(to right, #FF5733 ${maxTrackPercentage}%, #00ACCF ${maxTrackPercentage}%)`;
  };

  return (
    <div className="range-container" style={{ display: 'flex', width: '200px' }}>
      {/* 왼쪽 슬라이더 */}
      <input
        className="range-bar-left"
        type="range"
        min={0}
        max={5000000}
        step={10000}
        value={minValue}
        onInput={handleMinChange}
        style={{
          width: '90px',
          height: '10px',
          margin: '0px',
          boxSizing: 'border-box',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          background: getMinTrackBackground(), // 배경색을 상태에 따라 설정
        }}
      />
      {/* 오른쪽 슬라이더 */}
      <input
        className="range-bar-right"
        type="range"
        min={0}
        max={5000000}
        step={10000}
        value={maxValue}
        onInput={handleMaxChange}
        style={{
          width: '90px',
          height: '10px',
          boxSizing: 'border-box',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          marginLeft: '-2px',
          background: getMaxTrackBackground(), // 배경색을 상태에 따라 설정
        }}
      />
    </div>
  );
};

export default RangeSlider;
