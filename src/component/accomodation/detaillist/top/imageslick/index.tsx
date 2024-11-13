import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';

interface AccommodationImagesProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

Modal.setAppElement('#root');


const AccommodationDetailTopImages: React.FC<AccommodationImagesProps> = ({ images, initialIndex = 0, onClose }) => {
  const [currentImage, setCurrentImage] = useState(initialIndex);
  const sliderRef = useRef<Slider>(null);

  const sliderSettings = {
    initialSlide: currentImage,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentImage(index),
  };

  const thumbnailSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 8, // 한 화면에 표시할 썸네일 이미지 개수
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,
    afterChange: (index: number) => setCurrentImage(index),
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
   
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Accommodation Images"
      className="modal"
      overlayClassName="overlay"
    >
      <div className='room-detail-modal-close-btn' onClick={onClose}></div>
      <Slider {...sliderSettings} ref={sliderRef}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Accommodation ${index + 1}`} className="large-modal-image" />
          </div>
        ))}
      </Slider>

       {/* Thumbnail 슬라이더 */}
      <Slider {...thumbnailSettings} className="thumbnail-slider">
        {images.map((image, index) => (
          <div key={index} onClick={() => handleThumbnailClick(index)}>
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail-image ${currentImage === index ? 'active' : ''}`}
            />
          </div>
        ))}
      </Slider>
    </Modal>
  );
};

export default AccommodationDetailTopImages;
