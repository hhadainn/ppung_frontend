import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/ending.scss';
import sugeunImg from '../../../assets/images/smelly.png';      // 0~49점
import normalImg from '../../../assets/images/suguen.png';      // 50~79점
import goodJobImg from '../../../assets/images/success.png';    // 80~100점
import classNames from 'classnames';


const Ending = ({score, ending, reStartGame}) => {
//   const location = useLocation();
//   const score = location.state?.score ?? 0;

	const [showRanking, setShowRanking] = useState(false);
  let imageSrc, message, imageClass, animationClass;

  if (score < 50) {
    imageSrc = sugeunImg;
    message = '어디서 똥냄새 안 나냐?';
    imageClass = 'ending-image1';
    animationClass = 'side-shake';
  } else if (score < 100) {
    imageSrc = normalImg;
    message = '이상한 냄새가 나는 거 같기도...';
    imageClass = 'ending-image2';
    animationClass = 'side-shake';
  } else {
    imageSrc = goodJobImg;
    message = '몰빵 성공~!!';
    imageClass = 'ending-image3';
    animationClass = 'bounce';
  }

  return (
  <div className={classNames("ending-container", { 'fade-in': ending }, { 'display-none': !ending })}>
    <div className={`ending-content ${animationClass}`}>
      <p className="ending-text">{message}</p>
      <img src={imageSrc} alt="ending character" className={imageClass} />

      <p className="ending-text" onClick={() => setShowRanking(true)} style={{ cursor: 'pointer' }}>
        랭킹보기
      </p>

      
    </div>

    {showRanking && (
  <div className="ranking-frame">
    <h2>🎉 랭킹</h2>
    <div className="ranking-list">
      {[  // 예시 데이터
        { rank: 1, name: '정용수', score: 122292 },
        { rank: 2, name: '우산장수', score: 63572 },
        { rank: 3, name: '이원규', score: 20629 },
      ].map((item, index) => (
        <div className="rank-item" key={index}>
          <div className={`rank-badge rank-${index + 1}`}>
            {index + 1}
          </div>
          <div className="rank-info">
            <div className="rank-name">{item.name}</div>
            <div className="rank-score">{item.score.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
    <button className="retry-btn" onClick={reStartGame}>
      다시 플레이하기
    </button>
  </div>
)}

  </div>
);

};

export default Ending;
