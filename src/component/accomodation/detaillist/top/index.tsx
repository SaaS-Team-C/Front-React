import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import Slider from 'react-slick';
import axios from 'axios';
import './style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// interface: 숙소 이미지 모달 + 슬라이더 //
interface AccommodationImagesProps {
  initialImages: string[]; // 숙소 ID를 props로 전달
}

const AccommodationDetailTopImages: React.FC<AccommodationImagesProps> = ({ initialImages }) => {

  // state: 상태 //
  const [images, setImages] = useState<string[]>(initialImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const sliderRef = useRef<Slider>(null);


  // effect: 서버에서 이미지 데이터 가져오는 함수 //
  useEffect(() => {
    const fetchAccommodationImages = async () => {
      try {
        const response = await axios.get(`/api/accommodations/${initialImages}/images`);
        setImages(response.data.accommodation_main_image); // 서버 응답의 이미지 데이터로 상태 업데이트
      } catch (error) {
        console.error("이미지 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchAccommodationImages(); // 컴포넌트 마운트 시 이미지 가져오기
  }, [initialImages]);

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
        {/* '이미지 전체보기' button */}
        {images.length > 5 && (
          <button className="view-all-btn" onClick={() => setIsModalOpen(true)}>
            전체보기
          </button>
        )}
      </div>

      {/* 이미지 모달 */}
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
  accommodationType: string;
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
  accommodationType,
  onReviewButtonClick // Destructure this prop
}) => {

  // state: 상태 관리 //
  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false); 

  // 부대시설 모달 열기 및 닫기 함수
  const openFacilityModal = () => setIsFacilityModalOpen(true);
  const closeFacilityModal = () => setIsFacilityModalOpen(false);
  
  return (
    <div className="accommodation-detail">
      <div className="header">
        <div className="title-section">
          <span className="accommodation-type">{accommodationType}</span>
          <div className="stars">
            {'★'.repeat(stars)} {/* 별점 출력 */}
          </div>
          <h2>{name}</h2>
        </div>
        <div className="price-section">
          <span>{price} 원~ /1박</span>
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
          <button onClick={() => {
            console.log("리뷰 버튼 클릭됨");
            onReviewButtonClick();
          }}>
            리뷰 더 보기
          </button>
        </div>

        <div className="services-section">
          <h3>서비스 및 부대시설</h3>
          <div className="services">
            {services.map((service, index) => (
              <span key={index} className="service-icon">{service}</span>
            ))}
          </div>
          <button className="view-all-facilities-btn" onClick={openFacilityModal}>전체 보기</button>
         {/* 부대시설 모달 */}
      <Modal
        isOpen={isFacilityModalOpen}
        onRequestClose={closeFacilityModal}
        contentLabel="Facility Information"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeFacilityModal}>Close</button>
        <div className="facility-info">
          <h3>부대시설</h3>
          <div className="facility-icons">
            {services.map((service, index) => (
              <div key={index} className="facility-item">
                <i className={`facility-icon ${service}-icon`} /> {/* 부대시설 아이콘 넣기*/}
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
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






interface AccommodationDetail {
  name: string;
  stars: number;
  price: string;
  reviewScore: number;
  reviewCount: number;
  reviewSnippet: string;
  services: string[];
  location: string;
  mapLink: string;
  images: string[];
}

export default function AccommodationDetailTop({
  accommodation_name,
  onReviewButtonClick,
}: {
  accommodation_name: string;
  onReviewButtonClick: () => void;
}) {
  // const [accommodationDetail, setAccommodationDetail] = useState<AccommodationDetail | null>(null);

  // 테스트용 (테스트 끝나면 삭제 예정)
  const [accommodationDetail, setAccommodationDetail] = useState<AccommodationDetail | null>({
    name: "Best Western Plus",
    stars: 4,
    price: "100,000",
    reviewScore: 4.5,
    reviewCount: 128,
    reviewSnippet: "아주 훌륭한 숙소입니다.",
    services: ["WiFi", "수영장", "주차"],
    location: "부산광역시 부산진구 중앙대로 668 에이원프라자 빌딩 4층",
    mapLink: "https://maps.example.com",
    images: [
      "Best-Western-Plus-Congress-Hotel-4-800x600.jpg",
      "Europe-Hotel-4-800x600.jpg",
      "ibis-Yerevan-Center-4-800x600.jpg",
      "Best-Western-Plus-Congress-Hotel-4-800x600.jpg",
      "Europe-Hotel-4-800x600.jpg",
    ],
  });








  useEffect(() => {
    const fetchAccommodationDetail = async () => {
      try {
        const response = await axios.get(`/api/accommodations/${accommodation_name}/details`);
        setAccommodationDetail(response.data);
      } catch (error) {
        console.error("Error fetching accommodation details:", error);
      }
    };
    fetchAccommodationDetail();
  }, [accommodation_name]);

  if (!accommodationDetail) return <p>Loading...</p>; // 로딩 표시


  return (
    <>
      <AccommodationDetailTopImages initialImages={accommodationDetail.images} />
      <AccommodationDetailTopCard
        name={accommodationDetail.name}
        stars={accommodationDetail.stars}
        price={accommodationDetail.price}
        reviewScore={accommodationDetail.reviewScore}
        reviewCount={accommodationDetail.reviewCount}
        reviewSnippet={accommodationDetail.reviewSnippet}
        services={accommodationDetail.services}
        location={accommodationDetail.location}
        mapLink={accommodationDetail.mapLink}
        onReviewButtonClick={onReviewButtonClick} accommodationType={''} />
    </>
  );
}
