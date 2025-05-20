import React from 'react';
import './MainScreen.css';
import oddImage from '../images/odd.png';

const MainScreen = ({ onStart }) => (
  <div className="main-screen">
    <h1>화난 가온이를 찾아라!</h1>
    <img src={oddImage} alt="" className='angry-gaoni'/>
    <p>가온이들 중 화난 가온이를 찾아<br/>화를 풀어준다면 좋은일이 생길지도?</p>
    <button className="start-button" onClick={onStart}>찾으러 가기</button>
  </div>
);

export default MainScreen;