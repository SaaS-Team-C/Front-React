// interface: 회원가입 Reuqest Body Dto //

export default interface HostSignUpRequestDto {
    hostId: string;
    hostPassword: string;
    hostName: string;
    businessName: string;
    businessStartDay: Date | null;
    businessNumber: string;
    telNumber: string;
}