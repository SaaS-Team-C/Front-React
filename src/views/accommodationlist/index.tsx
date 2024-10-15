import React, { useState } from 'react'
import './style.css';
import Topbar from 'src/component/topbar';
import SideFilterBar from 'src/component/sidefilterbar';
import AccommodationListPagination from 'src/component/accomodation/pagination';
import { useNavigate } from 'react-router';
import SortDropdown from 'src/component/accomodation/accomodationlist';
import PriceFilter from 'src/component/sidefilterbar/PriceFilter';


// interface: 숙소 리스트 아이템 컴포넌트 Properties //
interface TableAccommodationListProps {
}

// component: 숙소 리스트 화면 컴포넌트 //
export default function AccommodationList() {


  // function: 네비게이터 함수 //
  // const navigator = useNavigate();

  // render: 숙소 리스트 아이템 렌더링 // 
  return (
    <>
      <Topbar />
      <SideFilterBar />
      <div id='accomodationlist-wrapper'>
        <div className='top'>
          <div className='serch-result-text'>총  <span className='total-serched-mount'>{"'totalCount'"}</span>개의 검색 결과가 있습니다.</div>
          <SortDropdown />
        </div>

        <div className='middle'>
          <div id='hotel-list-container'>
            <div id='td-1'>
              <div className='room-image'>
                <button className='like'></button>
              </div>
            </div>

            <div id='td-2'>
              <div className='text-aline-box'>
                <div className='hotel-info-box'>
                  <div>5성급</div><div> | 호텔</div>
                </div>

                <div className='hotel-grade'>★ ★ ★ ★ ★</div>
                <div className='hotel-name'>세인트존스 호텔</div>

                <div className='facility-type-box'>
                  <div className='pool'>수영장</div><div className='devider-dot' /><div className='bbq'>바베큐</div><div className='devider-dot' /><div className='smoke-room'>금연 객실</div><div className='devider-dot' /> <div className='pet-friendly'>반려동물 동반 가능</div>
                </div>

                <div className='location-info-box'>
                  <div className='map-icon'></div> <div className='hotel-address'>강릉특별자치도, 강릉 강해로 307</div>
                </div>
              </div>
            </div>

            <div className='divider'></div>

            <div id='td-3'>
              <div className='text-aline-box-td3'>
                <div className='price-box'>
                  <div className='min-price'>260,000원~ </div><div className='per-day'>/박</div>
                </div>

                <div className='average-score-box'>
                  <div className='average-score'>4.2</div><div className='average-origin-score'>/5</div>
                </div>

                <div className='review-navigator'>4개의 리뷰</div>
                <button className='see-detail'>상세보기</button>
              </div>
            </div>

          </div>

        </div>
      </div>
      <PriceFilter onFilterChange={function (filters: { priceRange: { min: number; max: number; }; }): void {
        throw new Error('Function not implemented.');
      }} />
      <AccommodationListPagination />
    </>




  )
}
