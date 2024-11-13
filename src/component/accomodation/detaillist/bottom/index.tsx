import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './style.css';
import PaginationFuction from '../../pagination';

interface Review {
  id: number;
  user: string;
  date: string;
  rating: number;
  content: string;
  likes: number;
}


// function: 리뷰 카드 컴포넌트 //
const ReviewCard: React.FC<{
  review: Review;
  onLike: (id: number) => void;
}> = ({ review, onLike }) => {
  return (
    <div className='review-wrapper'>
    <div id='review-card-wrapper'>
    <div className="review-card">
      <div className="review-header">
        <div className='review-user-icon'></div>
        <div className='review-user-date-box'>
        <div className="review-user-id">{review.user}</div>
        <div className="review-date">{review.date}</div>
        </div>
        <div className='review-like-box'>
        <div className="review-like-button" onClick={() => onLike(review.id)}></div> 
        <div className='review-like-count'>{review.likes}</div>
        </div>
        
      </div>
      <div className="review-rating">
        {'★'.repeat(review.rating)}
      </div>
      <div className="review-content">
        {review.content}
      </div>

    </div>
    </div>
    </div>
  );
};

// state: 리뷰 리스트 컴포넌트 //
const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortCriteria, setSortCriteria] = useState<string>('추천순');
  const itemsPerPage = 5; // 한 페이지당 보여줄 리뷰 개수

  const sampleReviews: Review[] = [
    {
      id: 1,
      user: "홍길동",
      date: "2023-10-01",
      rating: 5,
      content: "정말 훌륭한 숙소였습니다! 다시 방문하고 싶어요.",
      likes: 10,
    },
    {
      id: 2,
      user: "이순신",
      date: "2023-09-20",
      rating: 4,
      content: "편안하게 머물 수 있었습니다. 다만 소음이 좀 있었습니다.",
      likes: 5,
    },
    {
      id: 3,
      user: "유관순",
      date: "2023-09-15",
      rating: 3,
      content: "가격 대비 괜찮았습니다. 위치는 좋았지만 시설은 보통이었습니다.",
      likes: 8,
    },
    {
      id: 4,
      user: "안중근",
      date: "2023-08-30",
      rating: 2,
      content: "숙소 청결 상태가 조금 아쉬웠습니다.",
      likes: 3,
    },
    {
      id: 5,
      user: "김구",
      date: "2023-08-10",
      rating: 1,
      content: "다신 오고 싶지 않습니다. 여러모로 실망스러웠습니다.",
      likes: 1,
    },
    {
      id: 6,
      user: "김구",
      date: "2023-08-10",
      rating: 1,
      content: "다신 오고 싶지 않습니다. 여러모로 실망스러웠습니다.",
      likes: 1,
    },
    {
      id: 7,
      user: "김구",
      date: "2023-08-10",
      rating: 1,
      content: "다신 오고 싶지 않습니다. 여러모로 실망스러웠습니다.",
      likes: 1,
    },
  ];

   // effect: 데이터베이스에서 리뷰 가져오기 //
   useEffect(() => {
    setReviews(sampleReviews);
  }, []);


  //  useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await axios.get<Review[]>('/api/reviews'); // API 경로는 백엔드와 맞춰서 추후 실제 경로 수정 예정
  //       setReviews(response.data);
  //     } catch (error) {
  //       console.error('리뷰 데이터를 가져오는 중 에러 발생:', error);
  //     }
  //   };
  //   fetchReviews();
  // }, []);

  // 좋아요 수 증가 함수
  const handleLike = (id: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id ? { ...review, likes: review.likes + 1 } : review
      )
    );
  };


  // 정렬 함수
  const sortReviews = (reviews: Review[]) => {
    switch (sortCriteria) {
      case '추천순':
        return [...reviews].sort((a, b) => b.likes - a.likes);
      case '최신순':
        return [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case '평점 높은순':
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case '평점 낮은순':
        return [...reviews].sort((a, b) => a.rating - b.rating);
      default:
        return reviews;
    }
  };

  // 현재 페이지에 표시할 리뷰 계산
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const sortedReviews = sortReviews(reviews); // 정렬된 리뷰
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div id='review-list-wrapper'>
    <div className="review-list-container">
      <div className='review-title'>Reviews</div>

      {/* 정렬 기준 선택 */}
      <div className="sort-dropdown">
        <label htmlFor="sortOptions"> </label>
        <select
          id="sortOptions"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="추천순">추천순</option>
          <option value="최신순">최신순</option>
          <option value="평점 높은순">평점 높은순</option>
          <option value="평점 낮은순">평점 낮은순</option>
        </select>
      </div>

      <div id="review-overall">

        <div className='review-box'>
          <div className='review-star-icon'></div>
        <div className="rating-score">5/5</div>
        <div className="rating-text">Excellent</div>
        <div className="rating-count">({reviews.length} Reviews)</div>
        </div>
      </div>

      {currentReviews.map((review) => (
        <ReviewCard key={review.id} review={review} onLike={handleLike} />
      ))}

      {reviews.length > itemsPerPage && ( // 페이지네이션이 필요할 경우만 표시
        <PaginationFuction
          totalItems={reviews.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage} // 페이지 변경 함수
        />
      )}
    </div>
    </div>
  );
};

export default ReviewList;
