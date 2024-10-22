import axios, { AxiosResponse } from "axios";

import { ResponseDto } from "./dto/response";
import { SearchedAccommodationRequestDto } from "./dto/request/accommodation";

import GuestSignUpRequestDto from "./dto/request/auth/guest/g-sign-up.request.dto";
import HostSignUpRequestDto from "./dto/request/auth/host/h-sign-up.request.dto";

import GuestIdCheckRequestDto from "./dto/request/auth/guest/g-id-check.requst.dto";
import HostIdCheckRequestDto from "./dto/request/auth/host/h-id-check.requst.dto";
import { SignInResponseDto } from "./dto/response/auth";
import TelAuthCheckRequestDto from "./dto/request/auth/tel-auth-check.request.dto";
import TelAuthRequestDto from "./dto/request/auth/tel-auth.request.dto";
import SignInRequestDto from "./dto/request/auth/sign-in-request.dto";
import { LogInResponseDto } from "./dto/response/auth/login";
import { LogInRequestDto } from "./dto/request/auth/login";

// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

const GET_SERCHED_ACCOMMODATION_LIST_API_URL = `${ROOMLY_API_DOMAIN}/api/v1/accommodationName`;

const AUTH_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/v1/auth`;
const GUEST_ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check-guest`;
const HOST_ID_CHECK_API_URL = `${AUTH_MODULE_URL}/id-check-host`;
const TEL_AUTH_API_URL = `${AUTH_MODULE_URL}/tel-auth`;
const TEL_AUTH_CHECK_API_URL = `${AUTH_MODULE_URL}/tel-auth-check`;
const GUEST_SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up-guest`;
const HOST_SIGN_UP_API_URL = `${AUTH_MODULE_URL}/sign-up-host`;
const SIGN_IN_API_URL = `${AUTH_MODULE_URL}/sign-in`;

// function : Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({
  headers: { Authorization: `Bearer ${accessToken}` },
});

// ! 중복되는 성공에 대한 함수를 따로 만들었음.
// function : response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
  const { data } = response;
  return data;
};

//! 중복되는 error에 대한 함수를 따로 만들었음.
// function : Response Error 처리 함수 //
const responseErrorHandler = (error: any) => {
  if (!error.response) return null;
  const { data } = error.response;
  return data as ResponseDto;
};

// function : guest id check api 요청함수 //
export const guestIdCheckRequest = async (
  requestBody: GuestIdCheckRequestDto
) => {
  const responseBody = await axios
    .post(GUEST_ID_CHECK_API_URL, requestBody)
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function : host id check api 요청함수 //
export const hostIdCheckRequest = async (
  requestBody: HostIdCheckRequestDto
) => {
  const responseBody = await axios
    .post(HOST_ID_CHECK_API_URL, requestBody)
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function : tel auth api 요청 함수 //
export const telAuthRequest = async (requestBody: TelAuthRequestDto) => {
  const responseBody = await axios
    .post(TEL_AUTH_API_URL, requestBody)
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function: tel auth check 요청 함수 //
export const telAuthCheckRequest = async (
  requestBody: TelAuthCheckRequestDto
) => {
  const responseBody = await axios
    .post(TEL_AUTH_CHECK_API_URL, requestBody)
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function : guest sign up 요청 함수//
export const GuestSignUpRequest = async (
  requestBody: GuestSignUpRequestDto
) => {
  const responseBody = axios
    .post(GUEST_SIGN_UP_API_URL, requestBody)
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function : host sign up 요청 함수//
export const HostSignUpRequest = async (requestBody: HostSignUpRequestDto) => {
  const responseBody = axios
    .post(HOST_SIGN_UP_API_URL, requestBody)
    .then(responseDataHandler<ResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// function : sign in 요청 함수 //
export const SignInRequest = async (requestBody: SignInRequestDto) => {
  const responseBody = await axios
    .post(SIGN_IN_API_URL, requestBody) // requestBody로 통합
    .then(responseDataHandler<SignInResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

const guestRequestBody: SignInRequestDto = {
  id: "guestId",
  password: "guestPassword",
  userType: "guest",
};

const hostRequestBody: SignInRequestDto = {
  id: "hostId",
  password: "hostPassword",
  userType: "host",
};

// 최상위에서 await을 사용하기 위해 비동기 함수로 감싸기
async function run() {
  const guestResponse = await SignInRequest(guestRequestBody);
  const hostResponse = await SignInRequest(hostRequestBody);

  console.log(guestResponse, hostResponse);
}

run(); // 비동기 함수 실행

// function: get accommodation list 요청 함수 //
export const getAccommodationListRequest = async (
  requestBody: SearchedAccommodationRequestDto
) => {
  const responseBody = await axios
    .get(GET_SERCHED_ACCOMMODATION_LIST_API_URL)
    .then(responseDataHandler<SearchedAccommodationRequestDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// !옥진서 작업중 //
function:Login  요청 함수 //
export const logInRequest = async (requestBody: LogInRequestDto) => {
  const responseBody = await axios
    .post(LOG_IN_API_URL, requestBody)
    .then(responseDataHandler<LogInResponseDto>)
    .catch(responseErrorHandler);
  return responseBody;
};
