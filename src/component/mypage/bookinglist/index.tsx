import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'
import { LsisuerImage } from 'src/resources/images/leisure';
import onStar from './onstar.png'
import disableStar from './disablestar.png'
import { GUEST_ACCESS_TOKEN } from 'src/constants';
import { SignInUser } from 'src/stores';
import { useCookies } from 'react-cookie';
// import { getReservationListRequest } from 'src/apis';
import { ResponseDto } from "src/apis/accommodation/dto/response";
import { GetReservationListResponseDto } from 'src/apis/guestmypage/dto/response/ReservationList.response.dto';

export default function BookingList() {

    const today: Date = new Date();

    const todaytext: string = today.toString();

    const navigator = useNavigate();

    const {signInUser} = SignInUser();

    const [reviewWrite, setReviewWrite] = useState<boolean>(false);

    const [scoreOne, setScoreOne] = useState<boolean>(false);
    const [scoreTwo, setScoreTwo] = useState<boolean>(false);
    const [scoreThree, setScoreThree] = useState<boolean>(false);
    const [scoreFour, setScoreFour] = useState<boolean>(false);
    const [scoreFive, setScoreFive] = useState<boolean>(false);
    const [userId, setUserID] = useState<string>('');

    const [accommodations, setAccommodations] = useState([]);
    const [reservationList, setReservationList] = useState<string[]>([]);

    useEffect(() => {
        if (!signInUser) return;
        setUserID(signInUser.guestId)
    }, [signInUser])


    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const guestAccessToken = cookies[GUEST_ACCESS_TOKEN];
      
        // if (guestAccessToken) getReservationListRequest(userId, guestAccessToken).then(getReservationListResponse);
      }, [cookies[GUEST_ACCESS_TOKEN]])

    const getReservationListResponse = (responseBody: GetReservationListResponseDto | ResponseDto | null ) => {
        const isSuccessde = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessde) return ;
        const {
            CreatedAt,
            ReservationId,
            AccommodationMainImage,
            AccommodationName,
            RoomName,
            RoomCheckIn,
            RoomCheckOut,
            ReservationTotalPeople,
            TotalPrice,
            TotalNight
        } = responseBody as GetReservationListResponseDto
    }


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

    const onClickOneOnStar = () => {
        setScoreTwo(false)
        setScoreThree(false)
        setScoreFour(false)
        setScoreFive(false)
    }
    const onClickTwoOnStar = () => {
        setScoreThree(false)
        setScoreFour(false)
        setScoreFive(false)
    }
    const onClickThreeOnStar = () => {
        setScoreFour(false)
        setScoreFive(false)
    }
    const onClickFourOnStar = () => {
        setScoreFive(false)
    }

    const onClickOneDisabeStar = () => {
        setScoreOne(true)
    }
    const onClickTwoDisabeStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
    }
    const onClickThreeDisabeStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
        setScoreThree(true)
    }
    const onClickFourDisabeStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
        setScoreThree(true)
        setScoreFour(true)
    }
    const onClickFiveDisabeStar = () => {
        setScoreOne(true)
        setScoreTwo(true)
        setScoreThree(true)
        setScoreFour(true)
        setScoreFive(true)
    }

    return (
        <div id='bookinglist-warpper'>
            <div className='bookinglist-box'>
                <div className='bookinglist-list-top-deatail'>
                    <div className='bookinglist-date'>{accommodations}</div>
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
                        {scoreOne && <img className='star-icon' src={onStar} alt="" onClick={onClickOneOnStar}/>} {!scoreOne && <img className='star-icon' src={disableStar} alt="" onClick={onClickOneDisabeStar}/>}
                        {scoreTwo && <img className='star-icon' src={onStar} alt="" onClick={onClickTwoOnStar}/>} {!scoreTwo && <img className='star-icon' src={disableStar} alt="" onClick={onClickTwoDisabeStar}/>}
                        {scoreThree && <img className='star-icon' src={onStar} alt="" onClick={onClickThreeOnStar}/>} {!scoreThree && <img className='star-icon' src={disableStar} alt="" onClick={onClickThreeDisabeStar}/>}
                        {scoreFour && <img className='star-icon' src={onStar} alt="" onClick={onClickFourOnStar}/>} {!scoreFour && <img className='star-icon' src={disableStar} alt="" onClick={onClickFourDisabeStar}/>}
                        {scoreFive && <img className='star-icon' src={onStar} alt=""/>} {!scoreFive && <img className='star-icon' src={disableStar} alt="" onClick={onClickFiveDisabeStar}/>}
                        </div>
                    <div className='score-component'></div>
                    <div className='submission-button' onClick={onClickSubmissionHandler}>완료</div>
                </div>
            </div>}
        </div>
    )
}
