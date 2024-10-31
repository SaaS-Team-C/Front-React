import './style.css';

interface findComponentProps {
    onPathChange: (path: string) => void;
}

export default function findId({ onPathChange }:findComponentProps) {

// render: 아이디 찾기 화면 컴포넌트 렌더링 //
return (
    <div className="아이디 찾기">
        <div className="findId-wrapper">
            <div className="nameBox">
                <div className="nameBox-title">이름</div>
                <div className="nameBox-input"></div>
            </div>
            <div className="telNumberBox">
                <div className="telNumberBox-title">휴대전화</div>
                <div className="telNumberBox-input">
                <div className="telNumberBox-button">인증번호 전송</div>
                </div>
                <div className="authNumber-input"></div>
            </div> 
        </div>
    </div>
)
}