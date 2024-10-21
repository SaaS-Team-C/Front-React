import "./style.css";
import Topbar from "src/component/topbar";
import SideFilterBar from "src/component/accomodation/sidefilterbar";
import AccommodationListPagination from "src/component/accomodation/pagination";
import { useNavigate } from "react-router";

import PriceFilter from "src/component/accomodation/sidefilterbar/PriceFilter";
import SortDropdown from "src/component/accomodation/accomodationlist";
import { AccommodationListType, } from "src/types";
import { ACCOMMODATION_LIST_DETAIL_PATH } from "src/constants";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { ResponseDto } from "src/apis/dto/response";
import { GetAccommodationListResponseDto } from "src/apis/dto/response/accommodation";
import React from "react";

// interface: 숙소 리스트 아이템 컴포넌트 Properties //

interface AccommodationListProps {
  type: AccommodationListType;
  getAccommodationFilteredList: () => void;
}
export default function AccommodationList({
  type,
  getAccommodationFilteredList,
}: AccommodationListProps) {
  // state: 메인화면 검색 조건 상태 //
  // store 상태 만들어야 함
  // const { search } = useSearchedStore();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: filter 검색 상태 //

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 숙소 상세 페이지 이동 버튼 클릭 이벤트 처리 함수 //
  const onDetailButtonClickHandler = () => {
    navigator(ACCOMMODATION_LIST_DETAIL_PATH(type.accommodationName));
  };

  // function: filter 리스트 불러오기 //
  const updateAccommodationResponse = (responseBody: GetAccommodationListResponseDto | ResponseDto | null) => {
    const message =
      // 에러 메세지는 나중에 api 명세서 확정되면 수정 필요
      !responseBody
        ? "서버에 문제가 있습니다."
        : responseBody.code === "VF"
          ? "잘못된 접근입니다."
          : responseBody.code === "AF"
            ? "잘못된 접근입니다."
            : responseBody.code === "NC"
              ? "존재하지 않는 고객입니다."
              : responseBody.code === "NP"
                ? "권한이 없습니다."
                : responseBody.code === "DBE"
                  ? "서버에 문제가 있습니다."
                  : "";

    const isSuccessed = responseBody !== null && responseBody.code == "SU";
    if (!isSuccessed) {
      alert(message);
      return;
    }

    getAccommodationFilteredList();
  };

  // effect: 필터 컴포넌트 로드 시 숙소 리스트 불러오기 함수 //
  useEffect(getAccommodationFilteredList, []);

  // render: 숙소 리스트 아이템 컴포넌트 렌더링 //
  return (
    <>
      <Topbar />
      <SideFilterBar />
      <div id="accomodationlist-wrapper">
        <div className="top">
          <div className="serch-result-text">
            총{type.accommodationGradeSum}
            <span className="total-serched-mount">
              {""}
            </span>
            개의 검색 결과가 있습니다.
          </div>
          <SortDropdown />
        </div>

        <div className="middle">
          <div id="hotel-list-container">
            <div id="td-1">
              <div className="room-image">
                {type.accommodationMainImage}
                <button className="like"></button>
              </div>
            </div>

            <div id="td-2">
              <div className="text-aline-box">
                <div className="hotel-info-box">
                  <div>5성급</div>
                  <div> | {type.accommodationType}</div>
                </div>

                <div className="hotel-grade">★ ★ ★ ★ ★</div>
                <div className="hotel-name">{type.accommodationName}</div>

                <div className="facility-type-box">
                  <div className="pool">{type.categoryPool}</div>
                  <div className="devider-dot" />
                  <div className="bbq">{type.categoryDinnerParty}</div>
                  <div className="devider-dot" />
                  <div className="smoke-room">
                    {type.categoryNonSmokingArea}
                  </div>
                  <div className="devider-dot" />{" "}
                  <div className="pet-friendly">{type.categoryPet}</div>
                </div>

                <div className="location-info-box">
                  <div className="map-icon"></div>{" "}
                  <div className="hotel-address">
                    {type.accommodationAddress}
                  </div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div id="td-3">
              <div className="text-aline-box-td3">
                <div className="price-box">
                  <div className="min-price">260,000원~ </div>
                  <div className="per-day">/박</div>
                </div>

                <div className="average-score-box">
                  <div className="average-score">4.2</div>
                  <div className="average-origin-score">/5</div>
                </div>

                <div className="review-navigator">4개의 리뷰</div>
                <button
                  className="see-detail"
                  onClick={onDetailButtonClickHandler}
                >
                  상세보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PriceFilter
        onFilterChange={function (filters: {
          priceRange: { min: number; max: number };
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <AccommodationListPagination />
    </>
  );
}
