import React from 'react'
import './style.css';
import './pricerage.js';
import Topbar from 'src/component/topbar';


// component: 숙소 리스트 화면 컴포넌트 //
export default function AccommodationList() {


  // render: 숙소 리스트 렌더링 //
  return (
    <>

<div id='main-wrapper'>
<Topbar/>

 
    <div id='sidebar'>

        <div className='first-box'>
            <div className='line01'></div>
            <div className='filter-By'>Filter By</div>
        </div>

        <div className='second-box'>
            <div className='search-restart'>검색 초기화</div>
            <div className='restart-image'></div>
        </div>



        <div className='sidebar-container-1'>

              <div className='title-box'>
                <div className='title'>Filter Price</div>
                <div className='per-day'>/ 1박 기준</div>
                <div className='arrow-above'></div>
              </div>

                  <div className='price-range-bar'>게이지바 삽입 자리</div>
                  <div className='price-result-box'>
                    <div className='price-minbox'>{"30,000원"} 이상 ~ </div>
                    <div className='price-maxbox'> {" 50,000원"} 이하</div>
                  </div>

                  <div className='button-box'>
                    <button className='button-clear'>Clear</button>
                    <button className='button-apply'>Apply</button>
                  </div>  

        </div>

        <div className='sidebar-container-2'>
                <div className='title-box'>
                  <div className='title'>Review Score</div>
                  <div className='arrow-above'></div>
                </div>

                <input type='checkbox'/>
                <div>★★★★★</div>
                <input type='checkbox'/>
                <div>★★★★</div>
                <input type='checkbox'/>
                <div>★★★</div>
                <input type='checkbox'/>
                <div>★★</div>
                <input type='checkbox'/>
                <div>★</div>

        </div>

        <div className='sidebar-container-3'>
                <div className='title-box'>
                  <div className='title'>Accommodation Type</div>
                  <div className='arrow-above'></div>
                </div>

                <input className= 'rate' type='checkbox'/>
                <input className= 'rate' type='checkbox'/>
                <input className= 'rate' type='checkbox'/>

        </div>

        <div className='sidebar-container-3'>
                <div className='title-box'>
                  <div className='title'>Facilities</div>
                  <div className='arrow-above'></div>
                </div>

                <input className= 'rate' type='checkbox'/>
                <input className= 'rate' type='checkbox'/>
                <input className= 'rate' type='checkbox'/>

                <button className='More'></button>

        </div>



        </div>







        {/* <div className='sidebar-container'>

          <div className='mini-container'>
              <div className='filter-price'>Filter Price</div>
              <div className='per-day'>/ 1박 기준</div>
              <div className='arrow-above'></div>
            </div>

                <div className='price-range-bar'>게이지바 삽입 자리</div>
                <div className='price-result-box'>
                  <div className='price-minbox'>{"30,000원"} 이상 ~ </div>
                  <div className='price-maxbox'> {" 50,000원"} 이하</div>
                </div>

                <div className='button-box'>
                  <div className='button-clear'>Clear</div>
                  <div className='button-apply'>Apply</div>
                </div>

        </div> */}





    </div>

    </>

  )
}
