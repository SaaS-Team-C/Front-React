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


// 리뷰 컴포넌트
const ReviewCard: React.FC<{
  review: Review;
  onLike: (id: number) => void;
}> = ({ review, onLike }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="user-name">{review.user}</div>
        <div className="review-date">{review.date}</div>
      </div>
      <div className="review-rating">
        {'⭐'.repeat(review.rating)}
      </div>
      <div className="review-content">
        {review.content}
      </div>
      <div className="review-footer">
        <button className="like-button" onClick={() => onLike(review.id)}>
          👍
        </button> {review.likes}
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

   // effect: 데이터베이스에서 리뷰 가져오기 //
   useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>('/api/reviews'); // API 경로는 백엔드와 맞춰서 추후 실제 경로 수정 예정
        setReviews(response.data);
      } catch (error) {
        console.error('리뷰 데이터를 가져오는 중 에러 발생:', error);
      }
    };
    fetchReviews();
  }, []);

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
    <div className="review-list-container">
      <h3>Reviews</h3>

      {/* 정렬 기준 선택 */}
      <div className="sort-options">
        <label htmlFor="sort">정렬 기준: </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="추천순">추천순</option>
          <option value="최신순">최신순</option>
          <option value="평점 높은순">평점 높은순</option>
          <option value="평점 낮은순">평점 낮은순</option>
        </select>
      </div>

      <div className="review-overall">
        <div className="rating-score">5/5</div>
        <div className="rating-text">Excellent</div>
        <div className="rating-count">({reviews.length} Reviews)</div>
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
  );
};

export default ReviewList;
