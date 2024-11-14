import axios, { AxiosResponse } from "axios";

import { GetHostAccommodationListResponseDto } from "./hostmypage/dto/response/GetHostAccommodationListResponseDto";
import { GET_ACCOMMODATION_LIST_API_URL } from "src/constants";
import { ResponseDto } from "./hostmypage";
import { GetAccommodationListResponseDto } from "./hostmypage/dto/response";



// variable: API URL 상수 //
const ROOMLY_API_DOMAIN = process.env.REACT_APP_API_URL;

const ACCOMMODATION_MODULE_URL = `${ROOMLY_API_DOMAIN}/api/roomly/accommodation`;

const GET_HOST_ACCOMMODATION_LIST_API_URL = (hostId: string) => `${ACCOMMODATION_MODULE_URL}/${hostId}`;

// function: Authorization Bearer Header //
const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` }});

// function: response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
    const { data } = response;
    return data;
};

// function: response error 처리 함수 //
const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};

// function: Get host accommodation list 처리함수 //
export const getHostAccommodationListRequest = async(hostId: string, accessToken: string) => {
    const responseBody = await axios.get(GET_HOST_ACCOMMODATION_LIST_API_URL(hostId), bearerAuthorization(accessToken))
        .then(responseDataHandler<GetHostAccommodationListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

// function: Get accommodation List 처리 함수
export const getAccommodationListRequest = (accessToken:string)=> {
    const responseBody = axios.get(GET_ACCOMMODATION_LIST_API_URL, bearerAuthorization(accessToken))
        .then(responseDataHandler<GetAccommodationListResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
}

