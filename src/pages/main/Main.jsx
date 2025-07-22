import React, { useState, useRef } from 'react';
import '../../styles/main.scss';

// 이미지 import
import fartImg from '../../assets/images/fart_farting.png';
import fart_standingImg from '../../assets/images/fart_standing.png';
import coughImg from '../../assets/images/cough.png';
import cough_standing from '../../assets/images/cough_stand.png';
import {ReactComponent as FartWind} from '../../assets/images/fart_wind2.svg'
import {ReactComponent as CaughSound} from '../../assets/images/caugh_sound.svg'
import StartScreen from './components/StartScreen';
import { useEffect } from 'react';
import { useBGMStore } from "../../store/backgroundSound";
import BlackScreen from './components/BlackScreen';
import generateId from '../../utils/generateId';
import bitSound from '../../assets/audio/background_bits.mp3'
import { useSearchParams } from 'react-router-dom';
import { Howl } from 'howler';
import sneezeSound from '../../assets/audio/sneeze.mp3'; // 경로 주의
import failSound from '../../assets/audio/fail_effect.mp3'; // 경로 주의
import successSound from '../../assets/audio/success_effect.mp3'; // 경로 주의
const emojiTimings = [5.0, 6.0, 7.0, 8.0, 9.0, 10.0];
const clickTimings = [1.5, 3.0, 4.25, 6.0];
const screenTimings = [5.0, 6.0, 7.0, 8.0]
const Main = () => {
	const [zoomState, setZoomState] = useState(null);
	const queueRef = useRef([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const queueRef2 = useRef([]);
	const startTimeRef = useRef(null);
	const [searchParams, setSearchParams] = useSearchParams()
	const play = searchParams.get('play')
	const isProcessingRef = useRef(false);
	const isProcessingRef2 = useRef(false);
	const audioRef = useRef(null);
	const timerRefs = useRef([]);
	const successEffect = new Howl({ src: [successSound] });
	const failEffect = new Howl({ src: [failSound] });
	const [isCoughClicked, setIsCoughClicked] = useState(false);
	const [sendList, setSendList] = useState([])
	const [isFartClicked, setIsFartClicked] = useState(false);
	const pauseBackgroundSound = useBGMStore(state => state.pause)
	const setAudio = useBGMStore(state => state.setAudio)
	const [isBackground, setIsBackground] = useState(true)
	const [isBlackScreen, setIsBlackScreen] = useState(true)
	const [isStart, setIsStart] = useState(false)
	const handleCoughClick = () => {
		setIsCoughClicked((prev) => !prev);
	};

	const handleFartClick = () => {
		setIsFartClicked((prev) => !prev);
	};
	const processQueue = () => {
		if (isProcessingRef.current || queueRef.current.length === 0) return;
	
		isProcessingRef.current = true;
	
		const task = queueRef.current.shift();
		task(); // 실행: 2로 변경
	
		// 1로 복구된 후 다음 작업 실행
		setTimeout(() => {
		  isProcessingRef.current = false;
		  processQueue(); // 다음 작업 실행
		}, 150);
	  };
	const processQueue2 = () => {
		if (isProcessingRef2.current || queueRef2.current.length === 0) return;
	
		isProcessingRef2.current = true;
	
		const task = queueRef2.current.shift();
		task(); // 실행: 2로 변경
	
		// 1로 복구된 후 다음 작업 실행
		setTimeout(() => {
		  isProcessingRef2.current = false;
		  processQueue2(); // 다음 작업 실행
		}, 150);
	  };
	useEffect(() => {
		if(isStart){
			const handleKeyDown = (e) => {
				if(e.code === 'Space'){
					const now = performance.now();
					const elapsed = (now - startTimeRef.current) / 1000; 
					const targetTime = clickTimings[currentIndex];
					const diff = Math.abs(elapsed - targetTime);

					if (diff <= 0.15) {
					// ⏱ 판정 성공
						successEffect.play();
						setCurrentIndex((i) => i + 1);
					} else {
						failEffect.play();
					}
					queueRef.current.push(() => {
						setIsFartClicked(true);
						setTimeout(() => setIsFartClicked(false), 150)
					})
					processQueue();
				}
			}
			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}
	},[isStart])
	// useEffect(() => {
	// 	if (currentIndex >= clickTimings.length) return;
	  
	// 	const now = performance.now();
	// 	const delay = clickTimings[currentIndex] * 1000 - (now - startTimeRef.current);
	  
	// 	const timeout = setTimeout(() => {
	// 	  failEffect.play(); // ⏱ 입력 없이 넘어감
	// 	  setCurrentIndex((i) => i + 1);
	// 	}, delay + 150); // +판정 유예 시간
	  
	// 	return () => clearTimeout(timeout);
	//   }, [currentIndex]);
	useEffect(() => {
		if(isStart){
			const audio = new Audio(bitSound)
			audio.play()
			startTimeRef.current = performance.now();
			setAudio(audio)
			emojiTimings.forEach((timeInSec) => {
				const timeout = setTimeout(() => {
    				const effect = new Howl({ src: [sneezeSound] });
					effect.play();

					queueRef2.current.push(() => {
						setIsCoughClicked(true);
						setTimeout(() => setIsCoughClicked(false), 150)
					})
					processQueue2();
					setSendList((prev) => [
						...prev,
						{ id: generateId()},
					]);
				}, timeInSec * 1000);
		  
				timerRefs.current.push(timeout);
			  });
			return () => {
				timerRefs.current.forEach(clearTimeout);
			};
		}
	},[isStart])
	useEffect(() => {
		if (sendList.length === 0) return;
	
		const lastEmoji = sendList[sendList.length - 1];
		const timeout = setTimeout(() => {
		  setSendList((prev) => prev.filter((e) => e.id !== lastEmoji.id));
		}, 1500);
	
		return () => clearTimeout(timeout);
	  }, [sendList]);
	useEffect(() => {
		if(play){
			setTimeout(() => {
				setIsBackground(false)
				pauseBackgroundSound();
				setTimeout(() => {
					setIsBlackScreen(false)
					setIsStart(true)
					searchParams.set('play', false)
					setSearchParams(searchParams)
				},1000)
			}, 3000)
		}
	},[play])
	// useEffect(() => {
	// 	if(isStart){
	// 		const onKeyDown = (e) => {
	// 			if (e.code === 'Space') {
	// 				const newItem = {
	// 					id: generateId()
	// 				}
	// 				setSendList(prev => [...prev, newItem])
	// 				setTimeout(() => {
	// 					setSendList(prev => prev.filter(e => e.id != newItem.id))
	// 				},1500)
	// 			}
	// 		};
		
	// 		window.addEventListener('keydown', onKeyDown);
	// 		return () => window.removeEventListener('keydown', onKeyDown);
	// 	}
	// },[isStart])
	useEffect(() => {
		if (!isStart) return;
	  
		// [ [시간(초), 상태], ... ] 형태
		const sequence = [
		  [0, '1'],
		  [1.5, '2'],
		  [3.2, '3'],
		  [4.2, 'left1'],
		  [5.2, 'right1'],
		  [6.2, 'min0'],
		  [7.2, 'min1'],
		  [8.2, 'min2']
		];
	  
		const startTime = performance.now();
		const timers = [];
	  
		sequence.forEach(([delaySec, state]) => {
		  const timeout = setTimeout(() => {
			setZoomState(state);
		  }, delaySec * 1000);
	  
		  timers.push(timeout);
		});
	  
		return () => timers.forEach(clearTimeout);
	  }, [isStart]);
	return (
		<>
			<StartScreen 
				isBackground={isBackground}
				onClick={() =>{
					if(!!!play && isBackground){
						searchParams.set('play', true)
						setSearchParams(searchParams)
					}
				}}/>
			<BlackScreen isBlackScreen={isBlackScreen}/>
			<div 
				className="viewport" 
			>
				<div className={`comic-board zoom-${zoomState}`}>
					{/* 네 컷 위치 고정 */}
					<div className="row top-row">
						<div className='container'></div>
						<div style={{position:'absolute', left:493, width:15, height:'100%', backgroundColor:'#f1f3df', zIndex:10}}/>
						{sendList.map(data => {
							return(
								<CaughSound key={data.id} className='caugh-sound fly-left2right'/>
							)
						})}
						<div className="panel">
							<img
								className="bottom-left-image"
								src={isCoughClicked ? coughImg : cough_standing}
								alt="Cough Character"
								// onClick={handleCoughClick}
							/>
							{isCoughClicked && 
							<div style={{fontFamily:'BMkkubulimTTF-Regular', color:'blue', position:'absolute', left:180, bottom:120}}>
								<p style={{margin:0}}>에</p>
								<p style={{margin:0}}>취</p>
							</div>}
						</div>
						<div className="panel">
							<img
								className="bottom-right-image"
								src={isFartClicked ? fartImg : fart_standingImg}
								alt="Fart Character"
								// onClick={handleFartClick}
							/>
							{isFartClicked && 
							<FartWind
								// src={fartWind}
								style={{position:'absolute', right:200, bottom:45, height:100, width:100}}
								// alt="fart wind"
							/>}
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
