// interface: 회원가입 Reuqest Body Dto //

export default interface SignUpRequestDto {
    hostName: string;
    hostId: string;
    hostPassword: string;
    hostTelNumber: string;
    hostAuthNumber: string;
    hostBusinessImage: string;
    hostBusinessNumber: string;
}