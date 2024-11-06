// interface: 메인에서 숙소 검색 시 불러올 숙소 검색 리스트 dto//

export interface AccommodationSearchListDTO {

  accommodationName: string; 
  accommodationMainImage: string; 
  accommodationType: string; 
  accommodationGradeAverage: number;


  categoryArea: string; 
  categoryPet: boolean;
  categoryNonSmokingArea: boolean;
  categoryIndoorSpa: boolean;
  categoryDinnerParty: boolean;
  categoryWifi: boolean;
  categoryCarPark: boolean;
  categoryPool: boolean;

  applyStatus: boolean;

  minRoomPrice: number;
  countReview: number;

}

