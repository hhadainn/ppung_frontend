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
import tutorialBitSound from '../../../assets/audio/tutorial_background.mp3'
import { Howl } from 'howler';
import sneezeSound from '../../../assets/audio/sneeze.mp3'; // 경로 주의
import failSound from '../../../assets/audio/fail_effect.mp3'; // 경로 주의
import { AiFillCaretDown } from "react-icons/ai";

import successSound from '../../../assets/audio/success_effect.mp3'; // 경로 주의
import classNames from 'classnames';
const emojiTimings = [
	0, 0.5, 1.0, 3.7, 4.2, 4.7, 7.4, 7.9, 8.4
 ];
const MAX_COUGH = 6;
const tutorialList = [
	'교실에서 방귀가 마려우면 어떻게 할까요?',
	'마침 옆에 친구가 기침을 하려 하네요. 이를 이용하면 묻어갈 수 있겠어요.',
	'친구의 기침에 맞춰서 스페이스바를 눌러 방귀를 껴봅시다.',
]
const reTutorialList = [
	'흠...',
	'다시 해봅시다!',
]
const finishTutorialList = [
	'상당한 방구쟁이시네요!',
	'아직 방귀는 많이 남았으니, 본격적으로 껴봅시다!',
]
const Tutorial = ({isBlackScreen,setIsBlackScreen, tutorial,  setStartGame, setTutorial}) => {
	const currentIndexRef = useRef(0)
	const [whenFail, setWhenFail] = useState(false)
	const coughTimeoutRef = useRef(null); 
	const [type, setType] = useState('default')
	const [currentIndex, setCurrentIndex] = useState(0)
	const [successTime, setSuccessTime] = useState(0)
	const [coughSlots, setCoughSlots] = useState(Array(MAX_COUGH).fill({ active: false, key: 0 }))
	const coughSlotIndexRef = useRef(0);
	const [isStart, setIsStart] = useState(false)
	let uniqueKeyCounter = useRef(0);
	const [whenSuccess, setWhenSuccess] = useState(false)
	const currentFailureTimer = useRef(null);
	const [isTyping, setIsTyping] = useState(false)
	const [displayedText, setDisplayedText] = useState('')
	const intervalRef = useRef(null);         // 🔸 setInterval ID 저장
	const fullTextRef = useRef('');           // 🔸 전체 텍스트 저장
	const indexRef = useRef(0);
	const queueRef = useRef([]);
	const queueRef2 = useRef([]);
	const queueRef3 = useRef([]);
	const queueRef4 = useRef([]);
	const [currentTextIndex, setCurrentTextIndex] = useState(0)
	const startTimeRef = useRef(null);
	const isProcessingRef = useRef(false);
	const isProcessingRef2 = useRef(false);
	const isProcessingRef3 = useRef(false);
	const isProcessingRef4 = useRef(false);
	const timerRefs = useRef([]);
	const successEffect = new Howl({ src: [successSound], volume: 0.1 });
	const effect = new Howl({ src: [sneezeSound], preload:true, volume: 0.1 });
	const failEffect = new Howl({ src: [failSound], volume: 0.1 });
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
					const targetTime = emojiTimings[index] + 1.8;
					const diff = Math.abs(elapsed - targetTime);
					if (diff <= 0.15) {
						successEffect.play();
						queueRef4.current.push(() => {
							setWhenSuccess(true);
							setTimeout(() => setWhenSuccess(false), 150)
						})
						processQueue4();
						setCurrentIndex(prev => prev + 1)
						setSuccessTime(prev => prev + 1)
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
	const handleText = async() => {
		const list = [...(type == 'default' ? tutorialList : (type == 'finish' ? finishTutorialList : reTutorialList))]
		const text = list[currentTextIndex]
		fullTextRef.current = text;
		indexRef.current = 0
		setDisplayedText('')
		setIsTyping(true)
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			if (indexRef.current < fullTextRef.current.length) {
			const nextChar = fullTextRef.current.charAt(indexRef.current);
			setDisplayedText((prev) => prev + nextChar);
			indexRef.current += 1;
			} else {
			clearInterval(intervalRef.current);
			setIsTyping(false);
			}
		}, 50);

		return () => clearInterval(intervalRef.current);
	}
	const skipTyping = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			setDisplayedText(fullTextRef.current);
			setIsTyping(false);
		}
	};
	const handleNext = () => {

		if(isTyping){
			skipTyping()
			return;
		}
		const list = [...(type == 'default' ? tutorialList : (type == 'finish' ? finishTutorialList : reTutorialList))]
		if(currentTextIndex == (list.length - 1)){
			if(type == 'finish'){
				setIsBlackScreen(true)
				setTutorial(false)
				setTimeout(() => {
					setIsBlackScreen(false)
					setStartGame(true)
				},1000)
			}
			else setIsStart(true);
			return;
		}
		setCurrentTextIndex(currentTextIndex + 1)
	}
	useEffect(() => {
		if(!isBlackScreen) handleText()
	},[currentTextIndex, isBlackScreen])
	const scheduleNextFailure = () => { //timings 배열 마다 있는 시간 + 1.8초 후에 안눌리면 fail로직 발동시키고 index하나증가시켜서 다음 차례 시간 + 1.8초 검사할 수 있게 ㅅ케쥴링
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
			setCurrentIndex(prev => prev + 1)
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
		}, 1950);
	  
		coughSlotIndexRef.current = (slot + 1) % MAX_COUGH;
	  };
	  useEffect(() => {
		if(!isStart) return;
		const audio = new Audio(tutorialBitSound);
		audio.volume = 1.0;
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
		};
	  
		audio.play().catch((err) => console.warn('autoplay blocked', err));
		setAudio(audio);
	  
		return () => {
		  timerRefs.current.forEach(clearTimeout);
		//   audio.pause();
		};
	  },[isStart])
	  useEffect(() => {
		if(currentIndex == 9){
			setTimeout(() => {
				if(successTime == 9){
					setType('finish')
				}
				else setType('retry')
				currentIndexRef.current = 0;
				setIsStart(false)
				setCurrentTextIndex(0)
				setCurrentIndex(0)
				setSuccessTime(0)
			}, 1000)
		}
	  },[currentIndex])
	return(
		<div
			style={{zIndex:5}} 
			className={classNames("viewport", {'fade-in' : !isBlackScreen && tutorial}, {'fade-out' : !tutorial})}
		>
			<div className={`comic-board zoom-tutorial`}>
				{!isStart && 
				<div style={{position:'absolute',backgroundColor:'rgb(239, 245, 246)', border:'1px solid #000', fontFamily:'BMkkubulimTTF-Regular', fontSize:25, zIndex:100, left:160, boxShadow:'1px 1px #000', top:100, width:800, height:100}}>
					<div onClick={() => handleNext()} style={{cursor:'pointer',position:'relative', color:'rgb(34, 41, 61)', width:'100%', height:'100%', border:'1px solid #fff'}}>
						<div style={{marginTop: 25, marginLeft: 30}}>
							{displayedText}
						</div>
						<AiFillCaretDown className='text-next-button'/>
					</div>
				</div>}
				{isStart && 
				<div style={{position:'absolute',color:'rgb(33, 40, 66)',fontWeight:'bold', left:150, top:100, fontSize:40, fontFamily:'BMkkubulimTTF-Regular', backgroundColor:'rgb(241, 243, 225)'}}>
					{`앞으로 ${currentIndex < 3 ? 3 : (currentIndex < 6 ? 2 : (currentIndex == 9 ? 0 : 1))}번!`}
				</div>
				}
				{/* 네 컷 위치 고정 */}
				<div className="row top-row">
					<div className='container'></div>
					{coughSlots.map(({active, key}, i) => {
						if(!active) return null
						return(
							<CaughSound key={key} className='caugh-sound fly-left2right'/>
						)
					})}
					<div className="panel" style={{border:'0'}}>
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
					<div className="panel" style={{border:'0'}}>
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
export default Tutorial