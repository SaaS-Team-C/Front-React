import React from 'react'
import './style.css';
import Topbar from 'src/component/topbar';
import SideFilterBar from 'src/component/sidefilterbar';
import { useNavigate } from 'react-router';

// interface: 숙소 리스트 아이템 컴포넌트 Properties //
interface TableAccommodationListProps {

}

// function: 네비게이터 함수 //
// const navigator = useNavigate();


// component: 숙소 리스트 화면 컴포넌트 //
export default function AccommodationList() {


  // render: 숙소 리스트 아이템 렌더링 // 
  return (

<div id='accomodationlist-wrapper'>
<Topbar/>
<SideFilterBar/>


  <div className='top'>
    <div className='serch-result-text'>총 <span className='total-serched-mount'>{"'totalCount'"}</span>개의 검색 결과가 있습니다.</div>
  
  {/* 드롭다운 메뉴 */}

  <div className="dropdown">
    <button className="dropbtn">
      <span className="dropbtn_content">분류</span>
      <span className="dropbtn_click">arrow</span>
    </button>
    <div className="dropdown-content">
      <div className="fastfood"></div>
      <div className="fastfood">추천순</div>
      <div className="fastfood" >평점 높은순</div>
      <div className="fastfood" >리뷰 많은순</div>
      <div className="fastfood">낮은 가격순</div>
      <div className="fastfood" >높은 가격순</div>
    </div>
  </div>




    </div>
  </div>




  )
}
