import "./style.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from "src/component/topbar";

interface AccommodationRequest {
  id: number;
  hostName: string;
  accommodationName: string;
  requestDate: string;
  status: 'pending' | 'approved';
}

const AdminPage: React.FC = () => {
  const [requests, setRequests] = useState<AccommodationRequest[]>([
    {
      id: 1,
      hostName: 'Juan M.',
      accommodationName: 'Beach House',
      requestDate: '2023-05-16',
      status: 'pending',
    },
    {
      id: 2,
      hostName: 'Mia L.',
      accommodationName: 'Mountain Cabin',
      requestDate: '2023-03-14',
      status: 'pending',
    },
    {
      id: 3,
      hostName: 'Lynda G.',
      accommodationName: 'Urban Studio',
      requestDate: '2023-04-29',
      status: 'approved',
    },
    {
      id: 4,
      hostName: 'Lynda G.',
      accommodationName: 'Urban Studio',
      requestDate: '2024-07-29',
      status: 'approved',
    },
  ]);

  const [pendingSortOrder, setPendingSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [approvedSortOrder, setApprovedSortOrder] = useState<'latest' | 'oldest'>('latest');

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/accommodation/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching accommodation requests:', error);
    }
  };

  const toggleApprovalStatus = (id: number) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id
          ? { ...req, status: req.status === 'pending' ? 'approved' : 'pending' }
          : req
      )
    );
  };

  const sortRequests = (requests: AccommodationRequest[], order: 'latest' | 'oldest') => {
    return [...requests].sort((a, b) => {
      const dateA = new Date(a.requestDate);
      const dateB = new Date(b.requestDate);
      return order === 'latest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const pendingRequests = sortRequests(
    requests.filter((req) => req.status === 'pending'),
    pendingSortOrder
  );

  const approvedRequests = sortRequests(
    requests.filter((req) => req.status === 'approved'),
    approvedSortOrder
  );

  return (
    <div style={{ width: '1200px', margin: '0 auto', color: '#E0E0E0' }}>
        <Topbar/>
      <h1>숙소 등록 요청 관리자 페이지</h1>

      {/* 대기 중 요청 테이블 */}
      <h2>대기 중 요청</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <label style={{ color: '#E0E0E0', marginRight: '10px' }}>분류:</label>
        <select
          value={pendingSortOrder}
          onChange={(e) => setPendingSortOrder(e.target.value as 'latest' | 'oldest')}
          style={{
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#E0E0E0',
            border: '1px solid #555',
          }}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>호스트 이름</th>
            <th>숙소 이름</th>
            <th>요청 날짜</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.hostName}</td>
              <td>{request.accommodationName}</td>
              <td>{request.requestDate}</td>
              <td>
                <span className="status-badge in-progress">대기 중</span>
              </td>
              <td>
                <button
                  onClick={() => toggleApprovalStatus(request.id)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: '#00C2FF',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  승인
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 승인 완료 요청 테이블 */}
      <h2 style={{ marginTop: '40px' }}>승인 완료</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <label style={{ color: '#E0E0E0', marginRight: '10px' }}>분류:</label>
        <select
          value={approvedSortOrder}
          onChange={(e) => setApprovedSortOrder(e.target.value as 'latest' | 'oldest')}
          style={{
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#E0E0E0',
            border: '1px solid #555',
          }}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>호스트 이름</th>
            <th>숙소 이름</th>
            <th>요청 날짜</th>
            <th>상태</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {approvedRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.hostName}</td>
              <td>{request.accommodationName}</td>
              <td>{request.requestDate}</td>
              <td>
                <span className="status-badge done">승인 완료</span>
              </td>
              <td>
                <button
                  onClick={() => toggleApprovalStatus(request.id)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: '#FF5733',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  취소
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
