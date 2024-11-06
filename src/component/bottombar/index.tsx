import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Bottombar() {

    const navigate = useNavigate();

    // 카카오톡 문의 핸들러
    const handleKakaoClick = () => {
        window.open('http://pf.kakao.com/_axcqVn', '_blank', 'noopener,noreferrer');
    };

    // FAQ 핸들러
    const handleFaqClick = () => {
        navigate('/faq');
    };

    return (
        <div className="footer">
            <div className="top-footer">
                <div className="top-footer1">
                    <div className="top-footer1-title">문의센터</div>
                    <div className="top-footer1-content1">카카오톡 문의: 오전 9시 ~ 새벽 3시 운영</div>
                    <div className="top-footer1-content2">FAQ: 24시간 운영</div>
                    <div className="top-footer1-button">
                        <button className='top-footer1-kakao' onClick={handleKakaoClick}>카카오톡 문의</button>
                        <button className="top-footer1-faq" onClick={handleFaqClick}>FAQ</button>
                    </div>
                </div>
                <div className="top-footer2">
                    <div className="top-footer2-title">회사</div>
                    <div className="top-footer2-content">회사소개</div>
                </div>
                <div className="top-footer3">
                    <div className="top-footer3-title">인기 검색 키워드</div>
                    <div className="top-footer3-content1">여행 추천 숙소</div>
                    <div className="top-footer3-content2">국내 인기 여행지</div>
                    

                </div>
                <div className="top-footer4">
                    <div className="top-footer4-title">회원정보</div>
                    <div className="top-footer4-content1">마이페이지</div>
                    <div className="top-footer4-content2">로그아웃</div>
                </div>
                <div className="top-footer5">
                    <div className="top-footer5-title"></div>
                    <div className="top-footer5-content"></div>
                </div>
            </div>
            <div className="bottom-footer">
                <div className="bottom-footer1">
                    <div className="bottom-footer1-content1"></div>
                    <div className="bottom-footer1-content2"></div>
                    <div className="bottom-footer1-content3"></div>
                    <div className="bottom-footer1-content4"></div>
                </div>
                <div className="bottom-footer2">
                    <div className="bottom-footer2-content1"></div>
                    <div className="bottom-footer2-content2"></div>
                    <div className="bottom-footer2-content3"></div>
                    <div className="bottom-footer2-content4"></div>
                </div>
                <div className="bottom-footer3"></div>
            </div>
        </div>
    )
}