// interface: 회원가입 Reuqest Body Dto //

export default interface GuestSignUpRequestDto {
    name: string;
    guestId: string;
    password: string;
    guestTelNumber: string;
    authNumber: string;
    snsId: string | null;
}