import classNames from "classnames"

const StartScreen = ({isBackground}) => {
	return(
		<div className={classNames('main-before-background', {'fade-out': !isBackground})}>
			<div style={{display:'flex', flexDirection:'column', alignItems:'center', color:'rgb(178 103 103)'}}>
				<div style={{fontSize:200, fontWeight:700}}>Fart</div>
				<div style={{fontSize:200, fontWeight:700}}>Time!</div>
				<div style={{fontSize:50, fontWeight:700, marginTop:40}}>[방구 타임!]</div>
			</div>
		</div>
	)
}
export default StartScreen