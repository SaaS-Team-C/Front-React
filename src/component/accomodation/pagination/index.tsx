import React, { useState, useEffect } from "react";
import './style.css'

// 숙소 데이터를 정의
interface Accommodation {
  id: number;
  name: string;
  price: number;
}

const AccommodationListPagination = () => {
  // 전체 숙소 데이터를 관리하는 상태
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);

  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // 한 페이지에 보여줄 숙소 수

  // 가정: 여기서 모든 데이터를 한 번에 받아온다고 가정
  useEffect(() => {
    // 여기서는 서버에서 받아온 전체 데이터를 미리 설정하는 과정
    const fetchedData = [
      { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },
      // { id: 1, name: "호텔 A", price: 100 },
      // { id: 2, name: "호텔 B", price: 200 },

    ];
    setAccommodations(fetchedData);
  }, []);

  // 현재 페이지에 보여줄 숙소 데이터만 자르기
  const indexOfLastAccommodation = currentPage * resultsPerPage;
  const indexOfFirstAccommodation = indexOfLastAccommodation - resultsPerPage;
  const currentAccommodations = accommodations.slice(indexOfFirstAccommodation, indexOfLastAccommodation);

  // 페이지 변경 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션 버튼 만들기
  const totalPages = Math.ceil(accommodations.length / resultsPerPage);

  return (
    <div>
      {/* 숙소 리스트를 현재 페이지에 맞게 보여줌 */}
      <div className="ul">
        {currentAccommodations.map(accommodation => (
          <div className="li" key={accommodation.id}>
            {accommodation.name} - ${accommodation.price}
          </div>
        ))}
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="pagination-button-box">
        {Array.from({ length: totalPages }, (_, index) => (
          <button className="pagination-button"
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccommodationListPagination;
