import React from 'react'
import Topbar from 'src/component/mainpage/topbar'
import MypageSidebar from 'src/component/mypage/mypagesidebar'

export default function Mypage () {
 



    return (
    <div id='mypage-wrapper'>
        <Topbar />
        <div>
            <MypageSidebar />
        </div>
    </div>
  )
}
