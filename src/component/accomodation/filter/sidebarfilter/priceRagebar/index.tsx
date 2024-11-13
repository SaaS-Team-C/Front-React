import React from 'react';
import "./style.css";

interface RangeSliderProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ value, onChange }) => {
  const [minValue, maxValue] = value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinValue = Number(e.target.value);
    onChange([newMinValue, maxValue]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxValue = Number(e.target.value);
    onChange([minValue, newMaxValue]);
  };

  const getMinTrackBackground = () => {
    const minTrackPercentage = ((minValue - 0) / (5000000 - 0)) * 100;
    return `linear-gradient(to right, #00ACCF ${minTrackPercentage}%, #FF5733 ${minTrackPercentage}%)`;
  };

  const getMaxTrackBackground = () => {
    const maxTrackPercentage = ((maxValue - 0) / (5000000 - 0)) * 100;
    return `linear-gradient(to right, #FF5733 ${maxTrackPercentage}%, #00ACCF ${maxTrackPercentage}%)`;
  };

  return (
    <div className="range-container" style={{ display: 'flex', width: '200px' }}>
      <input
        className="range-bar-left"
        type="range"
        min={0}
        max={5000000}
        step={10000}
        value={minValue}
        onChange={handleMinChange}
        style={{
          width: '90px',
          height: '10px',
          margin: '0px',
          boxSizing: 'border-box',
          borderTopLeftRadius: '10px',
          borderBottomLeftRadius: '10px',
          background: getMinTrackBackground(),
        }}
      />
      <input
        className="range-bar-right"
        type="range"
        min={0}
        max={5000000}
        step={10000}
        value={maxValue}
        onChange={handleMaxChange}
        style={{
          width: '90px',
          height: '10px',
          boxSizing: 'border-box',
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          marginLeft: '-2px',
          background: getMaxTrackBackground(),
        }}
      />
    </div>
  );
};

export default RangeSlider;
