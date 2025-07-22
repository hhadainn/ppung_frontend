import React, { useState, useRef } from 'react';
import '../../../styles/main.scss';

// 이미지 import
import fartImg from '../../../assets/images/fart_farting.png';
import fartPoop from '../../../assets/images/fart_poop.png';
import fartFailImg from '../../../assets/images/fart_failed.png';
import fart_standingImg from '../../../assets/images/fart_standing.png';
import coughImg from '../../../assets/images/cough.png';
import cough_standing from '../../../assets/images/cough_stand.png';
import {ReactComponent as FartWind} from '../../../assets/images/fart_wind2.svg'
import {ReactComponent as CaughSound} from '../../../assets/images/caugh_sound.svg'
import { useEffect } from 'react';
import { useBGMStore } from "../../../store/backgroundSound";
import bitSound from '../../../assets/audio/background_bits.mp3'
import { Howl } from 'howler';
import sneezeSound from '../../../assets/audio/sneeze.mp3'; // 경로 주의
import failSound from '../../../assets/audio/fail_effect.mp3'; // 경로 주의
import successSound from '../../../assets/audio/success_effect.mp3'; // 경로 주의
import { useNavigate } from 'react-router-dom';

const emojiTimings = [
	7.5, 7.84, 8.18, 
	11.26, 11.6, 11.94, 
	14.9, 15.24, 15.58, 15.78,  
	18.6, 18.767, 18.934, 19.101, 19.268, 19.468, 
	22.2,22.54,22.88,23.08,
	26.587,26.787, 27.127, 27.467,
	29.716,30.217,30.417,
	33.156,33.356,33.556,33.756,
	36.849,37.049,37.249,37.449,37.669,
	40.624,41.859,42.256,
	44.336,44.676,45.016,45.216,
	47.994,48.161, 48.328, 48.888, 49.055, 49.222,
	51.656, 52.118, 52.712, 53.174,
	55.317,55.484, 55.651, 55.818, 55.985, 56.185,
	59.047, 59.247, 59.447,
	62.7,63.04,63.38,63.58,
	66.399,67.595,67.795, 67.995,
	69.9,70.067,70.234,70.401,71.101,71.801,
	73.7, 73.867, 74.267, 74.667, 75.067,
	77.634, 78.276, 78.996,
	81.297, 81.897, 82.497, 83.097,
	85, 85.5, 86,
	88.578, 89.078,89.578, //93
	92.221, 93.084, 93.424, 93.99, 94.556,  //처음 치는 순간: 95.754
	99.674,100.642,101.255,101.868 // 처음치는 순간: 103.170
 ];
const MAX_COUGH = 6;
const InGame = ({zoomState, setZoomState, isStart}) => {
	const navigate = useNavigate();
	const [currentIndex, setCurrentIndex] = useState(0)
	const currentIndexRef = useRef(0)
	const [whenFail, setWhenFail] = useState(false)
	const coughTimeoutRef = useRef(null); 
	const [coughSlots, setCoughSlots] = useState(Array(MAX_COUGH).fill({ active: false, key: 0 }))
	const coughSlotIndexRef = useRef(0);
	let uniqueKeyCounter = useRef(0);
	const [whenSuccess, setWhenSuccess] = useState(false)
	const currentFailureTimer = useRef(null);
	const betweenTimeRef = useRef(1.8); // 초기값

	// 최신 값을 바꾸고 싶을 때:
	const queueRef = useRef([]);
	const queueRef2 = useRef([]);
	const queueRef3 = useRef([]);
	const queueRef4 = useRef([]);
	const startTimeRef = useRef(null);
	const isProcessingRef = useRef(false);
	const isProcessingRef2 = useRef(false);
	const isProcessingRef3 = useRef(false);
	const isProcessingRef4 = useRef(false);
	const timerRefs = useRef([]);
	const successEffect = new Howl({ src: [successSound] });
	const effect = new Howl({ src: [sneezeSound], preload:true });
	const failEffect = new Howl({ src: [failSound] });
	const [isCoughClicked, setIsCoughClicked] = useState(false);
	const [isFartClicked, setIsFartClicked] = useState(false);
	const setAudio = useBGMStore(state => state.setAudio)
	const processQueue = () => {
		if (isProcessingRef.current || queueRef.current.length === 0) return;
	
		isProcessingRef.current = true;
	
		const task = queueRef.current.shift();
		task(); // 실행: 2로 변경
	
		// 1로 복구된 후 다음 작업 실행
		setTimeout(() => {
		  isProcessingRef.current = false;
		  processQueue(); // 다음 작업 실행
		}, 100);
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
		}, 100);
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
		}, 100);
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
		}, 100);
	  };
	useEffect(() => { // 배경음악 시작한 이후로 스페이스바가 들어오면 눌러야되는 타이밍 배열을 현재 인덱스로 검사해서 내가 누른 시간간격과 눌러야되는거랑 비교해서 성공/실패 판별하는거
		if(isStart){
			const handleKeyDown = (e) => {
				if(e.code === 'Space'){
					const now = performance.now();
					const elapsed = (now - startTimeRef.current) / 1000; 
					const index = currentIndexRef.current;
					const targetTime = emojiTimings[index] + betweenTimeRef.current;
					const diff = Math.abs(elapsed - targetTime);
					if (diff <= 0.15) {
						successEffect.play();
						queueRef4.current.push(() => {
							setWhenSuccess(true);
							setTimeout(() => setWhenSuccess(false), 150)
						})
						processQueue4();
						if (index == 93) {
						  betweenTimeRef.current = 3.53;
						}
						if (currentFailureTimer.current) clearTimeout(currentFailureTimer.current); // ⛔ 중복 방지
						currentIndexRef.current += 1;
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
	
	const scheduleNextFailure = () => { //timings 배열 마다 있는 시간 + 1.8초 후에 안눌리면 fail로직 발동시키고 index하나증가시켜서 다음 차례 시간 + 1.8초 검사할 수 있게 ㅅ케쥴링
		const index = currentIndexRef.current;
		if (index >= emojiTimings.length) {
		setTimeout(() => {
			navigate('/ending');
		}, 1000); // 1초 후 ending으로 이동
		return;
		}
	  
		const now = performance.now();
		const delay = (emojiTimings[index] + betweenTimeRef.current) * 1000 - (now - startTimeRef.current);
	  
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
			if (index == 93) {
			  betweenTimeRef.current = 3.53;
			}
			currentIndexRef.current += 1;
			scheduleNextFailure(); // 다음 실패 예약
		}, delay + 150);
	  
		currentFailureTimer.current = timeout;
	  };
	  const launchCoughEmoji = () => {
		const slot = coughSlotIndexRef.current;
		const key = uniqueKeyCounter.current++;
	  
		setCoughSlots(prev => {
		  const newState = [...prev];
		  newState[slot] = { active: true, key };
		  return newState;
		});
	  
		setTimeout(() => {
		  setCoughSlots(prev => {
			const newState = [...prev];
			newState[slot] = { active: false, key };
			return newState;
		  });
		}, (betweenTimeRef.current + 0.15) * 1000);
	  
		coughSlotIndexRef.current = (slot + 1) % MAX_COUGH;
	  };
	useEffect(() => {
		if (!isStart) return;
	  
		const audio = new Audio(bitSound);
	  
		audio.onplay = () => {
		  // 기준 시간 기록
		  startTimeRef.current = performance.now();
		  scheduleNextFailure(); //첫 클릭 못했을때 실패 스케쥴
	  
		  // ✅ 이모티콘 타이밍
		  emojiTimings.forEach((timeInSec) => {
			const timeout = setTimeout(() => {
				effect.play(); // 재채기 소리 켜는거
				queueRef2.current.push(() => {
					if (coughTimeoutRef.current) {
						clearTimeout(coughTimeoutRef.current);
					}
					setIsCoughClicked(true);
					coughTimeoutRef.current = setTimeout(() => {
						setIsCoughClicked(false);
						coughTimeoutRef.current = null;
					}, 150);
				}); //재채기 모션 바꿨다가 다시 돌아오기
				processQueue2();
				launchCoughEmoji();
			}, timeInSec * 1000);
			timerRefs.current.push(timeout);
		  }); //재채기 소리, 재채기 파형 나가게 하기, 재채기 모션 바뀌고 돌아오게 하기

		  // ✅ 화면 전환 타이밍
		  const zoomSequence = [
			[0, '1'],
			[3.4, '2'],
			[29.3, '3'],
			[37.1, 'left1'],
			[38.8, 'right1'],
			[40.7, 'left1'],
			[42.5, 'right1'],
			[44.3, 'left1'],
			[46.1, 'right1'],
			[48.0, 'left1'],
			[49.9, 'right1'],
			[51.8, 'left1'],
			[53.7, 'right1'],
			[55.5, 'left1'],
			[57.2, 'right1'],
			[59.2, '2'],
			[59.5, 'min0'],
			[59.7, 'min1'],
			[59.9, 'min2'],
			[60.9, 'min3'],
			[61.3, 'min4'],
			[61.6, 'min5'], 
			[62.8, 'left2'],
			[66.4, 'right2'],
			[70.2, 'right3'],
			[73.9, 'flip'],
			[77.6, 'left1'],
			[79.4, 'right1'],
			[81.4, 'left3'],
			[83.2,'right4'],
			[85.1, 'left1'],
			[86.9, 'right1'],
			[88.6, 'left4'],
			[89.1, 'left5'],
			[89.6, 'left6'],
			[90.5, 'right5'],
			[91.0, 'right6'],
			[91.5, 'right7'],
			[92.4, '2'],
			[106.8, '1']
			

		
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
	return(
		<div 
			className="viewport" 
		>
			<div className={`comic-board zoom-${zoomState}`}>
				{/* 네 컷 위치 고정 */}
				<div className="row top-row">
					<div className='container'></div>
					<div style={{position:'absolute', left:493, width:15, height:'100%', backgroundColor:'#f1f3df', zIndex:10}}/>
					{coughSlots.map(({active, key}, i) => {
						if(!active) return null
						return(
							<CaughSound key={key} className={'caugh-sound ' + (betweenTimeRef.current == 1.8 ? 'fly-left2right' : 'fly-left2right2')}/>
						)
					})}
					<div className="panel">
						<img
							className="bottom-left-image"
							src={isCoughClicked ? coughImg : cough_standing}
							alt="Cough Character"
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
								style={{position:'absolute', right:200, bottom:45, height:100, width:100}}
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
	)
}
export default InGame