// interface: 회원가입 Reuqest Body Dto //

export default interface GuestSignUpRequestDto {
    guestName: string;
    guestId: string;
    guestPassword: string;
    telNumber: string;
    authNumber: string;
    snsId: string | null;
}