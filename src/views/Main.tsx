import './style.css';

import { useNavigate } from 'react-router';
import { regionImages } from 'src/resources/images/region';

import Topbar from 'src/component/topbar';
import ImageSlider from 'src/component/ImageSlider';
import { mainImages } from 'src/resources/images/main';
import { ACCOMMODATION_LIST_PATH } from 'src/constants';


// component: 메인페이지 화면 컴포턴트 //
export default function Main() {



    // function: 네비게이터 함수 //
    const navigator = useNavigate();


    const onSerchButtonClick = () => {
        navigator(ACCOMMODATION_LIST_PATH)
    }


    return (
        <>
            <Topbar />
            <div id="main-wrapper" >
                <div className='main-top'>
                    <div className='main-image'>
                        <img className='main-image-1' src={mainImages} alt="이제된다 ㅋㅋㅋ 개꿀" />
                    </div>
                    <div className='main-search-bar'>
                        <div className='destination'>
                            <div className='word'>지역</div>
                            <input className='search' />
                        </div>
                        <div className='check-in'>
                            <div className='word'>입실 날짜</div>
                            <input className='search' type='date' placeholder='입실 날짜를 입력하세요' />
                        </div>
                        <div className='check-out'>
                            <div className='word'>퇴실 날짜</div>
                            <input className='search' type='date' placeholder='퇴실 날짜를 입력하세요' />
                        </div>
                        <div className='people'>
                            <div className='word'>인원</div>
                            <input className='search' />
                        </div>
                        <button className='search-button' onClick={onSerchButtonClick}>검색 하기</button>
                    </div>
                <div className='image-slider'>
                    <ImageSlider title='국내 인기 여행지' imageContents={regionImages} />
                </div>
                </div>
            </div>
        </>
    )

}