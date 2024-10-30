// interface: admin request dto //

export interface AdminRequestDTO {

    hostId: string;               // 호스트 아이디(pk)
    hostName: string;            // 호스트 이름
    accommodationName: string;   // 숙소 이름

     requestDate?: string; // Optional로 설정 (데이터베이스에서 가져올 수 없는 값이라)
     status?: string; // Optional로 설정 (데이터베이스에서 가져올 수 없는 값이라)


}
