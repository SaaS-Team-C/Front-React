// import React, { useState } from 'react';
// import './style.css';

// // Pagination 컴포넌트
// const Pagination: React.FC<{
//   totalItems: number;
//   itemsPerPage: number;
//   currentPage: number;
//   onPageChange: (page: number) => void;
// }> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   return (
//     <div className="pagination">
//       {Array.from({ length: totalPages }, (_, i) => (
//         <button
//           key={i}
//           className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
//           onClick={() => onPageChange(i + 1)}
//         >
//           {i + 1}
//         </button>
//       ))}
//     </div>
//   );
// };

// const List: React.FC = () => {
//   const accommodations = [
//     /* 기존 숙소 데이터 그대로 */
//   ];

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   // 현재 페이지에 보여줄 숙소 리스트
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const currentAccommodations = accommodations.slice(startIdx, startIdx + itemsPerPage);

//   return (
//     <div className="accommodation-list">
//       <p>{accommodations.length}개의 검색 결과가 있습니다.</p>
//       <div className="accommodation-cards">
//         {currentAccommodations.map((accommodation) => (
//           <div key={accommodation.id} className="accommodation-card">
//             <img src={accommodation.imageUrl} alt={accommodation.name} className="accommodation-image" />
//             <div className="accommodation-info">
//               <h3>{accommodation.name}</h3>
//               <p>{accommodation.location}</p>
//               <p>₩{accommodation.price.toLocaleString()} /박</p>
//               <p>Rating: {accommodation.rating}</p>
//               <button className="details-btn">상세보기</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination 컴포넌트 */}
//       <Pagination
//         totalItems={accommodations.length}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };

// export default List;
export default{};
