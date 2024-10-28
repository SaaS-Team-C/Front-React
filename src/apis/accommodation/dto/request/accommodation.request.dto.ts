// interface: 메인에서 숙소 검색 시 불러올 숙소 검색 리스트 dto//

export interface AccommodationDTO {

    // pk = name
    accommodation_name: string;
    room_price: number; // room 테이블에서 데이터 불러와야 함
    accommodation_grade_sum: number; // 숙소 평점 합
    // reviewCount: number;

    // facilities //
    category_area: string; // 지역 카테고리 빼라고 했는데 mysql 테이블에 있길래 일단 넣어둠
    category_pet: boolean; 
    category_non_smoking_area: boolean; 
    category_indoor_spa: boolean;
    category_dinner_party: boolean;
    category_wifi: boolean;
    category_car_park: boolean;
    category_pool: boolean;
    
    accommodation_main_image: string;
    accommodation_address: string;
    accommodation_type: string;


  }
  