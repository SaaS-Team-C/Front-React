import React, { useState } from 'react'
import "./style.css"
import Topbar from 'src/component/topbar'
import MypageCatalogButton from 'src/component/mypage/mypagecatalogbutton';
import Information from 'src/component/mypage/mypagemain/information';
import { Userinformation } from 'src/resources/userinfromation';



export default function GuestMypage() {

    const datail1 = "내정보관리"
    const datail2 = "예약내역"
    const datail3 = "즐겨찾기"

    const [click, setClick] = useState<string>(datail1)

    // event handler: 분류 버튼 클릭 이벤트 핸들러 //
    const onClickButtonHandler = (distimction: string) => {
        setClick(distimction);
    }

    const testValue = true ;




  return (
    <>
    <Topbar/>
    {<div id='mypage-wrapper'>
        {testValue && <div className='guestMypage-side-bar'>
            <MypageCatalogButton text={datail1} activite={click === datail1 || click === ''} onClick={onClickButtonHandler} />
            <MypageCatalogButton text={datail2} activite={click === datail2 || click === ''} onClick={onClickButtonHandler} />
            <MypageCatalogButton text={datail3} activite={click === datail3 || click === ''} onClick={onClickButtonHandler} />
            </div>}
        {!testValue && <div className='hostMypage-side-bar'></div>}
        {testValue && <div className='guestMypage-main'>
                <Information activite={click === datail1 || click === ''} titletext={datail1} username={'옥진서'} />
                <Information activite={click === datail2 || click === ''} titletext={datail2} username={'옥진서'} />
                <Information activite={click === datail3 || click === ''} titletext={datail3} username={'옥진서'} />
            </div>}
        {!testValue && <div className='hosttMypage-main'></div>}
    </div>}
    </>
  )
}
