import { ResponseDto } from "src/apis/signUp/dto/response";

export default interface GetHostSignInResponseDto extends ResponseDto {
    hostId: string;
    hostPw: string;
    hostName: string;
    hostBusinessNumber: string;
    hostTelNumber: string;
    businessStartDay: string;
    businessImage: string;
    entryStatus: boolean;
}