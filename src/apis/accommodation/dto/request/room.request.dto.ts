// interface: room request dto //

export interface RoomDTO {
  name: string;
  type: string;
  checkInTime: string; // 기존 check_in_time 속성 이름 변경
  checkOutTime: string; // 기존 check_out_time 속성 이름 변경
  maxOccupancy: number; // 기존 max_occupancy 속성 이름 변경
  price: number;
  description: string;
  images: string[];
  }