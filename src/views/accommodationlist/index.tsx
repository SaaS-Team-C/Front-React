
import './style.css';
import Topbar from 'src/component/topbar';
import SideFilterBar from 'src/component/accomodation/sidefilterbar';
import AccommodationListPagination from 'src/component/accomodation/pagination';
import { useNavigate } from 'react-router';


import PriceFilter from 'src/component/accomodation/sidefilterbar/PriceFilter';
import SortDropdown from 'src/component/accomodation/accomodationlist';
import { AccommodationListType } from 'src/types';
import { ACCOMMODATION_LIST_DETAIL_PATH } from 'src/constants';

// interface: 숙소 리스트 아이템 컴포넌트 Properties //
interface AccommodationListProps {

  type: AccommodationListType;
  getAccommodationType: () => void;

}

function Accommodationinfo({ type, getAccommodationType }: AccommodationListProps) {

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 상세 보기 버튼 클릭 이벤트 처리 함수 //
  const onDetailButtonClickHandler = () => {
    navigator(ACCOMMODATION_LIST_DETAIL_PATH(type.accommodationName));
  };


  return (
    <>
      <Topbar />
      <SideFilterBar />
      <div id='accomodationlist-wrapper'>
        <div className='top'>
          <div className='serch-result-text'>총 <span className='total-serched-mount'>{type.accommodationScoreSum}</span>개의 검색 결과가 있습니다.</div>
          <SortDropdown />
        </div>

        <div className='middle'>
          <div id='hotel-list-container'>
            <div id='td-1'>
              <div className='room-image'>
                {type.accommodationMainImage}
                <button className='like'></button>
              </div>
            </div>

            <div id='td-2'>
              <div className='text-aline-box'>
                <div className='hotel-info-box'>
                  <div>5성급</div><div> | {type.accommodationType}</div>
                </div>

                <div className='hotel-grade'>★ ★ ★ ★ ★</div>
                <div className='hotel-name'>{type.accommodationName}</div>

                <div className='facility-type-box'>
                  <div className='pool'>{type.categoryPool}</div><div className='devider-dot' /><div className='bbq'>{type.categoryDinnerParty}</div><div className='devider-dot' /><div className='smoke-room'>{type.categoryNonSmokingArea}</div><div className='devider-dot' /> <div className='pet-friendly'>{type.categoryPet}</div>
                </div>

                <div className='location-info-box'>
                  <div className='map-icon'></div> <div className='hotel-address'>{type.accommodationAddress}</div>
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
                <button className='see-detail' onClick={onDetailButtonClickHandler}>상세보기</button>
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

};

// component: 숙소 리스트 화면 컴포넌트 //
export default function AccommodationList() {


  // function: 네비게이터 함수 //
  // const navigator = useNavigate();

  // render: 숙소 리스트 아이템 렌더링 // 

}
