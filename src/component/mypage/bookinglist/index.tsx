import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { LsisuerImage } from 'src/resources/images/leisure';

export default function BookingList() {

    const today: Date = new Date();

    const todaytext: string = today.toString();

    const navigator = useNavigate();

    const [reviewWrite, setReviewWrite] = useState<boolean>(false);




    /** 
     * event handler: 클릭시 관련된 숙소 상세 페이지로 이동  
     * detail: 지금은 메인으로 이동하게 해놓음
     */
    const onClickListComponent = () => {
        navigator('/main')
    }

    const onClickReviewWriteHandler = () => {
        if (reviewWrite) {
            setReviewWrite(false)
            return;
        }
        setReviewWrite(true)
    }

    const onClickSubmissionHandler = () => {
            setReviewWrite(false)
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
                        <div className='bookinglist-count-reviewbox'>
                            <div className='bookinglist-count'>인원:0</div>
                            {!reviewWrite && <button className='bookinglist-reviewbox' onClick={onClickReviewWriteHandler}>리뷰하기</button>}
                        </div>
                    </div>
                </div>
            </div>
            
            {reviewWrite && <div className='reviewwrite-box'>
                <input className='reviewwrite-inputbox' type="text" />
                <div className='review-bottom-box'>
                    <div className='score-component'></div>
                    <div className='submission-button' onClick={onClickSubmissionHandler}>완료</div>
                </div>
            </div>}
        </div>
    )
}
