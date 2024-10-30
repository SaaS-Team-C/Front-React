import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface HostRequest {
  hostId: string;
  hostName: string;
  requestDate: string; // 요청 승인 날짜
}

const AccomodationEnrollApprovalPage: React.FC = () => {
  const [requests, setRequests] = useState<HostRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<HostRequest[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 승인 요청 리스트 불러오기
  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/admin/host-approval-requests');
      setRequests(response.data);
      setFilteredRequests(response.data); // 초기 데이터로 필터링
    } catch (error) {
      console.error('Failed to fetch host requests:', error);
    }
  };

  // 날짜 선택 시 필터링 적용
  const filterByDate = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setFilteredRequests(
        requests.filter(request => request.requestDate.startsWith(formattedDate))
      );
    } else {
      setFilteredRequests(requests);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div id='AccomodationEnrollApprovalPage-wrapper'>
      <h1>호스트 승인 요청 목록</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>승인 날짜 시작일: </label>
        <DatePicker
          selected={selectedDate}
          onChange={filterByDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하세요"
          isClearable
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>승인 날짜 종료일: </label>
        <DatePicker
          selected={selectedDate}
          onChange={filterByDate}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜를 선택하세요"
          isClearable
        />
      </div>


      <table>
        <thead>
          <tr>
            <th>호스트 ID</th>
            <th>호스트 이름</th>
            <th>요청 승인 날짜</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.hostId}>
              <td>{request.hostId}</td>
              <td>{request.hostName}</td>
              <td>{request.requestDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccomodationEnrollApprovalPage;
