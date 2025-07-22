import React, { useState, useRef } from 'react';
import '../../styles/main.scss';

// 이미지 import
import fartImg from '../../assets/images/fart_farting.png';
import fartPoop from '../../assets/images/fart_poop.png';
import fartFailImg from '../../assets/images/fart_failed.png';
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
const emojiTimings = [7.5, 7.84, 8.18, 11.26, 11.6, 11.94, 14.9, 15.24, 15.58, 15.78, 18.6, 18.767, 18.934, 19.101, 19.268, 19.435, 22.2];
const Main = () => {
	const [zoomState, setZoomState] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0)
	const currentIndexRef = useRef(0)
	const [whenFail, setWhenFail] = useState(false)
	const [whenSuccess, setWhenSuccess] = useState(false)
	const currentFailureTimer = useRef(null);
	const queueRef = useRef([]);
	const queueRef2 = useRef([]);
	const queueRef3 = useRef([]);
	const queueRef4 = useRef([]);
	const startTimeRef = useRef(null);
	const [searchParams, setSearchParams] = useSearchParams()
	const play = searchParams.get('play')
	const isProcessingRef = useRef(false);
	const isProcessingRef2 = useRef(false);
	const isProcessingRef3 = useRef(false);
	const isProcessingRef4 = useRef(false);
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
	const processQueue3 = () => {
		if (isProcessingRef3.current || queueRef3.current.length === 0) return;
	
		isProcessingRef3.current = true;
	
		const task = queueRef3.current.shift();
		task(); // 실행: 2로 변경
	
		// 1로 복구된 후 다음 작업 실행
		setTimeout(() => {
		  isProcessingRef3.current = false;
		  processQueue3(); // 다음 작업 실행
		}, 150);
	  };
	const processQueue4 = () => {
		if (isProcessingRef4.current || queueRef4.current.length === 0) return;
	
		isProcessingRef4.current = true;
	
		const task = queueRef4.current.shift();
		task(); // 실행: 2로 변경
	
		// 1로 복구된 후 다음 작업 실행
		setTimeout(() => {
		  isProcessingRef4.current = false;
		  processQueue4(); // 다음 작업 실행
		}, 150);
	  };
	useEffect(() => {
		if(isStart){
			const handleKeyDown = (e) => {
				if(e.code === 'Space'){
					const now = performance.now();
					const elapsed = (now - startTimeRef.current) / 1000; 
					const index = currentIndexRef.current;
					const targetTime = emojiTimings[index] + 1.8;
					const diff = Math.abs(elapsed - targetTime);
					if (diff <= 0.15) {
						successEffect.play();
						queueRef4.current.push(() => {
							setWhenSuccess(true);
							setTimeout(() => setWhenSuccess(false), 150)
						})
						processQueue4();
						if (currentFailureTimer.current) clearTimeout(currentFailureTimer.current); // ⛔ 중복 방지
						currentIndexRef.current += 1;
						setCurrentIndex((i) => i + 1);
						scheduleNextFailure();
					}
					else {
						failEffect.play();
						queueRef3.current.push(() => {
							setWhenFail(true);
							setTimeout(() => setWhenFail(false), 150)
						})
						processQueue3();
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
	const scheduleNextFailure = () => {
		const index = currentIndexRef.current;
		if (index >= emojiTimings.length) return;
	  
		const now = performance.now();
		const delay = (emojiTimings[index] + 1.8) * 1000 - (now - startTimeRef.current);
	  
		// ⛔ 기존 실패 예약 취소
		if (currentFailureTimer.current) {
		  clearTimeout(currentFailureTimer.current);
		}
	  
		const timeout = setTimeout(() => {
		  failEffect.play();
		  queueRef3.current.push(() => {
			  setWhenFail(true);
			  setTimeout(() => setWhenFail(false), 150)
		  })
		  processQueue3();
		  currentIndexRef.current += 1;
		  setCurrentIndex((i) => i + 1);
		  scheduleNextFailure(); // 다음 실패 예약
		}, delay + 150);
	  
		currentFailureTimer.current = timeout;
	  };
	
	useEffect(() => {
		if (sendList.length === 0) return;
	
		const lastEmoji = sendList[sendList.length - 1];
		const timeout = setTimeout(() => {
		  setSendList((prev) => prev.filter((e) => e.id !== lastEmoji.id));
		}, 1950);
	
		return () => clearTimeout(timeout);
	  }, [sendList]);
	useEffect(() => {
		if(play === 'true'){
			setTimeout(() => {
				setIsBackground(false)
				pauseBackgroundSound();
				setTimeout(() => {
					setIsBlackScreen(false)
					setIsStart(true)
					searchParams.set('play', 'false')
					setSearchParams(searchParams)
				},1000)
			}, 3000)
		}
	},[play])
	useEffect(() => {
		if (!isStart) return;
	  
		const audio = new Audio(bitSound);
	  
		audio.onplay = () => {
		  // 기준 시간 기록
		  startTimeRef.current = performance.now();
		  scheduleNextFailure();
	  
		  // ✅ 이모티콘 타이밍
		  emojiTimings.forEach((timeInSec) => {
			const timeout = setTimeout(() => {
			  const effect = new Howl({ src: [sneezeSound] });
			  effect.play();
	  
			  queueRef2.current.push(() => {
				setIsCoughClicked(true);
				setTimeout(() => setIsCoughClicked(false), 150);
			  });
			  processQueue2();
	  
			  setSendList((prev) => [...prev, { id: generateId() }]);
			}, timeInSec * 1000);
			timerRefs.current.push(timeout);
		  });
	  
		  // ✅ 화면 전환 타이밍
		  const zoomSequence = [
			[0, '1'],
			[1.5, '2'],
			[3.2, '3'],
			[4.2, 'left1'],
			[5.2, 'right1'],
			[6.2, 'min0'],
			[7.2, 'min1'],
			[8.2, 'min2'],
		  ];
	  
		  zoomSequence.forEach(([delaySec, state]) => {
			const timeout = setTimeout(() => setZoomState(state), delaySec * 1000);
			timerRefs.current.push(timeout);
		  });
		};
	  
		audio.play().catch((err) => console.warn('autoplay blocked', err));
		setAudio(audio);
	  
		return () => {
		  timerRefs.current.forEach(clearTimeout);
		//   audio.pause();
		};
	  }, [isStart]);
	return (
		<>
			<StartScreen 
				isBackground={isBackground}
				onClick={() =>{
					if(play !== 'true' && isBackground){
						searchParams.set('play', 'true')
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
							<div style={{fontFamily:'BMkkubulimTTF-Regular', color:'#0F0FB9', position:'absolute', left:180, bottom:120}}>
								<p style={{margin:0}}>에</p>
								<p style={{margin:0}}>취</p>
							</div>}
						</div>
						<div className="panel">
							<img
								className="bottom-right-image"
								src={whenFail ? fartFailImg : (whenSuccess ? fartImg : fart_standingImg)}
								alt="Fart Character"
								// onClick={handleFartClick}
							/>
							{whenFail && <div style={{fontFamily:'BMkkubulimTTF-Regular', color:'#883615', position:'absolute', right:220, bottom:130}}>
								<p style={{margin:0}}>뿌</p>
								<p style={{margin:0}}>웅</p>
							</div>}
							{(whenFail) && 
							<img
								src={fartPoop}
								className='poop-style'
							/>
							}
							{isFartClicked && 
							<FartWind
								// src={fartWind}
								style={{position:'absolute', right:200, bottom:45, height:100, width:100}}
								// alt="fart wind"
							/>
							}
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
