import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';

// 숙소 이미지 모달 + 슬라이더 //
interface AccommodationImagesProps {
  images: string[];
}

const AccommodationDetailTopImages: React.FC<AccommodationImagesProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
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

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div className="image-container">
      {/* Large image on the left */}
      <div className="large-image-container">
        <img
          src={images[0]} // Show the first image as the large image
          alt="Main Accommodation"
          className="large-image"
          onClick={() => handleImageClick(0)}
        />
      </div>

      {/* Small images in a 2x2 grid */}
      <div className="small-image-grid">
        {images.slice(1, 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Accommodation ${index + 1}`}
            className="small-image"
            onClick={() => handleImageClick(index + 1)}
          />
        ))}
        {/* '전체보기' button */}
        {images.length > 5 && (
          <button className="view-all-btn" onClick={() => setIsModalOpen(true)}>
            전체보기
          </button>
        )}
      </div>

      {/* Modal for the image gallery */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Accommodation Images"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal}>Close</button>
        <Slider {...sliderSettings} ref={sliderRef}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Accommodation ${index + 1}`} className="large-modal-image" />
            </div>
          ))}
        </Slider>

        {/* Thumbnail navigation */}
        <div className="thumbnail-row">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail-image ${currentImage === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

// 숙소 디테일 상단 정보 카드 //
interface AccommodationDetailTopProps {
  name: string;
  stars: number;
  price: string;
  reviewScore: number;
  reviewCount: number;
  reviewSnippet: string;
  services: string[];
  location: string;
  mapLink: string;
  onReviewButtonClick: () => void; // Add this prop
}

const AccommodationDetailTopCard: React.FC<AccommodationDetailTopProps> = ({
  name,
  stars,
  price,
  reviewScore,
  reviewCount,
  reviewSnippet,
  services,
  location,
  mapLink,
  onReviewButtonClick, // Destructure this prop
}) => {
  return (
    <div className="accommodation-detail">
      <div className="header">
        <div className="title-section">
          <span className="accommodation-type">호텔</span>
          <div className="stars">
            {'★'.repeat(stars)} {/* 별점 출력 */}
          </div>
          <h1>{name}</h1>
        </div>
        <div className="price-section">
          <span>{price} 원~</span>
        </div>
      </div>

      <div className="content">
        <div className="review-section">
          <div className="review-score">
            <span className="score">⭐ {reviewScore}</span>
            <span>{reviewCount}개의 리뷰</span>
          </div>
          <p>{reviewSnippet}</p>
          {/* Call the onReviewButtonClick function when the button is clicked */}
          <a href="#" onClick={() => {
            console.log("리뷰 버튼 클릭됨");
            onReviewButtonClick();
          }}>
            리뷰 더 보기
          </a>
        </div>

        <div className="services-section">
          <h3>서비스 및 부대시설</h3>
          <div className="services">
            {services.map((service, index) => (
              <span key={index} className="service-icon">{service}</span>
            ))}
          </div>
          <a href="#">전체 보기</a>
        </div>

        <div className="location-section">
          <h3>위치 정보</h3>
          <p>{location}</p>
          <a href={mapLink}>지도보기</a>
        </div>
      </div>
    </div>
  );
};

export default function AccommodationDetailTop({
  onReviewButtonClick, // Accept this prop here
}: {
  onReviewButtonClick: () => void;
}) {
  return (
    <>
      <AccommodationDetailTopImages images={[
        require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
        require('./Europe-Hotel-4-800x600.jpg'),
        require('./ibis-Yerevan-Center-4-800x600.jpg'),
        require('./Best-Western-Plus-Congress-Hotel-4-800x600.jpg'),
        require('./Europe-Hotel-4-800x600.jpg'),
        require('./ibis-Yerevan-Center-4-800x600.jpg')
      ]} />
      <AccommodationDetailTopCard
        name={''}
        stars={0}
        price={''}
        reviewScore={0}
        reviewCount={0}
        reviewSnippet={''}
        services={[]}
        location={''}
        mapLink={''}
        onReviewButtonClick={onReviewButtonClick} // Pass the function to the card
      />
    </>
  );
}
