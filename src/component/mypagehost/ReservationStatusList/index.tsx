import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { LsisuerImage } from 'src/resources/images/leisure';

export default function HostList() {

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
        <div id='hostlist-warpper'>
            <div className='hostlist-box'>
                <div className='hostlist-list-top-deatail'>
                    <div className='hostlist-date'>{todaytext}</div>
                </div>
                <div className='hostlist-list-main-detail'>
                    <img className='hostlist-list-image' src={LsisuerImage[1]} onClick={onClickListComponent} />
                    <div className='hostlist-hotel-detail'>
                        <div className='hostlist-hotel-title'>제주신라호텔 서귀포점</div>
                        <div className='hostlist-hotel-room'>DELUXE | Double Room</div>
                    </div>
                    <div className='hostlist-detail-list'>
                        <div className='hostlist-stay'>몇박인지</div>
                        <div className='hostlist-start-end-time'>
                            <div className='hostlist-start'>입실시간:00:00</div>
                            <div className='hostlist-end'>퇴실시간:00:00</div>
                        </div>
                        <div className='hostlist-count-reviewbox'>
                            <div className='hostlist-count'>인원:0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
