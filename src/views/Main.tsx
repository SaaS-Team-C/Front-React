import './style.css';

import { useNavigate, useParams } from 'react-router';
import { regionImages } from 'src/resources/images/region';


import Topbar from 'src/component/topbar';
import ImageSlider6 from 'src/component/ImageSlider6';
import ImageSlider4 from 'src/component/imageSlider4';
import DistimctionButton from 'src/component/distinctionbutton';
import { mainImages } from 'src/resources/images/main';
import { ACCOMMODATION_LIST_PATH } from 'src/constants';
import { proposeImages } from 'src/resources/images/propose';
import { ChangeEvent, useState } from 'react';
import { StructuredType } from 'typescript';


// component: 메인페이지 화면 컴포턴트 //
export default function Main() {


    const today: Date = new Date();
    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1 ;
    const date: number = today.getDate();

    // function: 네비게이터 함수 //
    const navigator = useNavigate();

    const [click, setClick] = useState<string>('전체');

    const [regon, setRegon] = useState<string>('');
    const [start, setStart] = useState<string>(`${year}-${month}-${date}`);
    const [end, setEnd] = useState<string>(`${year}-${month}-${date+1}`);
    const [count, setCount] = useState<string>('2');

    const imagetext = '여행은 역시 Roomly.'



    const onClickButtonHandler = (distimction: string) => {
        setClick(distimction);
    }
    
    const onRegonChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } =event.target;
        setRegon(value);
    }
    const onStartChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } =event.target;
        setStart(value);
    }
    const onEndChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } =event.target;
        setEnd(value);
    }
    const onCountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } =event.target;
        setCount(value);
    }

    const onSerchButtonClick = () => {
        if (!regon) {
            alert('지역을 입력해 주세요!');
            return;
        };
        if (!start || !end){
            alert('날짜를 입력해 주세요!');
            return;
        };
        if (!count) {
            alert('인원수를 입력해 주세요!')
            return
        };
        navigator(`${ACCOMMODATION_LIST_PATH}?${regon}&${start}&${end}&${count}`)
    }

    const onClickSerchRegonChangeHandler = (text:string) => {
        navigator(`${ACCOMMODATION_LIST_PATH}?${text}&${start}&${end}&${count}`)
    }



    return (
        <>
            <Topbar />
            <div id="main-wrapper" >
                <div className='main-detail' >
                    <div className='main-image'>
                        <img className='main-image-1' src={mainImages} alt="이제된다 ㅋㅋㅋ 개꿀"/>
                        <div className='main-image-text'> {imagetext} </div>
                    </div>
                    <div className='main-search-bar'>
                        <div className='destination'>
                            <div className='word'>지역</div>
                            <input className='search' value={regon} onChange={onRegonChangeHandler} />
                        </div>
                        <div className='check-in'>
                            <div className='word'>입실 날짜</div>
                            <input className='search' defaultValue={`${year}-${month}-${date}`} value={start} type='date' placeholder='입실 날짜를 입력하세요' onChange={onStartChangeHandler}/>
                        </div>
                        <div className='check-out'>
                            <div className='word'>퇴실 날짜</div>
                            <input className='search' defaultValue={`${year}-${month}-${date+1}`} value={end} type='date' placeholder='퇴실 날짜를 입력하세요' onChange={onEndChangeHandler}/>
                        </div>
                        <div className='people'>
                            <div className='word'>인원</div>
                            <input className='search' defaultValue={'2'} value={count} onChange={onCountChangeHandler}/>
                        </div>
                        <button className='search-button' onClick={onSerchButtonClick}>검색 하기</button>
                    </div>
                    <div className='image-slider'>
                        <ImageSlider6 title='국내 인기 여행지' imageContents={regionImages} onClick={onClickSerchRegonChangeHandler} />
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