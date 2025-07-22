import classNames from "classnames"

const StartScreen = ({isBackground, onClick}) => {
	return(
		<div onClick={onClick} className={classNames('main-before-background', {'fade-out': !isBackground})}>
			<div style={{position:'absolute', top:20, right:20}}>
				<div style={{fontSize:30}}>튜토리얼 건너뛰기</div>
			</div>
			<div style={{display:'flex', position:'relative', flexDirection:'column', alignItems:'center', color:'rgb(178 103 103)'}}>
				<div style={{fontSize:200, fontWeight:700}}>Fart</div>
				<div style={{fontSize:200, fontWeight:700}}>Time!</div>
				<div style={{fontSize:50, fontWeight:700, marginTop:40}}>[방구 타임!]</div>
			</div>
		</div>
	)
}
export default StartScreen