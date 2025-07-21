import React from "react";
import '../../styles/main.scss'; // SCSS import
import '../../styles/cloud.scss'; // SCSS import
import kimfart from '../../assets/images/kimfart.png'
import theme1 from '../../assets/images/fart_theme1.png'
const Theme = () => {
  return (
	<div className="test-background">
		<div style={{display:'flex', flexDirection:'column', backgroundColor:"rgb(107,93,68)", border:'1px solid rgb(145, 113, 69)', borderRadius:10}}>
			<img src={theme1} style={{width:400, height:400, borderTopLeftRadius:10, borderTopRightRadius:10}}/>
			<div style={{padding:10, display:'flex', justifyContent:'center', color:'#fff', borderTop:'2px solid rgb(145, 113, 69)', fontWeight:700, fontSize:25, fontFamily:'BMkkubulimTTF-Regular'}}>Theme 1 : Fart in Classrrom</div>
		</div>
	</div>
  );
};

export default Theme;