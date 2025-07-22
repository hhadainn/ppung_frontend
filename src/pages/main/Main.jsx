import React, { useState } from 'react';
import '../../styles/main.scss';

// 이미지 import
import fartImg from '../../assets/images/fart_farting.png';
import fart_standingImg from '../../assets/images/fart_standing.png';
import coughImg from '../../assets/images/cough.png';
import cough_standing from '../../assets/images/cough_stand.png';
import StartScreen from './components/StartScreen';
import { useEffect } from 'react';
import { useBGMStore } from "../../store/backgroundSound";
import BlackScreen from './components/BlackScreen';
const Main = () => {
	const [zoomState, setZoomState] = useState(null);
	const [isCoughClicked, setIsCoughClicked] = useState(false);
	const [isFartClicked, setIsFartClicked] = useState(false);
	const pauseBackgroundSound = useBGMStore(state => state.pause)
	const [isBackground, setIsBackground] = useState(true)
	const [isBlackScreen, setIsBlackScreen] = useState(true)
	const [isStart, setIsStart] = useState(false)
	const handleCoughClick = () => {
		setIsCoughClicked((prev) => !prev);
	};

	const handleFartClick = () => {
		setIsFartClicked((prev) => !prev);
	};
	useEffect(() => {
		setTimeout(() => {
			setIsBackground(false)
			pauseBackgroundSound();
			setTimeout(() => {
				setIsBlackScreen(false)
				setIsStart(true)
			},1000)
		}, 3000)
	},[])
	useEffect(() => {
		if(isStart){
			const sequence = ['all', 0, 'all'];
			let step = 0;

			const interval = setInterval(() => {
				if (step >= sequence.length) {
				clearInterval(interval);
				return;
				}
				setZoomState(sequence[step]);
				step++;
			}, 1000);

			return () => clearInterval(interval);
		}
	  }, [isStart]);
	return (
		<>
			<StartScreen isBackground={isBackground}/>
			<BlackScreen isBlackScreen={isBlackScreen}/>
			<div className="viewport">
				<div className={`comic-board zoom-${zoomState}`}>
					{/* 네 컷 위치 고정 */}
					<div className="row top-row">
						<div className='container'></div>
						<div style={{position:'absolute', left:493, width:15, height:'100%', backgroundColor:'#f1f3df', zIndex:10}}/>
						<div className="panel">
							<img
								className="bottom-left-image"
								src={isCoughClicked ? cough_standing : coughImg}
								alt="Cough Character"
								onClick={handleCoughClick}
							/>
						</div>
						<div className="panel">
							<img
								className="bottom-right-image"
								src={isFartClicked ? fart_standingImg : fartImg}
								alt="Fart Character"
								onClick={handleFartClick}
							/>
						</div>
					</div>
					<div className="row bottom-row">
						<div className="panel"></div>
						<div className="panel"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
