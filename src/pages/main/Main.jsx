import React, { useState, useRef } from 'react';
import '../../styles/main.scss';
import StartScreen from './components/StartScreen';
import { useEffect } from 'react';
import { useBGMStore } from "../../store/backgroundSound";
import BlackScreen from './components/BlackScreen';
import introSound from '../../assets/audio/intro_background.mp3';
import { useSearchParams } from 'react-router-dom';
import InGame from './components/InGame';
import Tutorial from './components/Tutorial';
import Ending from './components/Ending';
import useMutateUpdateScore from '../../hooks/mutation/useMutateUpdateScore';
const Main = () => {
	const [zoomState, setZoomState] = useState(null);
	const [tutorial, setTutorial] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()
	const [isEnding, setIsEnding] = useState(false)
	const coughTimeoutRef = useRef(null); 
	const currentFailureTimer = useRef(null);
	const timerRefs = useRef([]);
	const [plusText, setPlusText] = useState('')
	const pauseBackgroundSound = useBGMStore(state => state.pause)
	const play = searchParams.get('play')
	const [email, setEmail] = useState('')
	const setAudio = useBGMStore(state => state.setAudio)
	const [isClicked, setIsClicked] = useState(false)
	const [isBackground, setIsBackground] = useState(true)
	const [score, setScore] = useState(0)
	const [isBlackScreen, setIsBlackScreen] = useState(true)
	const [isStart, setIsStart] = useState(false)
	const handleEscape = () => {
		clearTimeout(coughTimeoutRef.current);
		clearTimeout(currentFailureTimer.current)
		timerRefs.current.forEach(clearTimeout);
		pauseBackgroundSound();
		setIsBackground(false)
		setIsBlackScreen(true)
		setTutorial(false)
		setTimeout(() => {
			setIsBlackScreen(false)
			setIsStart(true)
		},1000)
	}
	const reStartGame = () => {
		pauseBackgroundSound();
		setScore(0)
		setPlusText('')
		setIsEnding(false)
		setIsBlackScreen(true)
		setTutorial(false)
		setTimeout(() => {
			setIsBlackScreen(false)
			setIsStart(true)
		},1000)
	}
	// const handleKeyDown = (e) => {
	// 	if (e.code === 'Space' || e.key === ' ' || e.code === 'Enter'&& !isTyping) {
	// 	e.preventDefault(); // 기본 동작 방지 (예: 스크롤, 폼 제출)
	// 	handleNext();
	// 	}
	// };
	// window.addEventListener('keydown', handleKeyDown);
	// return () => window.removeEventListener('keydown', handleKeyDown);
	useEffect(() => { // 배경음악 시작한 이후로 스페이스바가 들어오면 눌러야되는 타이밍 배열을 현재 인덱스로 검사해서 내가 누른 시간간격과 눌러야되는거랑 비교해서 성공/실패 판별하는거
		if(tutorial && isClicked){
			const handleKeyDown = (e) => {
				if(e.key === 'Escape') handleEscape()
			}
			window.addEventListener('keydown', handleKeyDown);
			return () => window.removeEventListener('keydown', handleKeyDown);
		}
	},[tutorial, isClicked])
	useEffect(() => {
		if(play === 'true'){
			const item = window.localStorage.getItem('ppung_email')
			setEmail(item)
			setIsClicked(true);
			searchParams.set('play', 'false')
			setSearchParams(searchParams)
			// pauseBackgroundSound();
			const audio = new Audio(introSound);
			audio.play();
			setAudio(audio);
			setTimeout(() => {
				setIsBackground(false)
				setTimeout(() => {
					setIsBlackScreen(false)
				},1000)
			}, 5000)
		}
	},[play]) //화면 첫 렌더때 fart time 끄고 검은 배경 끄고 isStart 세팅 로직
	return (
		<>
			{((isStart && !isBlackScreen && !isBackground && !isEnding && !tutorial)) && 
			<div style={{position:'absolute', height:'40.5px', backgroundColor:'#f1f3df', padding:'5px 10px', alignItems:'center', borderRadius:5, border:'2px dotted #000', display:'flex', left: 20, top: 20, fontFamily:'BMkkubulimTTF-Regular', fontSize:25, zIndex:100}}>
				<div>
					{`점수: ${score}`}
				</div>
				{!isEnding && plusText&& 
				<div style={{marginLeft: 20, backgroundColor:'#fff', padding:3, borderRadius:5, border:'1px solid #000'}}>
					{`${plusText}`}
				</div>}
			</div>}
			<StartScreen 
				isClicked={isClicked}
				tutorial={tutorial}
				handleEscape={handleEscape}
				isBackground={isBackground}
				onClick={() =>{
					if(play !== 'true' && isBackground && !isClicked){
						searchParams.set('play', 'true')
						setSearchParams(searchParams)
					}
				}} // fart time 화면
			/> 
			<BlackScreen 
				isBlackScreen={isBlackScreen}
				isClicked={isClicked}
				tutorial={tutorial}
				handleEscape={handleEscape}
			/> 
			{/* 검은 화면 */}
			<></>
			<Tutorial coughTimeoutRef={coughTimeoutRef} timerRefs={timerRefs} currentFailureTimer={currentFailureTimer} setStartGame={setIsStart} tutorial={tutorial} setIsBlackScreen={setIsBlackScreen} setTutorial={setTutorial} isBlackScreen={isBlackScreen}/>
			<InGame email={email} setIsStart={setIsStart} setPlusText={setPlusText} setIsEnding={setIsEnding} isEnding={isEnding} setScore={setScore} isStart={isStart} tutorial={tutorial} zoomState={zoomState} setZoomState={setZoomState}/>
			<Ending email={email} reStartGame={reStartGame} ending={isEnding} score={score}/>
		</>
	);
};

export default Main;
