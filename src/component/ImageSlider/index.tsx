import React, { useState } from 'react';
import './style.css';



interface ImageSliderProps {
  imageContents: { image: string, text: string }[];
  title: string;
}

export default function ImageSlider({ imageContents, title }: ImageSliderProps) {

  const [startIndex, setStartIndex] = useState<number>(0);

  const handleNext = () => {
    if (startIndex < 4) {
      setStartIndex(startIndex + 4); // 오른쪽 버튼 클릭 시 4칸 이동
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 4); // 왼쪽 버튼 클릭 시 4칸 이동
    }
  };

  const showLeftButton = startIndex > 0; // 시작 인덱스가 0보다 클 때 왼쪽 버튼 표시
  const showRightButton = startIndex < 4; // 시작 인덱스가 4보다 작을 때 오른쪽 버튼 표시

  return (
    <div className='slider-warpper'>
      <div className='left'>
        {showLeftButton && <div className='left-button' onClick={handlePrev}></div>}
      </div>
      <div className="slider-container">
        <div className='title'>{title}</div>
        <div className='image-container' style={{ transform: `translateX(-${(startIndex / 6) * 100}%)` }}>
          {imageContents.slice(0, 10).map(({ image, text }, index) => (
            <div className='image' key={index}>
              <img className='slide' src={image} alt={`Image ${index + 1}`} />
              <div className='ranktext'>{text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='right'>
        {showRightButton && <div className='right-button' onClick={handleNext}></div>}
      </div>
    </div>
  );
};
