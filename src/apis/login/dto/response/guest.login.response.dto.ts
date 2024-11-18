import ResponseDto from "./response.dto";

export default interface GuestLogInResponseDto extends ResponseDto {
    guestAccessToken: string;
    expiration: number;
}