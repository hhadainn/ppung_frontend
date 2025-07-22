import React, { useState, useRef } from 'react';
import '../../styles/main.scss';

import StartScreen from './components/StartScreen';
import { useEffect } from 'react';
import { useBGMStore } from "../../store/backgroundSound";
import BlackScreen from './components/BlackScreen';
import generateId from '../../utils/generateId';
import bitSound from '../../assets/audio/background_bits.mp3'
import introSound from '../../assets/audio/intro_background.mp3';
import { useSearchParams } from 'react-router-dom';
import { Howl } from 'howler';
import sneezeSound from '../../assets/audio/sneeze.mp3'; // 경로 주의
import failSound from '../../assets/audio/fail_effect.mp3'; // 경로 주의
import successSound from '../../assets/audio/success_effect.mp3'; // 경로 주의
import InGame from './components/InGame';
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
	69.9,70.067,70.234,70.401,71.101,71.801

];
const Main = () => {
	const [zoomState, setZoomState] = useState(null);
	const [tutorial, setTutorial] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const play = searchParams.get('play')
	const pauseBackgroundSound = useBGMStore(state => state.pause)
	const setAudio = useBGMStore(state => state.setAudio)
	const [isBackground, setIsBackground] = useState(true)
	const [isBlackScreen, setIsBlackScreen] = useState(true)
	const [isStart, setIsStart] = useState(false)
	useEffect(() => {
		if(play === 'true'){
			pauseBackgroundSound();
			const audio = new Audio(introSound);
			audio.play();
			setAudio(audio);
			setTimeout(() => {
				setIsBackground(false)
				setTimeout(() => {
					setIsBlackScreen(false)
					setIsStart(true)
					searchParams.set('play', 'false')
					setSearchParams(searchParams)
				},1000)
			}, 5000)
		}
	},[play]) //화면 첫 렌더때 fart time 끄고 검은 배경 끄고 isStart 세팅 로직
	return (
		<>
			<StartScreen 
				isBackground={isBackground}
				onClick={() =>{
					if(play !== 'true' && isBackground){
						searchParams.set('play', 'true')
						setSearchParams(searchParams)
					}
				}} // fart time 화면
			/> 
			<BlackScreen isBlackScreen={isBlackScreen}/> 
			{/* 검은 화면 */}
			{tutorial
			?	<></>
			:	<InGame isStart={isStart} setIsStart={setIsStart} zoomState={zoomState} setZoomState={setZoomState}/>
			}
		</>
	);
};

export default Main;
