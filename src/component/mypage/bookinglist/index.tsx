import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { LsisuerImage } from 'src/resources/images/leisure';
import onStar from './image/onstar.png';
import disableStar from './image/disablestar.png';

export default function BookingList() {

    const today: Date = new Date();

    const todaytext: string = today.toString();

    const navigator = useNavigate();

    const [reviewWrite, setReviewWrite] = useState<boolean>(false);

    const [reviewOne, setReviewOne] = useState<boolean>(false);
    const [reviewTwo, setReviewTwo] = useState<boolean>(false);
    const [reviewThree, setReviewThree] = useState<boolean>(false);
    const [reviewfour, setReviewFour] = useState<boolean>(false);
    const [reviewfive, setReviewFive] = useState<boolean>(false);




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

    // event handler : 평점 클릭 핸들러 //
    const onClickOneOnStar = () => {
        setReviewOne(false)
        setReviewTwo(false)
        setReviewThree(false)
        setReviewFour(false)
        setReviewFive(false)
    }
    const onClickTwoOnStar = () => {
        setReviewTwo(false)
        setReviewThree(false)
        setReviewFour(false)
        setReviewFive(false)
    }
    const onClickThreeOnStar = () => {
        setReviewThree(false)
        setReviewFour(false)
        setReviewFive(false)
    }
    const onClickFourOnStar = () => {
        setReviewFour(false)
        setReviewFive(false)
    }
    const onClickFiveOnStar = () => {
        setReviewFive(false)
    }

    const onClickOneDisabeStar = () => {
        setReviewOne(true)
    }
    const onClickTwoDisabeStar = () => {
        setReviewOne(true)
        setReviewTwo(true)
    }
    const onClickThreeDisabeStar = () => {
        setReviewOne(true)
        setReviewTwo(true)
        setReviewThree(true)
    }
    const onClickFourDisabeStar = () => {
        setReviewOne(true)
        setReviewTwo(true)
        setReviewThree(true)
        setReviewFour(true)
    }
    const onClickFiveDisabeStar = () => {
        setReviewOne(true)
        setReviewTwo(true)
        setReviewThree(true)
        setReviewFour(true)
        setReviewFive(true)
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
                    <div className='score-component'>
                        {reviewOne && <img className='star-icon' src={onStar} alt="" onClick={onClickOneOnStar}/>} {!reviewOne && <img className='star-icon' src={disableStar} alt="" onClick={onClickOneDisabeStar}/>}
                        {reviewTwo && <img className='star-icon' src={onStar} alt="" onClick={onClickTwoOnStar}/>} {!reviewTwo && <img className='star-icon' src={disableStar} alt="" onClick={onClickTwoDisabeStar}/>}
                        {reviewThree && <img className='star-icon' src={onStar} alt="" onClick={onClickThreeOnStar}/>} {!reviewThree && <img className='star-icon' src={disableStar} alt="" onClick={onClickThreeDisabeStar}/>}
                        {reviewfour && <img className='star-icon' src={onStar} alt="" onClick={onClickFourOnStar}/>} {!reviewfour && <img className='star-icon' src={disableStar} alt="" onClick={onClickFourDisabeStar}/>}
                        {reviewfive && <img className='star-icon' src={onStar} alt="" onClick={onClickFiveOnStar}/>} {!reviewfive && <img className='star-icon' src={disableStar} alt="" onClick={onClickFiveDisabeStar}/>}
                    </div>
                    <div className='submission-button' onClick={onClickSubmissionHandler}>완료</div>
                </div>
            </div>}
        </div>
    )
}
