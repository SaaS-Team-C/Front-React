import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin';

export const fetchCustomerRequests = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // 고객 요청 데이터 반환
    } catch (error) {
        console.error("Error fetching customer requests:", error);
        throw error;
    }
};
