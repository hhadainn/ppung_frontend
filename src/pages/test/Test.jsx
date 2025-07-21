import React, {useState, useEffect, useRef} from "react";
import { Howl } from 'howler';
import {useNavigate} from 'react-router-dom'
import { useBGMStore } from "../../store/backgroundSound";
import '../../styles/main.scss'; // SCSS import
import '../../styles/cloud.scss'; // SCSS import
import kimfart from '../../assets/images/kimfart.png'
import clickSound from '../../assets/audio/proud-fart-288263.mp3'; // 경로 주의
import backgroundSound from '../../assets/audio/main_background.mp3'
const Test = () => {
	const setAudio = useBGMStore(state => state.setAudio)
	const playBackgroundSound = useBGMStore(state => state.play)
	const intervalRef = useRef(null);         // 🔸 setInterval ID 저장
	const fullTextRef = useRef('');           // 🔸 전체 텍스트 저장
	const indexRef = useRef(0);
	const click = useRef(null);
	const navigate = useNavigate()
	const handleClick = () => {
		setIsAnimation(true)
		click.current = new Howl({ src: [clickSound] });
		click.current.play()
		playBackgroundSound()
	}
	const [isAnimation, setIsAnimation] = useState(false)
	const [displayedText, setDisplayedText] = useState('')
	const [displayedText2, setDisplayedText2] = useState('')
	const [isTyping, setIsTyping] = useState('')
	const [isButton, setIsButton] = useState(false)
 	const handleText = async() => {
		const text = '방구를뿌우우웅~'
		fullTextRef.current = text;
		indexRef.current = 0

		setDisplayedText('');
		setIsTyping(true);
		intervalRef.current = setInterval(() => {
			if (indexRef.current < fullTextRef.current.length) {
				if(indexRef.current > 2){
					const nextChar = fullTextRef.current.charAt(indexRef.current);
					setDisplayedText2((prev) => prev + nextChar);
					indexRef.current += 1;
				}
				else{
					const nextChar = fullTextRef.current.charAt(indexRef.current);
					setDisplayedText((prev) => prev + nextChar);
					indexRef.current += 1;
				}
			} else {
				clearInterval(intervalRef.current);
				setIsTyping(false);
				setIsButton(true)
			}
		}, 250); // 속도는 원하는 대로 조정

		return () => clearInterval(intervalRef.current);
	}
	useEffect(() => {
		const audio = new Audio(backgroundSound)
		audio.loop = true;
		setAudio(audio)
	},[])
	useEffect(() => {
		if(isAnimation) handleText()
	}, [isAnimation]);
  return (
	<div className="test-background">
		<div className="menu-container" onClick={() => {if(!isAnimation) handleClick()}}>
			{/* <div className={"start-item-conatiner " + (isAnimation ? 'start-item-conatiner-animation' : '')}> */}
			<div className={"start-item-conatiner "}>
				<img src={kimfart} className={'character ' + (isAnimation ? "start-item-conatiner-animation" : '')} alt="방구 캐릭터" />
				{!isAnimation && <div className="twiggle-text">씰룩</div>}
				{!isAnimation && <div className="twiggle-text2">씰룩</div>}
				{isAnimation && 
				<div class="cloud" data-type="white_5" style={{top: 250}}>
					<div className="cloud-text" style={{display:'flex',margin:0, fontSize:40, height:'45.5px', zIndex:100}}>
						{displayedText}
					</div>
					<div className="cloud-text" style={{display:'flex',margin:0, fontSize:50,zIndex:100, height:57}}>
						{displayedText2}
					</div>
					{isButton && <button className="game-start-button" onClick={() => navigate('/main')}>Start</button>}
				</div>}
			</div>
			{/* <h1 className="game-title2">💨 방구를 뿌우웅</h1> */}
			{/* <div className="menu-button">시작하기</div>
			<div className="menu-button">설정</div>
			<div className="menu-button">제작진</div>
			<div className="menu-button">종료</div> */}
		</div>
	</div>
  );
};

export default Test;

     {/* <div class="cloud" data-type="white_4" style={{top: 238}} data-speed="1"></div>
     <div class="cloud" data-type="white_2" style={{top: 252}} data-speed="2"></div>
     <div class="cloud" data-type="white_1" style={{top: 481}} data-speed="3"></div>
     <div class="cloud" data-type="white_1" style={{top: 285}} data-speed="4"></div>
     <div class="cloud" data-type="white_5" style={{top: 391}} data-speed="5"></div>
     <div class="cloud" data-type="white_4" style={{top: 410}} data-speed="6"></div>
     <div class="cloud" data-type="white_6" style={{top: 494}} data-speed="7"></div>
     <div class="cloud" data-type="white_6" style={{top: 197}} data-speed="8"></div>
     <div class="cloud" data-type="white_1" style={{top: 254}} data-speed="9"></div>
     <div class="cloud" data-type="white_2" style={{top: 108}} data-speed="10"></div>
     <div class="cloud" data-type="white_5" style={{top: 133}} data-speed="11"></div> */}
     {/* <div class="cloud" data-type="white_5" style={{top: 291}} data-speed="13"></div>
     <div class="cloud" data-type="white_5" style={{top: 515}} data-speed="14"></div>
     <div class="cloud" data-type="white_6" style={{top: 410}} data-speed="15"></div>
     <div class="cloud" data-type="white_1" style={{top: 198}} data-speed="16"></div>
     <div class="cloud" data-type="white_2" style={{top: 130}} data-speed="17"></div>
     <div class="cloud" data-type="white_6" style={{top: 274}} data-speed="18"></div>
     <div class="cloud" data-type="white_6" style={{top: 129}} data-speed="19"></div>
     <div class="cloud" data-type="white_2" style={{top: 140}} data-speed="20"></div>
     <div class="cloud" data-type="white_6" style={{top: 312}} data-speed="21"></div>
     <div class="cloud" data-type="white_6" style={{top: 258}} data-speed="22"></div>
     <div class="cloud" data-type="white_2" style={{top: 133}} data-speed="23"></div>
     <div class="cloud" data-type="white_1" style={{top: 530}} data-speed="24"></div>
     <div class="cloud" data-type="white_5" style={{top: 541}} data-speed="25"></div>
     <div class="cloud" data-type="white_1" style={{top: 313}} data-speed="26"></div>
     <div class="cloud" data-type="white_1" style={{top: 552}} data-speed="27"></div>
     <div class="cloud" data-type="white_1" style={{top: 548}} data-speed="28"></div>
     <div class="cloud" data-type="white_2" style={{top: 438}} data-speed="29"></div>
     <div class="cloud" data-type="white_2" style={{top: 516}} data-speed="30"></div>
     <div class="cloud" data-type="white_5" style={{top: 556}} data-speed="31"></div>
     <div class="cloud" data-type="white_5" style={{top: 225}} data-speed="32"></div>
     <div class="cloud" data-type="white_3" style={{top: 286}} data-speed="33"></div>
     <div class="cloud" data-type="white_2" style={{top: 416}} data-speed="34"></div>
     <div class="cloud" data-type="white_2" style={{top: 105}} data-speed="35"></div>
     <div class="cloud" data-type="white_6" style={{top: 195}} data-speed="36"></div>
     <div class="cloud" data-type="white_2" style={{top: 281}} data-speed="37"></div>
     <div class="cloud" data-type="white_1" style={{top: 291}} data-speed="38"></div>
     <div class="cloud" data-type="white_4" style={{top: 196}} data-speed="39"></div>
     <div class="cloud" data-type="white_6" style={{top: 442}} data-speed="40"></div> */}