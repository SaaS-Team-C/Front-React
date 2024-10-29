import React, { useRef } from 'react';
import AccommodationDetailTop from './top';
import AccommodationDetailMiddle from './middle';
import Topbar from 'src/component/topbar';
import ReviewList from './bottom';

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

  return (
    <div>
      <Topbar />
      <AccommodationDetailTop onReviewButtonClick={scrollToReviews} accommodation_name={''} />
      <AccommodationDetailMiddle />
      <div ref={reviewSectionRef} id="reviewSection">
        <ReviewList />
      </div>
    </div>
  );
}
