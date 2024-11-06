import React from 'react'
import './style.css';
import MapFilter from './mapfilter';
import Sidebar from './sidebarfilter';

export default function Filter() {
  return (
    <div id='filter-wrapper'>
        <MapFilter/>
        <Sidebar priceRange={{
              min: 0,
              max: 0
          }} setPriceRange={function (range: { min: number; max: number; }): void {
              throw new Error('Function not implemented.');
          } } reviewScore={[]} setReviewScore={function (scores: boolean[]): void {
              throw new Error('Function not implemented.');
          } } accommodationType={[]} setAccommodationType={function (types: boolean[]): void {
              throw new Error('Function not implemented.');
          } } facilities={[]} setFacilities={function (facilities: boolean[]): void {
              throw new Error('Function not implemented.');
          } } />
    </div>
  )
}
