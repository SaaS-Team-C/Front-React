import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { LsisuerImage } from 'src/resources/images/leisure';

export default function BookingList() {

    const today: Date = new Date();

    const todaytext: string = today.toString();

    const navigator = useNavigate();






    /** 
     * event handler: 클릭시 관련된 숙소 상세 페이지로 이동  
     * detail: 지금은 메인으로 이동하게 해놓음
     */
    const onClickListComponent = () => {
        navigator('/main')
    }





    return (
        <div id='bookinglist-warpper'>
            <div className='bookinglist-box'>
            <div className='bookinglist-list-top-deatail'>
                <div className='bookinglist-date'>{todaytext}</div>
                <div className='bookinglist-bill'>200.000원</div>
            </div>
            <div className='bookinglist-list-main-detail'>
                <img className='bookinglist-list-image' src={LsisuerImage[1]} onClick={onClickListComponent} />
                <div className='bookinglist-hotel-detail'>
                    <div className='bookinglist-hotel-title'>제주신라호텔 서귀포점</div>
                    <div className='bookinglist-hotel-room'>DELUXE | Double Room</div>
                </div>
                <div className='bookinglist-detail-list'>
                    <div className='bookinglist-stay'>몇박인지</div>
                    <div className='bookinglist-start-end-time'>
                        <div className='bookinglist-start'>입실시간:00:00</div>
                        <div className='bookinglist-end'>퇴실시간:00:00</div>
                    </div>
                    <div className='bookinglist-count-cancelbox'>
                        <div className='bookinglist-count'>인원:0</div>
                        <button className='bookinglist-cancelbox'>취소하기</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
