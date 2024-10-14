import React from 'react'
import './style.css';
import './pricerage.js';
import Topbar from 'src/component/topbar';


// component: 숙소 리스트 화면 컴포넌트 //
export default function SideFilterBar() {


  // render: 숙소 리스트 렌더링 //
  return (
    <>

<div id='main-wrapper'>
<Topbar/>

 
    <div id='sidebar'>
      <div className='sidebar-wrapper'>

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
                    <div className='arrow-dropdown'></div>
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
                      <div className='arrow-dropdown'></div>
                    </div>

                  <div className='checkbox-totalcontainer'>
                        <div className='checkbox-container'>
                        <input className='checkbox' type='checkbox'/>
                        <div className='star'>★★★★★</div>
                        </div>

                        <div className='checkbox-container'>
                        <input className='checkbox' type='checkbox'/>
                        <div className='star'>★★★★</div>
                        </div>

                        <div className='checkbox-container'>
                        <input className='checkbox' type='checkbox'/>
                        <div className='star'>★★★</div>
                        </div>

                        <div className='checkbox-container'>
                        <input className='checkbox' type='checkbox'/>
                        <div className='star'>★★</div>
                        </div>

                        <div className='checkbox-container'>
                        <input className='checkbox' type='checkbox'/>
                        <div className='star'>★</div>
                        </div>
                  </div>

            </div>

            <div className='sidebar-container-3'>
                    <div className='title-box'>
                      <div className='title'>Accommodation Type</div>
                      <div className='arrow-dropdown'></div>
                    </div>

                    <div className='accommodation-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='accommodation-type'>호텔</div>
                    </div>

                    <div className='accommodation-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='accommodation-type'>리조트</div>
                    </div>

                    <div className='accommodation-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='accommodation-type'>펜션</div>
                    </div>

            </div>

            <div className='sidebar-container-4'>
                    <div className='title-box'>
                      <div className='title'>Facilities</div>
                      <div className='arrow-dropdown'></div>
                    </div>

                    <div className='facilities-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='facilities-type'>금연</div>
                    </div>

                    <div className='facilities-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='facilities-type'>주차장</div>
                    </div>

                    <div className='facilities-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='facilities-type'>와이파이</div>
                    </div>

                    <div className='facilities-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='facilities-type'>수영장</div>
                    </div>

                    <div className='facilities-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='facilities-type'>실내스파</div>
                    </div>

                    <div className='facilities-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='facilities-type'>바베큐</div>
                    </div>

                    <div className='facilities-type-box'>
                    <input className='checkbox' type='checkbox'/>
                    <div className='facilities-type'>애완</div>
                    </div>

                    <button className='search'>검색하기</button>

            </div>
          </div>


        </div>







        {/* <div className='sidebar-container'>

          <div className='mini-container'>
              <div className='filter-price'>Filter Price</div>
              <div className='per-day'>/ 1박 기준</div>
              <div className='arrow-dropdown'></div>
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
