import axios, { AxiosResponse } from "axios";
import { ResponseDto } from "./dto/response";
import { AccommodationDTO } from "./dto/response/accommodation.response.dto";

// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

// API 기본 설정
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
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

// function: 숙소 검색 리스트 가져오기 API 함수 //
const GET_ACCOMMODATION_LIST_API_URL = `${ROOMLY_API_DOMAIN}/accommodationList`;

export const fetchAccommodationList = async (): Promise<AccommodationDTO[]> => {
  try {
    const response = await api.get<AccommodationDTO[]>(
      GET_ACCOMMODATION_LIST_API_URL
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch accommodations:", error);
    throw error;
  }
};
