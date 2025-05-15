import React from 'react';
import './MainScreen.css';

const MainScreen = ({ onStart }) => (
  <div className="main-screen">
    <h1>화난 가온이 찾기</h1>
    <p>단 하나 다른 카드를 제한 시간 내에<br/>찾아 다음 스테이지로 진행하세요!</p>
    <button className="start-button" onClick={onStart}>게임 시작</button>
  </div>
);

export default MainScreen;