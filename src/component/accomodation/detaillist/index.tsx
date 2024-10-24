import React from 'react'
import AccommodationDetailTop from './top'
import AccommodationDetailMiddle from './middle'
import Topbar from 'src/component/topbar'
import ReviewList from './bottom'

export default function DetailList() {
  return (
    <div>
      <Topbar/>
      <AccommodationDetailTop />
      <AccommodationDetailMiddle />
      <ReviewList/>
    </div>
  )
}
