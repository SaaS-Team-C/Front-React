import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import PaginationFuction from '../pagination'; // PaginationFuction 임포트
interface ListProps {
  accommodations: {
    id: number;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    facilities: string[];
    imageUrl: string;
    location: string;
    type: string;
  }[];
}

const List: React.FC<ListProps> = ({ accommodations }) => {
  const navigate = useNavigate();

  // 페이지네이션을 위한 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDetailClick = (name: string) => {
    navigate(`/accommodationList/detail/${encodeURIComponent(name)}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 분류 상태 관리 (분류 옵션 기본값) //
  const [sortOption, setSortOption] = useState('추천순');

  // 분류 로직
  const sortedAccommodations = [...accommodations].sort((a, b) => {
    if (sortOption === '평점 높은순') {
      return b.rating - a.rating;
    } else if (sortOption === '리뷰 많은순') {
      return b.reviewCount - a.reviewCount;
    } else if (sortOption === '낮은 가격순') {
      return a.price - b.price;
    } else if (sortOption === '높은 가격순') {
      return b.price - a.price;
    }
    return 0;
  });

  // 현재 페이지에 해당하는 숙소 리스트만 표시
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentAccommodations = sortedAccommodations.slice(startIdx, startIdx + itemsPerPage);

  // 북마크 상태 관리
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const handleBookmarkToggle = (id: number) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(bookmarkedId => bookmarkedId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  return (
    <div className="accommodation-list">
      <div className="list-header">
        <p>{accommodations.length}개의 검색 결과가 있습니다.</p>
        <div className="sort-dropdown">
          <label htmlFor="sortOptions">분류 기준:</label>
          <select
            id="sortOptions"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="추천순">추천순</option>
            <option value="평점 높은순">평점 높은순</option>
            <option value="리뷰 많은순">리뷰 많은순</option>
            <option value="낮은 가격순">낮은 가격순</option>
            <option value="높은 가격순">높은 가격순</option>
          </select>
        </div>
      </div>

      {/* 검색 결과가 없을 때 메시지를 표시 */}
      {currentAccommodations.length === 0 ? (
        <div className="no-results">
          <p>선택한 조건에 맞는 상품이 없어요.</p>
          <p>필터를 다시 설정해 보세요.</p>
        </div>
      ) : (
        <div className="accommodation-cards">
          {currentAccommodations.map((accommodation) => (
            <div key={accommodation.id} className="accommodation-card">
              <div className="image-wrapper">
                <img src={accommodation.imageUrl} alt={accommodation.name} className="accommodation-image" />
                <div
                  className={`bookmark ${bookmarks.includes(accommodation.id) ? 'active' : ''}`}
                  onClick={() => handleBookmarkToggle(accommodation.id)}
                >
                  ♥
                </div>
              </div>
              <div className="accommodation-info">
                <h3>{accommodation.name}</h3>
                <p>{accommodation.type}</p>
                <p>{accommodation.location}</p>
                <p>₩{accommodation.price.toLocaleString()} /박</p>
                <p>Rating: {accommodation.rating}</p>
                <p>리뷰: {accommodation.reviewCount}개</p>
                <p>Facilities: {accommodation.facilities.join(', ')}</p>
                <button className="details-btn" onClick={() => handleDetailClick(accommodation.name)}>
                  상세보기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination 컴포넌트 */}
      {currentAccommodations.length > 0 && (
        <PaginationFuction
          totalItems={accommodations.length} // 전체 숙소 개수
          itemsPerPage={itemsPerPage} // 페이지당 표시할 숙소 수
          currentPage={currentPage} // 현재 페이지
          onPageChange={handlePageChange} // 페이지 변경 핸들러
        />
      )}
    </div>
  );
};

export default List;
