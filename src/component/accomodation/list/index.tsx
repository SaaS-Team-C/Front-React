import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.css";
import { ACCESS_TOKEN, ACCOMMODATION_LIST_DETAIL_PATH } from "src/constants";
import { getAccommodationListRequest } from "src/apis";
import { useCookies } from "react-cookie";

import { ResponseDto } from "src/apis/hostmypage";
import { Accommodations } from "src/types";
import { GetAccommodationListResponseDto } from "src/apis/hostmypage/dto/response/get-accommodation-list.response.dto";





const List = () => {
  // state: 숙소 리스트 불러오기 상태 관리
  const [callAccommodationList, SetCallAccommodationList] = useState<Accommodations[]>([]);
  // state: url 값 저장 //
  const [searchParams] = useSearchParams("");
  // state: 북마크 상태 관리 //
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // state: 쿠키 상태 //
  const [cookies, setCookie] = useCookies();

  const handleBookmarkToggle = (accommodationName: string) => {
    if (bookmarks.includes(accommodationName)) {
      setBookmarks(
        bookmarks.filter((bookmarkedId) => bookmarkedId !== accommodationName)
      );
    } else {
      setBookmarks([...bookmarks, accommodationName]);
    }
  };

  
  
  // function: get accommodation list response 처리 함수 //
  const getAccommodaitonListResponse = (responseBody: GetAccommodationListResponseDto | ResponseDto | null) =>{
    const message = 
        !responseBody ? '서버에 문제가 있습니다. ':
        responseBody.code === 'AF' ? '잘못된 접근입니다. ':
        responseBody.code === 'DBE' ? '서버에 문제가있습니다. ': '';
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        };
        const { accommodations } = responseBody as GetAccommodationListResponseDto;
        SetCallAccommodationList(accommodations);

        
  }

  // Effect: 백엔드에서 숙소 리스트 데이터 요청 //
  useEffect(() => {
    const accessToken = cookies[ACCESS_TOKEN];
    if (!accessToken) return;
    getAccommodationListRequest(accessToken).then(getAccommodaitonListResponse);
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


  // function: 각 숙소의 시설 정보를 문자열로 변환하는 함수 //
  const getFacilities = (accommodations: Accommodations) => {
    const facilities = [];
    if (accommodations.categoryPet) facilities.push("애완동물 허용");
    if (accommodations.categoryNonSmokingArea) facilities.push("금연 구역");
    if (accommodations.categoryIndoorSpa) facilities.push("실내 스파");
    if (accommodations.categoryDinnerParty) facilities.push("저녁 파티 가능");
    if (accommodations.categoryWifi) facilities.push("와이파이");
    if (accommodations.categoryCarPark) facilities.push("주차 공간");
    if (accommodations.categoryPool) facilities.push("수영장");
  
    // 텍스트로만 점 구분자 결합하여 반환
    return facilities.join(" · ");
  };

  return (
        
    <div id="accommodation-search-list">
      <div className="list-header">
        <div className="search-length-result">{callAccommodationList.length}개의 검색 결과가 있습니다.</div>
        <div className="sort-dropdown">
          <label htmlFor="sortOptions"></label>
        </div>
      </div>

      {/* 검색 결과가 없을 때 메시지를 표시 */}
      {callAccommodationList.length === 0 ? (
        <div className="no-results">
          <p>선택한 조건에 맞는 상품이 없어요.</p>
          <p>필터를 다시 설정해 보세요.</p>
        </div>
      ) : (
        <div className="accommodation-cards-container">
          {callAccommodationList.map((accommodations) => (
            <div
              key={accommodations.accommodationName}
              className="accommodation-cards"
              onClick={() => handleDetailClick(accommodations.accommodationName)}
            >
              
              <div className="image-wrapper">
                <img
                  src={accommodations.accommodationMainImage}
                  alt={accommodations.accommodationName}
                  className="accommodation-image"
                />
                <div
                  className={`bookmark ${
                    bookmarks.includes(accommodations.accommodationName)
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleBookmarkToggle(accommodations.accommodationName)
                  }
                >
                  ♥
                </div>
              </div>
              <div id="accommodation-info">
                <div className="type-area-container">
                <div className="type">{accommodations.accommodationType}</div>
                <div className="divider-bar-type-area">|</div>
                <div className="category-area">{accommodations.categoryArea}</div>
                </div>
                <div className="name">{accommodations.accommodationName}</div>
                <div className="fake-stars">⭐⭐⭐⭐⭐</div>

                <div className="category-facilities">{getFacilities(accommodations)}</div>
                {/* <div className="address-box">
                  <div className="map-icon"></div>
                  <div className="address">{accommodations.accommodationAddress}</div>
                </div> */}
              </div>
              <div className="divider-bar"></div>
                {/* 최저 객실 가격 표시 */}
                <div className="accommodation-price-container">
                  <div className="price-box">
                    <div className="min-price">{accommodations.minRoomPrice}~</div>
                    <div className="won">원</div>
                    <div className="per-one-day">/박</div>
                  </div>
                  <div className="rating-box">
                    <div className="rating"> {accommodations.accommodationGradeAverage}</div>
                    <div className="rating-per-score">/5</div>
                  </div>
                <div className="review">{accommodations.countReview}개의 리뷰</div>
                <button
                  className="show-detail-btn"
                  onClick={() =>
                    handleDetailClick(accommodations.accommodationName)
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

    </div>
  
  );
};

export default List;
