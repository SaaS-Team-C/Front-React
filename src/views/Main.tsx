import './style.css';

import Topbar from 'src/component/topbar';
import ImageSlider6 from 'src/component/ImageSlider6';
import ImageSlider4 from 'src/component/imageSlider4';
import DistimctionButton from 'src/component/distinctionbutton';
import CustomCalendar from 'src/component/Calendar';


import { useNavigate } from 'react-router';
import { RegionImages } from 'src/resources/images/Region';
import { mainImages } from 'src/resources/images/main';
import { ACCOMMODATION_LIST_PATH } from 'src/constants';
import { proposeImages } from 'src/resources/images/propose';
import { ChangeEvent, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { getValue } from '@testing-library/user-event/dist/utils';
import CalendarEnd from 'src/component/Calendar';


// component: 메인페이지 화면 컴포턴트 //
export default function Main() {

    // 대문 글자 //
    const imagetext = '여행은 역시 Roomly.'

    // state: 년 월 일 상태 관리 //
    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // 월은 0~11을 불러오기 떄문에 1을 추가해야한다 //
    const date: number = today.getDate();
    const [Region, setRegion] = useState<string>('');
    const [start, setStart] = useState<string>(`${year}-${month}-${date}`);
    const [end, setEnd] = useState<string>(`${year}-${month}-${date + 1}`);
    const [count, setCount] = useState<string>('2');

    // state: 분류 버튼 상태 관리 //
    const [click, setClick] = useState<string>('전체');

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 분류 버튼 클릭 이벤트 핸들러 //
    const onClickButtonHandler = (distimction: string) => {
        setClick(distimction);
    }

    // event handler: 지역입력값 입력 이벤트 핸들러 //
    const onRegionChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setRegion(value);
    }

    // event handler: 시작날짜 입력 이벤트 핸들러 //
    const onStartChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setStart(value);
    }

    // event handler: 종료날짜 입력 이벤트 핸들러 //
    const onEndChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEnd(value);
    }

    // event handler: 인원수 입력 이벤트 핸들러 //
    const onCountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCount(value);
    }

    // event handler: 검색 버튼 클릭 이벤트 핸들러 //
    const onSerchButtonClick = () => {
        if (!Region) {
            alert('지역을 입력해 주세요!');
            return;
        };
        if (!start || !end) {
            alert('날짜를 입력해 주세요!');
            return;
        };
        if (!count) {
            alert('인원수를 입력해 주세요!')
            return
        };
        navigator(`${ACCOMMODATION_LIST_PATH}?Region=${Region}&start=${start}&end=${end}&count=${count}`)
    }

    // event handler: 인기 지역 클릭 이벤트 핸들러 //
    const onClickSerchRegionChangeHandler = (text: string) => {
        navigator(`${ACCOMMODATION_LIST_PATH}?Region=${text}&start=${start}&end=${end}&count=${count}`)
    }

    const [openEndCalender, setEndOpenCalender] = useState<boolean>(false);
    const [openStartCalender, setStartOpenCalender] = useState<boolean>(false);

    // event handler: 종료날짜 입력 이벤트 핸들러 //
    const onEndClickHandler = () => {
        if (openEndCalender) {
            setEndOpenCalender(false);
            return
        }
        setEndOpenCalender(true);
    }

    // event handler: 종료날짜 입력 이벤트 핸들러 //
    const ontartClickHandler = () => {
        if (openStartCalender) {
            setStartOpenCalender(false);
            return
        }
        setStartOpenCalender(true);
    }




    return (
        <>
            <Topbar />
            <div id="main-wrapper" >
                <div className='main-detail' >
                    <div className='main-image'>
                        <img className='main-image-1' src={mainImages} alt="이제된다 ㅋㅋㅋ 개꿀" />
                        <div className='main-image-text'> {imagetext} </div>
                    </div>
                    <div className='main-search-bar'>
                        <div className='destination'>
                            <div className='word'>지역</div>
                            <input className='search' value={Region} onChange={onRegionChangeHandler} />
                        </div>
                        {/* <div className='check-in'>
                            <div className='word'>입실 날짜</div>
                            <input className='search' defaultValue={`${year}-${month}-${date}`} value={start} type='date' placeholder='입실 날짜를 입력하세요' onChange={onStartChangeHandler}/>
                        </div> */}
                        <div className='check-out'>
                            <div className='word'>입실 날짜</div>
                            <button className='calendar-button' onClick={ontartClickHandler} >
                                <div>{start}</div>
                            </button>
                            <div className='123' style={{ position: 'absolute', right: 0, top: '74px' }} >
                                {openStartCalender && <CalendarEnd />}
                            </div>
                        </div>
                        <div className='check-out'>
                            <div className='word'>퇴실 날짜</div>
                            <button className='calendar-button' onClick={onEndClickHandler} >
                                <div>{end}</div>
                            </button>
                            <div className='123' style={{ position: 'absolute', left: 0, top: '74px' }} >
                                {openEndCalender && <CalendarEnd />}
                            </div>
                        </div>
                        <div className='people'>
                            <div className='word'>인원</div>
                            <input className='search' defaultValue={'2'} value={count} onChange={onCountChangeHandler} />
                        </div>
                        <button className='search-button' onClick={onSerchButtonClick}>검색 하기</button>
                    </div>
                    <div className='image-slider'>
                        <ImageSlider6 title='국내 인기 여행지' imageContents={RegionImages} onClick={onClickSerchRegionChangeHandler} />
                    </div>
                    <div className='distimction-warpper'>
                        <div className='distimction-title'>여행 추천 숙소</div>
                        <div className='distimction-column'>
                            <DistimctionButton text='전체' activite={click === '' || click === '전체'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='호텔' activite={click === '' || click === '호텔'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='모텔' activite={click === '' || click === '모텔'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='학원' activite={click === '' || click === '학원'} onClick={onClickButtonHandler} />
                            <DistimctionButton text='아무거나' activite={click === '' || click === '아무거나'} onClick={onClickButtonHandler} />
                        </div>
                        <ImageSlider4 imageContents={proposeImages} />
                    </div>
                </div>
                <div className='last-warpper'></div>
            </div>
        </>
    )

}