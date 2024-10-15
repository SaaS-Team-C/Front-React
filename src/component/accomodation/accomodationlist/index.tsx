import { useState } from "react";
import './style.css';

// state: sort 상태 값 저장하는 상태 // 
function SortDropdown() {
    const [sortOption, setSortOption] = useState('price-asc');
  
  // function: 정렬 방법이 변경될 때 호출되는 함수 //
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  }

  // render: dropdown menu 렌더링 화면 //
  return (
    <div id="dropdownmenu">
      <label htmlFor="sort"></label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="price-asc">가격 낮은 순</option>
        <option value="price-desc">가격 높은 순</option>
        <option value="rating-asc">평점 낮은 순</option>
        <option value="rating-desc">평점 높은 순</option>
      </select>
    </div>
  );
}


export default SortDropdown;

