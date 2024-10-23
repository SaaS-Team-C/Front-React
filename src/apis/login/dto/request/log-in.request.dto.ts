// interface: 로그인 Request Body Dto //
export default interface LogInRequestDto {
    id: string; // 게스트 또는 호스트 ID (guestId 또는 hostId 모두 대응)
    password: string;
    userType: 'guest' | 'host'; // 사용자를 구분하기 위한 필드
}