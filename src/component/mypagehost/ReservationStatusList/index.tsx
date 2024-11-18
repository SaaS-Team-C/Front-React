import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { LsisuerImage } from 'src/resources/images/leisure';
import { hostIdCheckRequest } from 'src/apis/signUp';

export default function ReservationStatusList() {

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
        <div id='reservationstatus2-warpper'>
            <div className='reservationstatus2-box'>
                <div className='reservationstatus2-list-top-deatail'>
                    <div className='reservationstatus2-date'>{todaytext}</div>
                </div>
                <div className='reservationstatus2-list-main-detail'>
                    <img className='reservationstatus2-list-image' src={LsisuerImage[1]} onClick={onClickListComponent} />
                    <div className='reservationstatus2-hotel-detail'>
                        <div className='reservationstatus2-hotel-title'>제주신라호텔 서귀포점</div>
                        <div className='reservationstatus2-hotel-room'>DELUXE | Double Room</div>
                        <div className='reservationstatus2-hotel-roomId'>룸번호 : </div>
                    </div>
                    <div className='reservationstatus2-detail-list'>
                        <div className='reservationstatus2-stay'>몇박인지</div>
                        <div className='reservationstatus2-start-end-time'>
                            <div className='reservationstatus2-start'>입실시간:00:00</div>
                            <div className='reservationstatus2-end'>퇴실시간:00:00</div>
                        </div>
                        <div className='reservationstatus2-count'>인원:0</div>
                    </div>
                    <div className='reservationstatus2-guestinfo'>
                        <div className='reservationstatus2-guestinfo-name'>이름 : </div>
                        <div className='reservationstatus2-guestinfo-telnumber'>전화번호 : </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
