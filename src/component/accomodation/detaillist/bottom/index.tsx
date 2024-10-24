import React, { useState } from 'react';
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

// 초기 리뷰 데이터
const initialReviewsData: Review[] = [
  {
    id: 1,
    user: '이소진',
    date: '06/01/2024',
    rating: 5,
    content: '안녕하세요, 안녕하세요, 안녕하세요 안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요 ',
    likes: 6,
  },
  {
    id: 2,
    user: '미쳐버린 개발자',
    date: '06/01/2024',
    rating: 4,
    content: '에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러  에러 에러 에러 에러 에러  에러 에러 에러 에러 에러  에러 에러 에러 에러 에러 ',
    likes: 6,
  },
  {
    id: 3,
    user: 'Customer',
    date: '06/01/2024',
    rating: 1,
    content: 'I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error',
    likes: 6,
  },
  {
    id: 1,
    user: '이소진',
    date: '06/01/2024',
    rating: 3,
    content: '안녕하세요, 안녕하세요, 안녕하세요 안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요 ',
    likes: 6,
  },
  {
    id: 2,
    user: '미쳐버린 개발자',
    date: '06/01/2024',
    rating: 4,
    content: '에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러  에러 에러 에러 에러 에러  에러 에러 에러 에러 에러  에러 에러 에러 에러 에러 ',
    likes: 6,
  },
  {
    id: 3,
    user: 'Customer',
    date: '06/01/2024',
    rating: 1,
    content: 'I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error',
    likes: 6,
  },
  {
    id: 1,
    user: '이소진',
    date: '06/01/2024',
    rating: 2,
    content: '안녕하세요, 안녕하세요, 안녕하세요 안녕하세요 안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요 ',
    likes: 6,
  },
  {
    id: 2,
    user: '미쳐버린 개발자',
    date: '06/01/2024',
    rating: 2,
    content: '에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러 에러  에러 에러 에러 에러 에러  에러 에러 에러 에러 에러  에러 에러 에러 에러 에러 ',
    likes: 6,
  },
  {
    id: 3,
    user: 'Customer',
    date: '06/01/2024',
    rating: 1,
    content: 'I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error I hate error',
    likes: 6,
  },
  {
    id: 4,
    user: 'User4',
    date: '06/02/2024',
    rating: 4,
    content: '이곳은 정말 좋았습니다!',
    likes: 2,
  },
  {
    id: 5,
    user: 'User5',
    date: '06/02/2024',
    rating: 3,
    content: '평범한 숙소였습니다.',
    likes: 1,
  },
  {
    id: 6,
    user: 'User6',
    date: '06/02/2024',
    rating: 5,
    content: '완벽한 경험이었습니다!',
    likes: 3,
  },
];

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

// 리뷰 리스트 컴포넌트
const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviewsData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortCriteria, setSortCriteria] = useState<string>('추천순');
  const itemsPerPage = 5; // 한 페이지당 보여줄 리뷰 개수

  // 좋아요 수 증가 함수
  const handleLike = (id: number) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
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
