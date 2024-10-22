// interface: 로그인 Request Body Dto //
export default interface SignInRequestDto {
    id: string; // guestId 또는 hostId를 통합해서 string으로 처리
    password: string;
    userType: 'guest' | 'host'; // 사용자를 구분하기 위한 필드
}