import "./style.css";
import React, { useEffect } from 'react';
import List from "../../component/accomodation/list";
import Topbar from "src/component/topbar";
import Filter from "src/component/accomodation/filter";
  

const AccommodationList: React.FC = () => {

    // effect: 숙소 데이터 불러오기
    useEffect(() => {
      // 데이터 요청 로직 만들어서 넣기
      // e.g) setAccommodations(fetchedData);
    }, []);


  return (
    <div className="AccommodationList">
      <div className="app-container">
        <Topbar />
        <div className="content-container">
          <Filter />
          <List accommodations={[]}/> 
        </div>
      </div>
    </div>
  );
};

export default AccommodationList;
