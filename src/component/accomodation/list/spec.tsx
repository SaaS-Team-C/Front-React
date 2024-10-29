import React, { useEffect, useState } from 'react';
import { fetchAccommodationList } from 'src/apis/accommodation';

import { AccommodationDTO } from 'src/apis/accommodation/dto/response/accommodation.response.dto';


const AccommodationList: React.FC = () => {

  // **useState([])**는 컴포넌트가 화면에 표시할 기본 데이터 상태를 정하는 역할
  // accommodatio/ns는 숙소 데이터를 저장하는 공간
  // setAccommodations는 이 accommodations에 새 데이터를 저장하거나 업데이트하는 도구
  const [accommodations, setAccommodations] = useState<AccommodationDTO[]>([]);


  //페이지가 처음 로드될 때 useEffect 안에 있는 코드가 실행되면서 서버에 데이터를 요청하게 된다.
  useEffect(() => {
    // 서버에서 숙소 데이터를 가져오는 함수
    const getAccommodations = async () => {
      try {
        // fetchAccommodationList()는 서버에 요청을 보내 숙소 리스트를 받아오는 함수
        const data = await fetchAccommodationList();
        // setAccommodations(data);
      } catch (error) {
        console.error('Error fetching accommodation list:', error);
      }
    };
    getAccommodations();
  }, []);

  return (
    <div>
      {accommodations.map((accommodation) => (
        <div key={accommodation.accommodation_name}>
          <h2>{accommodation.accommodation_name}</h2>
          <p>Price: {accommodation.room_price}</p>
          <p>Type: {accommodation.accommodation_type}</p>
          {/* 기타 정보 */}
        </div>
      ))}
    </div>
  );
};

export default AccommodationList;
