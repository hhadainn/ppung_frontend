import React from "react";
import '../../styles/main.scss'; // SCSS import
import '../../styles/cloud.scss'; // SCSS import
import kimfart from '../../assets/images/kimfart.png'
const Test = () => {
  return (
	<div className="test-background">
		<div className="menu-container">
			<div style={{position:'relative', width:500, height:500, display:'flex', alignItems:'center',}}>
				<img src={kimfart} className="character" alt="방구 캐릭터" />
				<div class="cloud" data-type="white_5" style={{top: 250}} data-speed="41">
					<p style={{display:'flex',margin:0, fontSize:40, height:'45.5px', zIndex:100}}>
						방구를
					</p>
					<p style={{display:'flex',margin:0, fontSize:50,zIndex:100, height:57}}>
						뿌우우웅~
					</p>
					<button style={{border:'1px solid rgb(145, 113, 69)', color:'rgb(145, 113, 69)', borderWidth:1, borderRadius:10, fontFamily:'BMKkubulimTTF', backgroundColor:'#fff'}}>Start</button>
				</div>
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