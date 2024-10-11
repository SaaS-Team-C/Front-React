import { useNavigate } from 'react-router';
import './style.css';
import { ChangeEvent, useRef, useState } from 'react';
import Topbar from '../component/topbar';



// component: 메인페이지 화면 컴포턴트 //
export default function Main() {
    


    // function: 네비게이터 함수 //
    const navigator = useNavigate();


    return (
        <div id="main-wrapper">
            <Topbar/>
            <div className='main-top'>
                <div className='main-image'></div>
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
                    <button className='search-button' />
                </div>
            </div>
        </div>
    )

}