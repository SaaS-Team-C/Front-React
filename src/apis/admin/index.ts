import axios from "axios";
import { AdminRequestDTO } from "./dto/request";



// function: admin 호스트 숙소 승인 요청 시 호스트 정보 가져오기 API 함수 //
const API_URL = 'http://localhost:3000/admin';

export const fetchAdminApprovalRequests = async (): Promise<AdminRequestDTO[]> => {
  try {
    const response = await axios.get<AdminRequestDTO[]>(API_URL);
    return response.data; // 응답으로 받은 데이터를 반환
  } catch (error) {
    console.error('요청하신 정보를 불러올 수 없습니다.', error);
    throw error; // 에러를 호출한 곳에서 핸들링할 수 있도록 던짐
  }
};

