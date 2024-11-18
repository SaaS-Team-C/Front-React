import { ResponseDto } from "src/apis/guestmypage";


export default interface HostLogInResponseDto extends ResponseDto {
    hostAccessToken: string;
    expiration: number;
}