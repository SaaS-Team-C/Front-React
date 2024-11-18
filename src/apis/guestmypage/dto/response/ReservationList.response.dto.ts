import { ResponseDto } from "src/apis/accommodation/dto/response";

export interface GetReservationListResponseDto extends ResponseDto{
    CreatedAt: string ;
    ReservationId: number ;
    AccommodationMainImage: string ;
    AccommodationName: string ;
    RoomName: string ;
    RoomCheckIn: string ;
    RoomCheckOut: string ;
    ReservationTotalPeople: string ;
    TotalPrice: number ;
    TotalNight: number ;
}