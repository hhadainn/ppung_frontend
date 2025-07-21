import React, { useState } from 'react';
import '../../styles/main.scss';

// 이미지 import
import fartImg from '../../assets/images/fart_farting.png';
import fart_standingImg from '../../assets/images/fart_standing.png';
import coughImg from '../../assets/images/cough.png';
import cough_standing from '../../assets/images/cough_stand.png';


const Main = () => {
  const [isCoughClicked, setIsCoughClicked] = useState(false);
  const [isFartClicked, setIsFartClicked] = useState(false);

  const handleCoughClick = () => {
    setIsCoughClicked((prev) => !prev);
  };

  const handleFartClick = () => {
    setIsFartClicked((prev) => !prev);
  };

  return (
    <div className="container">
      {/* 선들 */}
      {/* <div className="vertical-line left" />
      <div className="vertical-line right" /> */}
      <div style={{position:"absolute", top:0, bottom: 0, width:30, borderLeft:'2px solid #000',backgroundColor:'#f1f3df', borderRight:'2px solid #000', zIndex:10}}></div>
      <div style={{position:"absolute", bottom: 0, width:'100%', borderTop:'2px solid #000',backgroundColor:'#f1f3df', borderBottom:'2px solid #000', height:30, zIndex:10}}></div>
      {/* <div className="horizontal-line left" />
      <div className="horizontal-line right" /> */}

      {/* 위쪽 이미지 */}
      {/* <img
        className="top-image"
        src={board}
      /> */}

       {/* 가운데 이미지 */}
      {/* <img
        className="middle-image"
        src={students}
      /> */}

      {/* 기침 캐릭터 (왼쪽 아래) */}
      <img
        className="bottom-left-image"
        src={isCoughClicked ? cough_standing : coughImg}
        alt="Cough Character"
        onClick={handleCoughClick}
      />

      {/* 방귀 캐릭터 (오른쪽 아래) */}
      <img
        className="bottom-right-image"
        src={isFartClicked ? fart_standingImg : fartImg}
        alt="Fart Character"
        onClick={handleFartClick}
      />
    </div>
  );
};

export default Main;
