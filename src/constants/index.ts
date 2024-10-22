// variable: 상대 경로 상수 //

export const ROOT_PATH = "/";

export const MAIN_PATH = "/main"


export const ACCOMMODATION_LIST_PATH = "/accommodationList";
export const ACCOMMODATION_LIST_DETAIL_PATH = `${ACCOMMODATION_LIST_PATH}/detail`;
export const ACCOMMODATION_LIST_DETAIL_ACC_SELECT_PATH = (name: string) =>`${ACCOMMODATION_LIST_DETAIL_ACC_SELECT_PATH}/${name}`;

// variable: HTTP BEARER TOKEN COOKIE NAME(토큰 이름 임시 지정) //
export const ACCESS_TOKEN = 'accessToken';
export const OTHERS_PATH = '*';
 