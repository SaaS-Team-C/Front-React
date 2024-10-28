import axios, { AxiosResponse } from "axios";

import SearchedAccommodationRequestDto from "./dto/request/search-accommodation.request.dto";
import { ResponseDto } from "./dto/response";
import { AccommodationDTO } from "./dto/request/accommodation.request.dto";


// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;
const GET_SERCHED_ACCOMMODATION_LIST_API_URL = `${ROOMLY_API_DOMAIN}/api/v1/accommodationName`;



// API 기본 설정
const api = axios.create({
  baseURL: 'https://localhost:3000', // 실제 API URL로 변경
  headers: {
    'Content-Type': 'application/json',
  },
});


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
// 아마 삭제 될 api
export const getAccommodationListRequest = async (
  requestBody: SearchedAccommodationRequestDto
) => {
  const responseBody = await axios
    .get(GET_SERCHED_ACCOMMODATION_LIST_API_URL)
    .then(responseDataHandler<SearchedAccommodationRequestDto>)
    .catch(responseErrorHandler);
  return responseBody;
};

// 선생님 코드 참고용으로 가져옴
// export const getAccommodationRequestList = async (
// ): Promise<AccommodationDTO[]> => {
//     const responseBody = await axios
//     .get<AccommodationDTO[]>(GET_ACCOMMODATION_LIST_API_URL)
//     .then(responseDataHandler)
//     .catch(responseErrorHandler);
//     return responseBody;
//   };

// 숙소 검색 리스트 가져오기 API 함수

// gpt 코드 헷갈려서 공부용 & 참조용으로 보관함
// export const fetchAccommodationList = async (): Promise<AccommodationDTO[]> => {
//   try {
    // const response = await axios
    // .get<AccommodationDTO[]>(G); // 백엔드의 특정 주소로 데이터를 요청하는 단계 그러니까 주소 = 벡엔드 주소임
    // '/api/accommodations'라는 주소는 "백엔드야, 숙소 목록이 필요해!"라는 뜻
    //  <AccommodationDTO[]>는 응답으로 DTO 배열이 올 거라고 지정해주는 것
    // await: await는 "응답이 올 때까지 잠깐 기다려줘"라는 뜻.
    // return response.data;
    //     response.data: 백엔드가 응답을 보내면, 그 안에 데이터가 response.data에 담겨 있어. 이 데이터를 우리가 화면에 사용하거나 처리할 수 있게 돼.
    // 서버에서 데이터를 받으면 **response.data**에 저장되고, 이 데이터가 data 변수에 담기게 돼.
    
    // 이렇게 함수를 실행하면, 숙소 리스트를 받아와서 사용할 수 있는 형태로 저장하는 거야.
//   } catch (error) {
//     console.error('Failed to fetch accommodations:', error);
//     throw error;
//   }
// };


const GET_ACCOMMODATION_LIST_API_URL = `${ROOMLY_API_DOMAIN}/accommodationList`;

// function: 숙소 검색 리스트 가져오기 API 함수 //
export const fetchAccommodationList = async (): Promise<AccommodationDTO[]> => {
  try {
    const response = await axios
    .get<AccommodationDTO[]>(GET_ACCOMMODATION_LIST_API_URL); 
    return response.data;
    //     response.data: 백엔드가 응답을 보내면, 그 안에 데이터가 response.data에 담겨 있어. 이 데이터를 우리가 화면에 사용하거나 처리할 수 있게 돼.
    // 서버에서 데이터를 받으면 **response.data**에 저장되고, 이 데이터가 data 변수에 담기게 돼.
    
    // 이렇게 함수를 실행하면, 숙소 리스트를 받아와서 사용할 수 있는 형태로 저장하는 거야.
  } catch (error) {
    console.error('Failed to fetch accommodations:', error);
    throw error;
  }
};



