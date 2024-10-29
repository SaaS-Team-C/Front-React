import React, { useState } from 'react'
import "./style.css"
import Topbar from 'src/component/topbar'
import MypageCatalogButton from 'src/component/mypage/mypagecatalogbutton';
import Information from 'src/component/mypage/mypagemain/information';



export default function GuestMypage() {

    const [click, setClick] = useState<string>("내정보관리")

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
            <MypageCatalogButton text='내정보관리' activite={click === '내정보관리' || click === ''} onClick={onClickButtonHandler} />
            <MypageCatalogButton text='예약내역' activite={click === '예약내역' || click === ''} onClick={onClickButtonHandler} />
            <MypageCatalogButton text='즐겨찾기' activite={click === '즐겨찾기' || click === ''} onClick={onClickButtonHandler} />
            </div>}
        {!testValue && <div className='hostMypage-side-bar'></div>}
        {testValue && <div className='guestMypage-main'>
                <Information />
            </div>}
        {!testValue && <div className='hosttMypage-main'></div>}
    </div>}
    </>
  )
}
