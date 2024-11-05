import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './style.css';
import PaginationFuction from '../pagination';
import { AccommodationDTO } from 'src/apis/accommodation/dto/response/accommodation.response.dto';
import { fetchAccommodationList } from 'src/apis/accommodation';
import { ACCOMMODATION_LIST_DETAIL_PATH } from 'src/constants';
import { RoomDTO } from 'src/apis/accommodation/dto/request/room.request.dto';
import { RoomMinPriceDTO } from 'src/apis/accommodation/dto/request/room.minPrice.dto';

// interface: 메인 화면에서 검색 된 숙소 리스트 props //
interface ListProps {
  accommodations: AccommodationDTO[];
}

const List: React.FC<ListProps> = ({ accommodations }) => {

  // state: 숙소 리스트 불러오기 상태 관리 
  const [callAccommodationList, SetCallAccommodationList] = useState<AccommodationDTO[]>([]);

  // state: 페이지네이션을 위한 상태 관리 //
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // state: url 값 저장 //
  const [searchParams] = useSearchParams('');

  // state: 분류 상태 관리 (분류 옵션 기본값) //
  const [sortOption, setSortOption] = useState('추천순');

  // effect: 숙소 리스트 불러오기
  // useEffect(() => {
  // function: 받아온 숙소 리스트를 화면에 뿌려주는 함수
  // const getAccommodations = async () => {
  //   try {
  // fetchAccommodationList()는 서버에 요청을 보내 숙소 리스트를 받아오는 함수
  //       const data = await fetchAccommodationList();
  //       SetCallAccommodationList(data);
  //     } catch (error) {
  //       console.error('Error fetching accommodation list:', error);
  //     }
  //   };
  //   getAccommodations();
  // }, []);

  useEffect(() => {
    // mock data를 직접 설정하여 화면에 표시하는 방식
    const mockData: AccommodationDTO[] = [
      {
        accommodation_name: '해운대 호텔',
        accommodation_grade_sum: 8.5,
        category_area: '부산',
        category_pet: true,
        category_non_smoking_area: true,
        category_indoor_spa: false,
        category_dinner_party: true,
        category_wifi: true,
        category_car_park: true,
        category_pool: true,
        accommodation_main_image: 'https://example.com/image1.jpg',
        accommodation_address: '부산 해운대구 해운대해변로 1',
        accommodation_type: '호텔',
        review_grade: 4.2,
        roomMinPrice: [
          {
            roomPrice: 70000,
            roomName: "스위트룸"
          },
          {
            roomPrice: 150000,
            roomName: "더블룸"
          }
        ]
      },
      {
        accommodation_name: '웨스틴 조선',
        accommodation_grade_sum: 9.5,
        category_area: '서울',
        category_pet: false,
        category_non_smoking_area: true,
        category_indoor_spa: false,
        category_dinner_party: true,
        category_wifi: false,
        category_car_park: false,
        category_pool: true,
        accommodation_main_image: 'https://example.com/image1.jpg',
        accommodation_address: '서울 서면진구 소진이네 집 1',
        accommodation_type: '리조트',
        review_grade: 4.9,
        roomMinPrice: [
          {
            roomPrice: 100000,
             roomName: "트윈"
          },
          {
            roomPrice: 350000,
            roomName: "디럭스"
          }
        ]
      },
    ];

    SetCallAccommodationList(mockData);
  }, []);



  // function: url 값 가져오기 //
  const urlRegion = searchParams.get('Region')
  const urlStart = searchParams.get('start')
  const urlEnd = searchParams.get('end')
  const urlCount = searchParams.get('count')
  const urlName = searchParams.get('accommodationName')



  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 숙소 클릭 시 숙소 디테일 페이지로 이동하는 핸들러 //
  const handleDetailClick = (accommodationName: string) => {
    navigator(
      `${ACCOMMODATION_LIST_DETAIL_PATH}?Region=${urlRegion}&start=${urlStart}&end=${urlEnd}&count=${urlCount}&accommodationName=${encodeURIComponent(accommodationName)}`
    );
  };

  // event handler: 핸들러 //
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  // function: 분류 로직
  const sortedAccommodations = [...callAccommodationList].sort((a, b) => {
    const aMinPrice = Math.min(...a.roomMinPrice.map((room) => room.roomPrice));
    const bMinPrice = Math.min(...b.roomMinPrice.map((room) => room.roomPrice));

    if (sortOption === '평점 높은순') {
      return b.accommodation_grade_sum - a.accommodation_grade_sum;
    } else if (sortOption === '리뷰 많은순') {
      return b.review_grade - a.review_grade;
    } else if (sortOption === '낮은 가격순') {
      return aMinPrice - bMinPrice;
    } else if (sortOption === '높은 가격순') {
      return bMinPrice - aMinPrice;
    }
    return 0;
  });

  // 현재 페이지에 해당하는 숙소 리스트만 표시
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentAccommodations = sortedAccommodations.slice(startIdx, startIdx + itemsPerPage);

  // 북마크 상태 관리
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const handleBookmarkToggle = (accommodation_name: string) => {
    if (bookmarks.includes(accommodation_name)) {
      setBookmarks(bookmarks.filter(bookmarkedId => bookmarkedId !== accommodation_name));
    } else {
      setBookmarks([...bookmarks, accommodation_name]);
    }
  };

  // 각 숙소의 시설 정보를 문자열로 변환하는 함수
  const getFacilities = (accommodation: AccommodationDTO) => {
    const facilities = [];
    if (accommodation.category_pet) facilities.push('애완동물 허용');
    if (accommodation.category_non_smoking_area) facilities.push('금연 구역');
    if (accommodation.category_indoor_spa) facilities.push('실내 스파');
    if (accommodation.category_dinner_party) facilities.push('저녁 파티 가능');
    if (accommodation.category_wifi) facilities.push('와이파이');
    if (accommodation.category_car_park) facilities.push('주차 공간');
    if (accommodation.category_pool) facilities.push('수영장');

    return facilities.join(', ');
  };

  // 최저 가격 가져오는 함수
  const getLowestRoomPrice = (rooms: RoomMinPriceDTO[]): number => {
    return rooms.reduce((minPrice, room) => {
      return room.roomPrice < minPrice ? room.roomPrice : minPrice;
    }, rooms[0]?.roomPrice || 0);
  };


  return (
    <div className="accommodation-list">
      <div className="list-header">
        <p>{callAccommodationList.length}개의 검색 결과가 있습니다.</p>
        <div className="sort-dropdown">
          <label htmlFor="sortOptions">분류 기준:</label>
          <select
            id="sortOptions"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="추천순">추천순</option>
            <option value="평점 높은순">평점 높은순</option>
            <option value="리뷰 많은순">리뷰 많은순</option>
            <option value="낮은 가격순">낮은 가격순</option>
            <option value="높은 가격순">높은 가격순</option>
          </select>
        </div>
      </div>

      {/* 검색 결과가 없을 때 메시지를 표시 */}
      {currentAccommodations.length === 0 ? (
        <div className="no-results">
          <p>선택한 조건에 맞는 상품이 없어요.</p>
          <p>필터를 다시 설정해 보세요.</p>
        </div>
      ) : (
        <div className="accommodation-cards">
          {currentAccommodations.map((accommodation) => (
            <div key={accommodation.accommodation_name} className="accommodation-card">
              <div className="image-wrapper">
                <img src={accommodation.accommodation_main_image} alt={accommodation.accommodation_name} className="accommodation-image" />
                <div
                  className={`bookmark ${bookmarks.includes(accommodation.accommodation_name) ? 'active' : ''}`}
                  onClick={() => handleBookmarkToggle(accommodation.accommodation_name)}
                >
                  ♥
                </div>
              </div>
              <div className="accommodation-info">
                <h3>{accommodation.accommodation_name}</h3>
                <p>{accommodation.accommodation_type}</p>
                <p>{accommodation.accommodation_address}</p>

                {/* 최저 객실 가격 표시 */}
                <p>₩{getLowestRoomPrice(accommodation.roomMinPrice).toLocaleString()} /박</p>



                <p>Rating: {accommodation.accommodation_grade_sum}</p>
                <p>리뷰: {accommodation.review_grade}개</p> {/* ! 합계 구하는걸로 수정 필요 */}
                <p>Facilities: {getFacilities(accommodation)}</p>
                <button className="details-btn" onClick={() => handleDetailClick(accommodation.accommodation_name)}>
                  상세보기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination 컴포넌트 */}
      {currentAccommodations.length > 0 && (
        <PaginationFuction
          totalItems={accommodations.length} // 전체 숙소 개수
          itemsPerPage={itemsPerPage} // 페이지당 표시할 숙소 수
          currentPage={currentPage} // 현재 페이지
          onPageChange={handlePageChange} // 페이지 변경 핸들러
        />
      )}
    </div>
  );
};

export default List;
