import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import PaginationFuction from "../pagination";
import { AccommodationDTO } from "src/apis/accommodation/dto/response/accommodation.response.dto";
import { fetchAccommodationList } from "src/apis/accommodation";
import { ACCOMMODATION_LIST_DETAIL_PATH } from "src/constants";

// interface: 메인 화면에서 검색 된 숙소 리스트 props //
interface ListProps {
  accommodations: AccommodationDTO[];
}

const List: React.FC<ListProps> = ({ accommodations }) => {
  // state: 숙소 리스트 불러오기 상태 관리
  const [callAccommodationList, SetCallAccommodationList] = useState<
    AccommodationDTO[]
  >([]);

  // state: 페이지네이션을 위한 상태 관리 //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // state: url 값 저장 //
  const [searchParams] = useSearchParams("");

  // state: 분류 상태 관리 (분류 옵션 기본값) //
  const [sortOption, setSortOption] = useState("추천순");

  // state: 북마크 상태 관리 //
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const handleBookmarkToggle = (accommodation_name: string) => {
    if (bookmarks.includes(accommodation_name)) {
      setBookmarks(
        bookmarks.filter((bookmarkedId) => bookmarkedId !== accommodation_name)
      );
    } else {
      setBookmarks([...bookmarks, accommodation_name]);
    }
  };

  // 임시 샘플 데이터, 기능 구현 후 삭제 예정
  useEffect(() => {
    const mockData: AccommodationDTO[] = [
      {
        accommodationName: "해운대 호텔",
        accommodationGradeAverage: 5,
        accommodationAddress: "부산광역시 해운대구 해운로 해운대 해수욕장 13번길",
        categoryArea: "부산광역시",
        categoryPet: true,
        categoryNonSmokingArea: true,
        categoryIndoorSpa: false,
        categoryDinnerParty: true,
        categoryWifi: true,
        categoryCarPark: true,
        categoryPool: true,
        accommodationMainImage: "https://example.com/image1.jpg",
        accommodationType: "호텔",
        countReview: 4,
        minRoomPrice: 300000,
        applyStatus: false
      },
      {
        accommodationName: "웨스틴 조선",
        accommodationGradeAverage: 3,
        categoryArea: "서울시",
        accommodationAddress: "서울특별심 해운대구 해운로 해운대 해수욕장 13번길 소진이네집",
        categoryPet: false,
        categoryNonSmokingArea: true,
        categoryIndoorSpa: false,
        categoryDinnerParty: true,
        categoryWifi: false,
        categoryCarPark: false,
        categoryPool: true,
        accommodationMainImage: "https://example.com/image1.jpg",
        accommodationType: "리조트",
        countReview: 54,
        minRoomPrice: 500000,
        applyStatus: true
      },
    ];

    SetCallAccommodationList(mockData);
  }, []);

  // function: url 값 가져오기 //
  const urlRegion = searchParams.get("Region");
  const urlStart = searchParams.get("start");
  const urlEnd = searchParams.get("end");
  const urlCount = searchParams.get("count");
  const urlName = searchParams.get("accommodationName");

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 숙소 클릭 시 숙소 디테일 페이지로 이동하는 핸들러 //
  const handleDetailClick = (accommodationName: string) => {
    navigator(
      `${ACCOMMODATION_LIST_DETAIL_PATH}?Region=${urlRegion}&start=${urlStart}&end=${urlEnd}&count=${urlCount}&accommodationName=${encodeURIComponent(
        accommodationName
      )}`
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // function: 분류 로직
const sortedAccommodations = [...callAccommodationList].sort((a, b) => {
  const aMinPrice = a.minRoomPrice; 
  const bMinPrice = b.minRoomPrice;

  if (sortOption === "평점 높은순") {
    return b.accommodationGradeAverage - a.accommodationGradeAverage;
  } else if (sortOption === "리뷰 많은순") {
    return b.countReview - a.countReview;
  } else if (sortOption === "낮은 가격순") {
    return aMinPrice - bMinPrice;
  } else if (sortOption === "높은 가격순") {
    return bMinPrice - aMinPrice;
  }
  return 0;
});

  // function: 현재 페이지에 해당하는 숙소 리스트만 표시
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentAccommodations = sortedAccommodations.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  // function: 각 숙소의 시설 정보를 문자열로 변환하는 함수 //
  const getFacilities = (accommodation: AccommodationDTO) => {
    const facilities = [];
    if (accommodation.categoryPet) facilities.push("애완동물 허용");
    if (accommodation.categoryNonSmokingArea) facilities.push("금연 구역");
    if (accommodation.categoryIndoorSpa) facilities.push("실내 스파");
    if (accommodation.categoryDinnerParty) facilities.push("저녁 파티 가능");
    if (accommodation.categoryWifi) facilities.push("와이파이");
    if (accommodation.categoryCarPark) facilities.push("주차 공간");
    if (accommodation.categoryPool) facilities.push("수영장");

    return facilities.join(", ");
  };

  return (
    <div className="accommodation-list">
      <div className="list-header">
        <p>{callAccommodationList.length}개의 검색 결과가 있습니다.</p>
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
            <div
              key={accommodation.accommodationName}
              className="accommodation-card"
            >
              <div className="image-wrapper">
                <img
                  src={accommodation.accommodationMainImage}
                  alt={accommodation.accommodationName}
                  className="accommodation-image"
                />
                <div
                  className={`bookmark ${
                    bookmarks.includes(accommodation.accommodationName)
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleBookmarkToggle(accommodation.accommodationName)
                  }
                >
                  ♥
                </div>
              </div>
              <div className="accommodation-info">
                <h3>{accommodation.accommodationName}</h3>
                <p>{accommodation.accommodationType}</p>
                <p>{accommodation.categoryArea}</p>
                {/* 최저 객실 가격 표시 */}
                <p>
                  ₩
                  /박
                </p>
                <p>Rating: {accommodation.accommodationGradeAverage}</p>
                <p>리뷰: {accommodation.countReview}개</p>{" "}
                {/* ! 합계 구하는걸로 수정 필요 */}
                <p>Facilities: {getFacilities(accommodation)}</p>
                <button
                  className="details-btn"
                  onClick={() =>
                    handleDetailClick(accommodation.accommodationName)
                  }
                >
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
