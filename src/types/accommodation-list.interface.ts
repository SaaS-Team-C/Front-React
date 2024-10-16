export default interface AccommodationListType {
  accommodationName: string;
  accommodationMainImage: string;
  accommodationAddress: string;
  accommodationType: string;
  accommodationScoreSum: number;

  categoryPet: boolean;
  categoryNonSmokingArea: boolean;
  categoryIndoorSpa: boolean;
  categoryDinnerParty: boolean;
  categoryWifi: boolean;
  categoryCarPark: boolean;
  categoryPool: boolean;
}
