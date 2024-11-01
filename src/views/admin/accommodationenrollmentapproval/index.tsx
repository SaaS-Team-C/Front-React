import "./style.css";
import React, { useEffect, useState } from 'react';
import Topbar from "src/component/topbar";

import { AdminRequestDTO } from "src/apis/admin/dto/request";
export interface AdminRequestProps {
  req: AdminRequestDTO[];
}


const Accommodationenrollmentapproval: React.FC = () => {
  const [requests, setRequests] = useState<AdminRequestDTO[]>([]);
  const [pendingSortOrder, setPendingSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [approvedSortOrder, setApprovedSortOrder] = useState<'latest' | 'oldest'>('latest');

  // function: 호스트 승인 요청 리스트 불러오기 함수 //


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

  // ! 정렬 함수 날짜 말고 호스트명 가나다 순으로 수정 필요 
  const sortRequests = (requests: AdminRequestDTO[], order: 'latest' | 'oldest') => {
    return [...requests].sort((a, b) => {
      const dateA = new Date(a.hostName);
      const dateB = new Date(b.hostName);
      return order === 'latest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  };

  useEffect(() => {
    // api 호출 자리
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
              <td>{request.hostId}</td>
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
              <td>{request.hostId}</td>
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
