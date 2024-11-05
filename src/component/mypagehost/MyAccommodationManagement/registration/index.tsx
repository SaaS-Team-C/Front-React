import Topbar from "src/component/topbar";
import "./style.css";
import React, { useState } from "react";
import HostMypageLayout from "src/layout/mypageHost";
import RoomRegister from "./roomRegistrationform";
import HostAccommodationRegisterForm from "./accommodationRegistrationform";


const userName = "이소진";

export default function HostAccommodationRegister() {
    
  return (
    <>
    <Topbar/>
      <div className="test">
      <HostMypageLayout />
      {/* 상단 환영 문구 */}
      <div id="host-accommodation-register-wrapper">
      <div className="welcome-message"> 호스트 '{userName}'님, 반갑습니다.</div>
      <HostAccommodationRegisterForm />

      </div>
      </div>
      </>
  );
}
