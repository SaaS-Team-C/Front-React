import Room from "src/apis/hostmypage/dto/response/Room";
import { UseInformation } from "src/apis/hostmypage/dto/response/UseInformation";

export interface PostAccommodationRequestDto{
    accommodationName: string; 
    accommodationMainImage: string; 
    accommodationImages:string[];
    accommodationType: string; 
    accommodationAddress: string;
    categoryArea: string; 
    categoryPet: boolean;
    categoryNonSmokingArea: boolean;
    categoryIndoorSpa: boolean;
    categoryDinnerParty: boolean;
    categoryWifi: boolean;
    categoryCarPark: boolean;
    categoryPool: boolean;
    applyStatus: boolean;
    entryTime: string;
    useInformations:UseInformation[];
    rooms:Room[]
    roomImages:string[];
    
}