// import axios, { AxiosResponse } from "axios";

// import LogInRequestDto from "./dto/request/log-in.request.dto";

// // variable: API URL 상수 //
// const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

// const AUTH_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/v1/auth`;
// const LOG_IN_API_URL = `${AUTH_MODULE_URL}/log-in`;

// // function : Authorization Bearer 헤더 //
// const bearerAuthorization = (accessToken: string) => ({
//   headers: { Authorization: `Bearer ${accessToken}` },
// });

// // function : response data 처리 함수 //
// const responseDataHandler = <T>(response: AxiosResponse<T>) => {
//   const { data } = response;
//   return data;
// };

// // function : Response Error 처리 함수 //
// const responseErrorHandler = (error: any) => {
//   if (!error.response) return null;
//   const { data } = error.response;
//   return data as ResponseDto;
// };

// // function : sign in 요청 함수 //
// export const signInRequest = async (requestBody: LogInRequestDto) => {
//   try {
//     const response = await axios.post(LOG_IN_API_URL, requestBody);
//     return responseDataHandler<ResponseDto>(response);
//   } catch (error) {
//     return responseErrorHandler(error);
//   }
// };

export{}