import ResponseDto from "./response.dto";

export default interface HostLogInResponseDto extends ResponseDto {
    hostAccessToken: string;
    expiration: number;
}