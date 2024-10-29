import axios, { AxiosResponse } from "axios";


// function: admin 호스트 숙소 승인 요청 가져오기 API 함수 //
const API_URL = 'http://localhost:3000/api/admin';

export const fetchCustomerRequests = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; 
    } catch (error) {
        console.error("Error fetching customer requests:", error);
        throw error;
    }
};
