// interface: admin request dto //

export interface AdminRequestDTO {
  hostId: string; // 호스트 아이디(pk)
  hostName: string; // 호스트 이름
  accommodationName: string; // 숙소 이름
  status: 'pending' | 'approved'; // 승인 상태
}
