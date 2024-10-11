import { IdCheckRequestDto, SignInRequestDto, SignUpRequestDto, TelAuthCheckRequestDto, TelAuthRequestDto } from "./dto/request/auth/G";
import { ResponseDto } from "./dto/response";


// function : Authorization Bearer 헤더 //
const bearerAuthorization = (accessToken: string) => ({headers: {'Authorization': `Bearer ${accessToken}`}})

// ! 중복되는 성공에 대한 함수를 따로 만들었음.
// function : response data 처리 함수 //
const responseDataHandler = <T>(response: AxiosResponse<T, any>) => {
        const { data } = response;
        return data;
}

// ! 중복되는 error에 대한 함수를 따로 만들었음.
// function : Response Error 처리 함수 //
const responseErrorHandler = (error: any) =>{ 
    if(!error.response) return null; 
    const { data } = error.response;
    return data as ResponseDto;
}

// function : id check api 요청함수 //
export const idCheckRequest = async (requestBody:IdCheckRequestDto) => {

};

// function : tel auth api 요청 함수 //
export const telAuthRequest = async (requestBody: TelAuthRequestDto) => {

};

// function: tel auth check 요청 함수 //
export const telAuthCheckRequest = async (requestBody: TelAuthCheckRequestDto) => {

};

// function : sign up 요청 함수//
export const signUpRequest = async (requestBody: SignUpRequestDto) => {

};


// function: sign in 요청 함수 //
export const signInRequest = async (requestBody: SignInRequestDto) => {

};

// function: get sign in 요청 함수 //
export const getSignInRequest = async (accessToken: string) => {
};
