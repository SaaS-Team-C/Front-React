import React from 'react'
import './style.css';
import Topbar from 'src/component/topbar';
import SideFilterBar from 'src/component/sidefilterbar';


// component: 숙소 리스트 화면 컴포넌트 //
export default function AccommodationList() {


  // render: 숙소 리스트 렌더링 //
  return (


<div id='main-wrapper'>
<Topbar/>
<SideFilterBar/>
</div>

  )
}
