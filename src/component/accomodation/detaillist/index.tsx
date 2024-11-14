import React, { useRef } from 'react';
import './style.css';
import AccommodationDetailTop from './top';
import AccommodationDetailMiddle from './middle';
import Topbar from 'src/component/topbar';
import ReviewList from './bottom';
import FacilitiesCard from './middle/facilities';
import Bottombar from 'src/component/bottombar';
import Map from './middle/navermap';


export default function DetailList() {
  const reviewSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToReviews = () => {
    console.log("스크롤 함수 호출됨");
    console.log("ReviewList ref:", reviewSectionRef.current); // ReviewList ref가 제대로 설정되었는지 확인
    console.log("reviewSectionRef:", reviewSectionRef.current); // 이 값이 null이 아닌지 확인
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const facilitySectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToFacility = () => {

    if (facilitySectionRef.current) {
      facilitySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const locationSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToLocation = () => {

       if (locationSectionRef.current) {
        locationSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const latitude = 37.7749; // 임의의 위도 값
  const longitude = -122.4194; // 임의의 경도 값
  const accommodationAddress = '부산광역시 부산진구 중앙대로 668 에이원프라자 빌딩 4층'
  
   

  return (
    <>
    
    <div id='accommodation-detail-list-wrapper'>
      <Topbar/>
      <AccommodationDetailTop onReviewButtonClick={scrollToReviews} accommodation_name={''} onCardClick={scrollToFacility} onLocationClick={scrollToLocation}/>
      <AccommodationDetailMiddle />

      <div className ='facilitiesCard-component-wrapper' ref={facilitySectionRef} id="facilitySection">
      <FacilitiesCard />
      </div>

      <div className ='location-Card-component-wrapper' ref={locationSectionRef} id="locationSection">
      <Map accommodationAddress={accommodationAddress} latitude={latitude} longitude={longitude}/>
      </div>

      <div ref={reviewSectionRef} id="reviewSection">
        <ReviewList />
      </div>

    </div>
    <Bottombar/>
    
    
    </>
  );
}
