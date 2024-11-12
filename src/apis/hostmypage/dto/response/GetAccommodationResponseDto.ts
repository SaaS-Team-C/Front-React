// interface: dto//
import { ResponseDto } from "src/apis/accommodation/dto/response";
import { Room } from "./Room";
import { UseInformation } from "./UseInformation";


export interface GetAccommodationResponseDto{
  accommodationName: string;
  accommodationMainImage: string;
  accSubImages: string[];
  accommodationAddress: string;
  accommodationType: string;
  accommodationIntroduce: string;
  useInformations: UseInformation[];
  roomList: Room[];
  categoryArea: string;
  categoryPet: boolean;
  categoryNonSmokingArea: boolean;
  categoryIndoorSpa: boolean;
  categoryDinnerParty: boolean;
  categoryWifi: boolean;
  categoryCarPark: boolean;
  categoryPool: boolean;

}


  