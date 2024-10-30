import "./style.css";
import React, { useEffect, useState } from 'react';
import Topbar from "src/component/topbar";
import { fetchAdminApprovalRequests } from "src/apis/admin";
import { AdminRequestDTO } from "src/apis/admin/dto/request";
export interface AdminRequestProps {
  req: AdminRequestDTO[];
}

// requestDate와 status 필드를 포함하는 임시 타입
interface AdminRequestWithStatus extends AdminRequestDTO {
  requestDate: string; // 요청 일자
  status: 'pending' | 'approved'; // 상태
}

const Accommodationenrollmentapproval: React.FC = () => {
  const [requests, setRequests] = useState<AdminRequestWithStatus[]>([]);
  const [pendingSortOrder, setPendingSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [approvedSortOrder, setApprovedSortOrder] = useState<'latest' | 'oldest'>('latest');

  // function: 호스트 승인 요청 리스트 불러오기 함수 //
  const fetchRequests = async () => {
    try {
      const data = await fetchAdminApprovalRequests();

      // requestDate와 status를 추가하여 가공된 데이터 생성
      const processedData: AdminRequestWithStatus[] = data.map((item) => ({
        ...item,
        requestDate: new Date().toISOString(), // 기본 값 설정
        status: 'pending', // 기본 상태 설정
      }));

      setRequests(processedData); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching accommodation requests:', error);
    }
  };

  // 상태 변경 함수
  const toggleApprovalStatus = (hostId: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.hostId === hostId
          ? { ...req, status: req.status === 'pending' ? 'approved' : 'pending' }
          : req
      )
    );
  };

  // 정렬 함수
  const sortRequests = (requests: AdminRequestWithStatus[], order: 'latest' | 'oldest') => {
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
    <div className="page-container">
      <Topbar />
      <h1>숙소 등록 요청 관리자 페이지</h1>

      <h2>대기 중 요청</h2>
      <div className="sort-container">
        <label className="sort-label">분류:</label>
        <select
          value={pendingSortOrder}
          onChange={(e) => setPendingSortOrder(e.target.value as 'latest' | 'oldest')}
          className="sort-select"
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
            <tr key={request.hostId}>
              <td>{request.hostName}</td>
              <td>{request.accommodationName}</td>
              <td>{request.requestDate}</td>
              <td>
                <span className="status-badge in-progress">대기 중</span>
              </td>
              <td>
                <button
                  onClick={() => toggleApprovalStatus(request.hostId)}
                  className="action-button approve"
                >
                  승인
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>승인 완료</h2>
      <div className="sort-container">
        <label className="sort-label">분류:</label>
        <select
          value={approvedSortOrder}
          onChange={(e) => setApprovedSortOrder(e.target.value as 'latest' | 'oldest')}
          className="sort-select"
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
            <tr key={request.hostId}>
              <td>{request.hostName}</td>
              <td>{request.accommodationName}</td>
              <td>{request.requestDate}</td>
              <td>
                <span className="status-badge done">승인 완료</span>
              </td>
              <td>
                <button
                  onClick={() => toggleApprovalStatus(request.hostId)}
                  className="action-button cancel"
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

export default Accommodationenrollmentapproval;
