import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';

interface AccommodationImagesProps {
  images: string[]; 
}

const AccommodationImages: React.FC<AccommodationImagesProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 선택된 이미지의 인덱스

  // 모달 열기
  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  // 슬라이더 설정
  const sliderSettings = {
    initialSlide: currentIndex,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentIndex(index),
  };

  return (
    <div>
      {/* 작은 이미지들 */}
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`숙소 이미지 ${index + 1}`}
            className="thumbnail"
            onClick={() => openModal(index)} // 이미지 클릭 시 모달 열기
          />
        ))}
      </div>

      {/* 모달 */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="숙소 이미지 보기"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal}>닫기</button>

        {/* 큰 이미지 슬라이더 */}
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`숙소 이미지 ${index + 1}`} className="large-image" />
            </div>
          ))}
        </Slider>
      </Modal>
    </div>
  );
}



function AccDetailTop() {
  return (
 <div className='acc-detail-wrapper'>   
  <div id='acc-detail-top-wrapper'>
 
      <div className='acc-image-wrapper'>
        <div className='acc-image-representative'></div>
        <div className='acc-image-second-line'>
          <div className='first'></div>
          <div className='second'></div>
        </div>
        <div className='acc-image-third-line'>
          <div className='first'></div>
          <div className='second'></div>
          <button className='botton-box'>
          <div className='image-icon'></div>
          <div className='acc-image-show-total'>전체보기</div>
          </button>
        </div>
      </div>
  
    <div className='top-middle'></div>
    <div className='top-bottom'></div>
  </div>
</div>
  );
}


function AccDetailMiddle() {
  return (
  <div id='acc-detail-middle-wrapper'>
            <AccommodationImages images={[
                require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
                require('./Europe-Hotel-4-800x600.jpg'),
                require('./ibis-Yerevan-Center-4-800x600.jpg'),
                require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
                require('./Europe-Hotel-4-800x600.jpg'),
                require('./ibis-Yerevan-Center-4-800x600.jpg')
            ]}/>
  </div>
  );
}

function AccDetailBottom() {
  return (
  <div id='acc-detail-bottom-wrapper'>

  </div>
  );
}

function AccDetailreview() {
  return (
  <div id='acc-detail-review-wrapper'>

  </div>
  );
}


export default function AccommodationListDetail() {
  return (
    <div>
      <AccDetailTop/>
      <AccDetailMiddle/>

    </div>
  )
}
