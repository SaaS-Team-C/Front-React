import React from 'react'
import GuestLogInRequestDto from './dto/request/guest/login.request.dto';
import axios, { AxiosResponse } from 'axios';
import { MAIN_PATH } from 'src/constants';
import LogInResponseDto from './dto/response/login.responsw.dto';
import ResponseDto from './dto/response/response.dto';

// function: response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
    const { data } = response;
    return data;
};

export const logInRequest = async (requestBody: GuestLogInRequestDto) => {
    const responseBody = await axios.post('http://localhost:4000/api/roomly/auth/guest/sign-in', requestBody)
        .then(responseDataHandler<LogInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

// function: response error 처리 함수 //
const responseErrorHandler = (error: any) => {
    if (!error.response) return null;
    const { data } = error.response;
    return data as ResponseDto;
};