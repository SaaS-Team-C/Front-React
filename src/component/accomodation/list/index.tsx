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
  const itemsPerPage = 7;

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
        accommodationGradeAverage: 4.2,
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
        accommodationGradeAverage: 4.8,
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
        {
          accommodationName: "서울 시티 호텔",
          accommodationGradeAverage: 4.5,
          categoryArea: "서울 강남",
          accommodationType: "호텔",
          categoryPet: false,
          categoryNonSmokingArea: true,
          categoryWifi: true,
          categoryIndoorSpa: true,
          categoryPool: false,
          categoryCarPark: true,
          categoryDinnerParty: false,
          accommodationMainImage: "https://example.com/images/seoul_city_hotel.jpg",
          accommodationAddress: "서울시 강남구 테헤란로 123",
          minRoomPrice: 85000,
          countReview: 123,
          applyStatus: true,
        },
        {
          accommodationName: "해운대 비치 리조트",
          accommodationGradeAverage: 4.3,
          categoryArea: "부산 해운대",
          accommodationType: "리조트",
          categoryPet: true,
          categoryNonSmokingArea: true,
          categoryWifi: true,
          categoryIndoorSpa: false,
          categoryPool: true,
          categoryCarPark: true,
          categoryDinnerParty: true,
          accommodationMainImage: "https://example.com/images/haeundae_resort.jpg",
          accommodationAddress: "부산시 해운대구 해변로 456",
          minRoomPrice: 150000,
          countReview: 89,
          applyStatus: true,
        },
        {
          accommodationName: "남산 게스트하우스",
          accommodationGradeAverage: 4.0,
          categoryArea: "서울 중구",
          accommodationType: "게스트하우스",
          categoryPet: false,
          categoryNonSmokingArea: false,
          categoryWifi: true,
          categoryIndoorSpa: false,
          categoryPool: false,
          categoryCarPark: false,
          categoryDinnerParty: false,
          accommodationMainImage: "https://example.com/images/namsan_guesthouse.jpg",
          accommodationAddress: "서울시 중구 명동길 78",
          minRoomPrice: 40000,
          countReview: 45,
          applyStatus: true,
        },
        {
          accommodationName: "인천 공항 호텔",
          accommodationGradeAverage: 4.6,
          categoryArea: "인천 중구",
          accommodationType: "호텔",
          categoryPet: false,
          categoryNonSmokingArea: true,
          categoryWifi: true,
          categoryIndoorSpa: true,
          categoryPool: false,
          categoryCarPark: true,
          categoryDinnerParty: false,
          accommodationMainImage: "https://example.com/images/incheon_airport_hotel.jpg",
          accommodationAddress: "인천시 중구 공항로 100",
          minRoomPrice: 90000,
          countReview: 150,
          applyStatus: true,
        },
        {
          accommodationName: "제주 자연 펜션",
          accommodationGradeAverage: 4.7,
          categoryArea: "제주 서귀포",
          accommodationType: "펜션",
          categoryPet: true,
          categoryNonSmokingArea: false,
          categoryWifi: true,
          categoryIndoorSpa: false,
          categoryPool: false,
          categoryCarPark: true,
          categoryDinnerParty: true,
          accommodationMainImage: "https://example.com/images/jeju_nature_pension.jpg",
          accommodationAddress: "제주도 서귀포시 산록로 50",
          minRoomPrice: 70000,
          countReview: 98,
          applyStatus: true,
        },
        {
          accommodationName: "강릉 오션 호텔",
          accommodationGradeAverage: 4.4,
          categoryArea: "강원 강릉",
          accommodationType: "호텔",
          categoryPet: false,
          categoryNonSmokingArea: true,
          categoryWifi: true,
          categoryIndoorSpa: false,
          categoryPool: true,
          categoryCarPark: true,
          categoryDinnerParty: true,
          accommodationMainImage: "https://example.com/images/gangneung_ocean_hotel.jpg",
          accommodationAddress: "강원도 강릉시 해안로 20",
          minRoomPrice: 110000,
          countReview: 72,
          applyStatus: true,
        },
        {
          accommodationName: "부산 마린 리조트",
          accommodationGradeAverage: 4.2,
          categoryArea: "부산 광안리",
          accommodationType: "리조트",
          categoryPet: true,
          categoryNonSmokingArea: false,
          categoryWifi: true,
          categoryIndoorSpa: true,
          categoryPool: true,
          categoryCarPark: true,
          categoryDinnerParty: false,
          accommodationMainImage: "https://example.com/images/busan_marine_resort.jpg",
          accommodationAddress: "부산시 수영구 광안해변로 200",
          minRoomPrice: 160000,
          countReview: 67,
          applyStatus: true,
        },
        {
          accommodationName: "경주 전통 한옥",
          accommodationGradeAverage: 4.8,
          categoryArea: "경북 경주",
          accommodationType: "한옥",
          categoryPet: false,
          categoryNonSmokingArea: true,
          categoryWifi: true,
          categoryIndoorSpa: false,
          categoryPool: false,
          categoryCarPark: true,
          categoryDinnerParty: false,
          accommodationMainImage: "https://example.com/images/gyeongju_traditional_hanok.jpg",
          accommodationAddress: "경상북도 경주시 양남면 한옥길 88",
          minRoomPrice: 50000,
          countReview: 55,
          applyStatus: true,
        },
        {
          accommodationName: "대전 비즈니스 호텔",
          accommodationGradeAverage: 4.3,
          categoryArea: "대전 서구",
          accommodationType: "호텔",
          categoryPet: false,
          categoryNonSmokingArea: true,
          categoryWifi: true,
          categoryIndoorSpa: false,
          categoryPool: false,
          categoryCarPark: true,
          categoryDinnerParty: false,
          accommodationMainImage: "https://example.com/images/daejeon_business_hotel.jpg",
          accommodationAddress: "대전시 서구 대덕대로 45",
          minRoomPrice: 60000,
          countReview: 95,
          applyStatus: true,
        },
        {
          accommodationName: "양양 바다 캠핑장",
          accommodationGradeAverage: 4.1,
          categoryArea: "강원 양양",
          accommodationType: "캠핑장",
          categoryPet: true,
          categoryNonSmokingArea: false,
          categoryWifi: false,
          categoryIndoorSpa: false,
          categoryPool: false,
          categoryCarPark: true,
          categoryDinnerParty: true,
          accommodationMainImage: "https://example.com/images/yangyang_sea_camp.jpg",
          accommodationAddress: "강원도 양양군 해변길 23",
          minRoomPrice: 30000,
          countReview: 32,
          applyStatus: true,
        }
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
  
    // 텍스트로만 점 구분자 결합하여 반환
    return facilities.join(" · ");
  };

  return (
    <div id="accommodation-search-list">
      <div className="list-header">
        <div className="search-length-result">{callAccommodationList.length}개의 검색 결과가 있습니다.</div>
        <div className="sort-dropdown">
          <label htmlFor="sortOptions"></label>
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
        <div className="accommodation-cards-container">
          {currentAccommodations.map((accommodation) => (
            <div
              key={accommodation.accommodationName}
              className="accommodation-cards"
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
              <div id="accommodation-info">
                <div className="type-area-container">
                <div className="type">{accommodation.accommodationType}</div>
                <div className="divider-bar-type-area">|</div>
                <div className="category-area">{accommodation.categoryArea}</div>
                </div>
                <div className="name">{accommodation.accommodationName}</div>
                <div className="fake-stars">⭐⭐⭐⭐⭐</div>
             
                <div className="category-facilities">{getFacilities(accommodation)}</div>
                <div className="address-box">
                  <div className="map-icon"></div>
                  <div className="address">{accommodation.accommodationAddress}</div>
                </div>
              </div>
              <div className="divider-bar"></div>
                {/* 최저 객실 가격 표시 */}
                <div className="accommodation-price-container">
                  <div className="price-box">
                    <div className="min-price">{accommodation.minRoomPrice}~</div>
                    <div className="won">원</div>
                    <div className="per-one-day">/박</div>
                  </div>
                  <div className="rating-box">
                    <div className="rating"> {accommodation.accommodationGradeAverage}</div>
                    <div className="rating-per-score">/5</div>
                  </div>
                <div className="review">{accommodation.countReview}개의 리뷰</div>
                <button
                  className="show-detail-btn"
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
              currentPage={currentPage} // 현재 페이지
              totalItems={callAccommodationList.length} // 전체 숙소 개수
              itemsPerPage={itemsPerPage} // 페이지당 표시할 숙소 수
              onPageChange={handlePageChange} // 페이지 변경 핸들러
            />

      )}
    </div>
  );
};

export default List;
