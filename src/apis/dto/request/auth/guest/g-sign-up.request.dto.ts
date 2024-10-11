// interface: 회원가입 Reuqest Body Dto //

export default interface SignUpRequestDto {
    guestName: string;
    guestId: string;
    guestPassword: string;
    guestTelNumber: string;
    guestAuthNumber: string;
    joinPath: string;
    snsId: string | null;
}