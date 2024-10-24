import { ResponseDto } from "src/apis/signUp/dto/response";

export default interface LogInResponseDto extends ResponseDto {
    accessToken: string;
    expiration: number;
}
