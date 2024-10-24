import axios, { AxiosResponse } from "axios";

import SearchedAccommodationRequestDto from "./dto/request/search-accommodation.request.dto";
import { ResponseDto } from "./dto/response";


// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;
const GET_SERCHED_ACCOMMODATION_LIST_API_URL = `${ROOMLY_API_DOMAIN}/api/v1/accommodationName`;


// function : Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({
  headers: { Authorization: `Bearer ${accessToken}` },
});


// function : response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
  const { data } = response;
  return data;
};


// function : Response Error 처리 함수 //
const responseErrorHandler = (error: any) => {
  if (!error.response) return null;
  const { data } = error.response;
  return data as ResponseDto;
};


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


