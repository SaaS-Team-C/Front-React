import ResponseDto from "../../response.dto";

export default interface LogInResponseDto extends ResponseDto {
    accessToken: string;
    expiration: number;
}