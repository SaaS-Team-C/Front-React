import React from 'react'
import GuestLogInRequestDto from './dto/request/guest/login.request.dto';
import axios, { AxiosResponse } from 'axios';
import { GET_GUEST_SIGN_IN, MAIN_PATH } from 'src/constants';
import LogInResponseDto from './dto/response/login.responsw.dto';
import ResponseDto from './dto/response/response.dto';
import MypageAuthRequestDto from './dto/request/guest/mypageauth.request.dto';
import GetSignInResponseDto from './dto/response/get-guest-sign-in.response.dto';
import GetGuestSignInResponseDto from './dto/response/get-guest-sign-in.response.dto';

// function : Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({
    headers: { Authorization: `Bearer ${accessToken}` }});

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

export const logInRequest = async (requestBody: GuestLogInRequestDto) => {
    const responseBody = await axios.post('http://localhost:4000/api/roomly/auth/guest/sign-in', requestBody)
        .then(responseDataHandler<LogInResponseDto>)
        .catch(responseErrorHandler);
    return responseBody;
};

export const MypageAuthRequest = async (requestBody: MypageAuthRequestDto) => {
    const responseBody = await axios.delete('http://localhos:4000/api/romly/bookmark/delete-bookmark/&{}/&{}')
}

export const getGuestSignInRequest = async(accessToken: string) => {
    const responseBody = await axios.get(GET_GUEST_SIGN_IN, bearerAuthorization(accessToken))
    .then(responseDataHandler<GetGuestSignInResponseDto>)
    .catch(responseErrorHandler)
}