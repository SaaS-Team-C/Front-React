// interface: 회원가입 Reuqest Body Dto //

export default interface GuestSignUpRequestDto {
    guestId: string;
    guestPassword: string;
    guestName: string;
    telNumber: string;
    joinPath: string;
}