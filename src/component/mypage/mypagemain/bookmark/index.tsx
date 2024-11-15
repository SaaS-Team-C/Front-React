import React from 'react'

export default function index() {
  return (
    <div>index</div>
  )
}


// import { useState } from 'react'

// export default function BookMark() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 3; // 한 페이지에 표시할 항목 수


//     // 페이지 변경 핸들러
//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const totalItems = 40;  // 총 아이템 수 (예시로 5개로 설정)
//     const totalPages = Math.ceil(totalItems / itemsPerPage); // 페이지 수 계산

//     // 현재 페이지에 표시할 BookingList 컴포넌트 배열
//     const currentItems = Array(totalItems)
//         // .fill(<BookingList />)
//         .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     // 페이지 번호 배열 생성
//     const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);

//     return (
//         <>
//             {activite && (
//                 <div id="booking-wrapper">
//                     <div className="booking-title">
//                         <div className="booking-title-text">{titletext}</div>
//                         <div className="booking-title-box">
//                             <div className="information-title-detail-username">
//                                 '{username}'
//                             </div>
//                             <div className="booking-title-detail">님 반갑습니다.</div>
//                         </div>
//                     </div>
//                     <div className="booking-main">
//                         {currentItems}
//                     </div>
//                     <div className="pagination">
//                         {/* 이전 버튼 */}
//                         <button 
//                             className="page-arrow" 
//                             onClick={() => handlePageChange(currentPage - 1)} 
//                             disabled={currentPage === 1}
//                         >
//                             &lt;
//                         </button>

//                         {/* 페이지 번호 */}
//                         {pageNumbers.slice(0, 5).map((pageNum) => (
//                             <button
//                                 key={pageNum}
//                                 className={currentPage === pageNum ? 'active' : ''}
//                                 onClick={() => handlePageChange(pageNum)}
//                             >
//                                 {pageNum}
//                             </button>
//                         ))}

//                         {/* 다음 버튼 */}
//                         <button 
//                             className="page-arrow" 
//                             onClick={() => handlePageChange(currentPage + 1)} 
//                             disabled={currentPage === totalPages}
//                         >
//                             &gt;
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
