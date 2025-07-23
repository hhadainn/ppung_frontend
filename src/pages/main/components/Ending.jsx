import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../styles/ending.scss';
import sugeunImg from '../../../assets/images/smelly.png';      // 0~49점
import normalImg from '../../../assets/images/suguen.png';      // 50~79점
import goodJobImg from '../../../assets/images/success.png';    // 80~100점
import classNames from 'classnames';


const Ending = ({score = 90, ending}) => {
//   const location = useLocation();
     const navigate = useNavigate();
//   const score = location.state?.score ?? 0;


  let imageSrc, message, imageClass, animationClass;
  
  if (score < 50) {
    imageSrc = sugeunImg;
    message = '어디서 똥냄새 안 나냐?';
    imageClass = 'ending-image1';
    animationClass= 'side-shake';
  } else if (score < 80) {
    imageSrc = normalImg;
    message = '이상한 냄새가 나는 거 같기도...';
    imageClass = 'ending-image2';
    animationClass= 'side-shake';
  } else {
    imageSrc = goodJobImg;
    message = '몰빵 성공~!!';
    imageClass = 'ending-image3';
    animationClass= 'bounce';
  }

  const handleRetry = () => {
    navigate('/main');
  };

  return (
    
    <div className={classNames("ending-container", {'fade-in' : ending}, {'display-none': !ending})}>
       <div className={`ending-content ${animationClass}`}>
            <p className="ending-text">{message}</p>
            <img src={imageSrc} alt="ending character" className={imageClass} />
        </div>
      
        <button className="retry-btn" onClick={handleRetry}>
        다시 플레이하기
        </button>
    </div>
  );
};

export default Ending;
