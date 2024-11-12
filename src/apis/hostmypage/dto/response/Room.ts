// room dto //

export interface Room {
  roomId: number;
  roomName: string;
  roomMainImage: string;
  roomPrice: number;
  roomCheckIn: string;
  roomCheckOut: string;
  roomInfo: string;
  roomImages: string[];
  
  // 삭제 여쭤보기 //
  roomTotalGuest: number;
}
