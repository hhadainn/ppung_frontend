import classNames from "classnames"

const StartScreen = ({isBackground, onClick}) => {
	return(
		<div onClick={onClick} className={classNames('main-before-background', {'fade-out': !isBackground})}>
			<div style={{position:'absolute', display:'flex', top:20, right:20}}>
				<div style={{width:32, height:32, backgroundColor:'rgb(141,134,129)', borderRadius:5, display:'flex', justifyContent:'center', alignItems:'center'}}>
					<div style={{width:24, height:24,border:'1px solid rgb(164, 159, 154)', display:'flex',color:'rgb(205, 201, 191)', backgroundColor:'rgb(167,161,157)', borderRadius:2,fontSize:14, justifyContent:'center', alignItems:'flex-end'}}>
						Esc
					</div>
				</div>
				<div style={{fontSize:30, color:'rgb(141,134,129)',}}>&nbsp;: 튜토리얼 건너뛰기</div>
			</div>
			<div style={{display:'flex', position:'relative', flexDirection:'column', alignItems:'center', color:'rgb(178 103 103)'}}>
				<div style={{fontSize:200, fontWeight:700, color:'#897d5f'}}>Fart</div>
				<div style={{fontSize:200, fontWeight:700, color:'#897d5f'}}>Time!</div>
				<div style={{fontSize:50, fontWeight:700, marginTop:30, color:'#897d5f'}}>[방구 타임!]</div>
				<div style={{fontSize:30, color:'rgb(141,134,129)'}}>시작하려면 화면을 클릭하세요!</div>

			</div>
		</div>
	)
}
export default StartScreen